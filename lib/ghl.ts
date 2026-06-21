import { getLevelByPercentage } from "./questions";
import { buildEmail } from "./emails";

// GHL API v2
const GHL_BASE = "https://services.leadconnectorhq.com";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: "2021-07-28",
  };
}

export interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  score: number;
}

async function getCustomFieldIds(): Promise<{ scoreId: string | null; niveauId: string | null }> {
  try {
    const res = await fetch(
      `${GHL_BASE}/locations/${process.env.GHL_LOCATION_ID}/customFields`,
      { headers: headers() }
    );
    if (!res.ok) return { scoreId: null, niveauId: null };
    const data = await res.json();
    const fields = data.customFields ?? [];
    const scoreField  = fields.find((f: { name: string; id: string }) => f.name.toLowerCase().includes("score"));
    const niveauField = fields.find((f: { name: string; id: string }) => f.name.toLowerCase().includes("niveau"));
    return {
      scoreId:  scoreField?.id  ?? null,
      niveauId: niveauField?.id ?? null,
    };
  } catch {
    return { scoreId: null, niveauId: null };
  }
}

async function upsertContact(payload: LeadPayload, level: ReturnType<typeof getLevelByPercentage>) {
  const tag = `quiz-${level.name.toLowerCase()}`;
  const { scoreId, niveauId } = await getCustomFieldIds();

  const customFields = [];
  if (scoreId)  customFields.push({ id: scoreId,  field_value: String(payload.score) });
  if (niveauId) customFields.push({ id: niveauId, field_value: level.name });

  const body: Record<string, unknown> = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName: payload.firstName,
    lastName:  payload.lastName,
    email:     payload.email,
    phone:     payload.phone,
    companyName: payload.company,
    tags: ["quiz-ia", tag],
    source: "Quiz IA",
  };

  if (customFields.length > 0) body.customFields = customFields;

  // Cherche si le contact existe déjà
  const searchRes = await fetch(
    `${GHL_BASE}/contacts/search/duplicate?locationId=${process.env.GHL_LOCATION_ID}&email=${encodeURIComponent(payload.email)}`,
    { headers: headers() }
  );

  let contactId: string | null = null;

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    contactId = searchData?.contact?.id ?? null;
  }

  if (contactId) {
    // Update
    const updateRes = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`GHL update error: ${err}`);
    }
  } else {
    // Create
    const createRes = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`GHL create error: ${err}`);
    }
    const data = await createRes.json();
    contactId = data?.contact?.id ?? null;
  }

  return contactId;
}

async function sendEmail(contactId: string, payload: LeadPayload, level: ReturnType<typeof getLevelByPercentage>) {
  const html = buildEmail({
    firstName:   payload.firstName,
    score:       payload.score,
    levelName:   level.name,
    levelEmoji:  level.emoji,
    description: level.description,
    advice:      level.advice,
    cta:         level.cta,
  });

  const res = await fetch(`${GHL_BASE}/conversations/messages/outbound`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      type: "Email",
      contactId,
      subject: `${level.emoji} Votre résultat IA : ${level.name} (${payload.score}%)`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[GHL] email error:", err);
    // On ne throw pas — le contact est créé, l'email est secondaire
  }
}

export async function syncToGHL(payload: LeadPayload) {
  const level = getLevelByPercentage(payload.score);

  console.log("[GHL] syncing contact:", payload.email, "level:", level.name);

  const contactId = await upsertContact(payload, level);
  console.log("[GHL] contact upserted, id:", contactId);

  if (contactId) {
    await sendEmail(contactId, payload, level);
    console.log("[GHL] email sent to contactId:", contactId);
  }

  return { contactId, level };
}
