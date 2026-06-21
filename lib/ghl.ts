import { getLevelByPercentage } from "./questions";
import { buildEmail } from "./emails";

const GHL_BASE = "https://rest.gohighlevel.com/v1";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
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

export async function syncToGHL(payload: LeadPayload) {
  const { firstName, lastName, email, company, phone, score } = payload;
  const level = getLevelByPercentage(score);
  const tag = `quiz-${level.name.toLowerCase()}`;

  // 1 — Create or update contact
  const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      locationId: process.env.GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      phone,
      companyName: company,
      tags: [tag, "quiz-ia"],
      customField: [
        { key: "quiz_score",  fieldValue: String(score) },
        { key: "quiz_niveau", fieldValue: level.name },
      ],
      source: "Quiz IA",
    }),
  });

  if (!contactRes.ok) {
    const err = await contactRes.text();
    throw new Error(`GHL contact error: ${err}`);
  }

  const { contact } = await contactRes.json();
  const contactId: string = contact?.id;

  // 2 — Send personalised email via GHL conversations
  const html = buildEmail({
    firstName,
    score,
    levelName: level.name,
    levelEmoji: level.emoji,
    description: level.description,
    advice: level.advice,
    cta: level.cta,
  });

  const emailRes = await fetch(`${GHL_BASE}/conversations/messages/outbound`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      type: "Email",
      contactId,
      subject: `${level.emoji} Votre résultat IA : ${level.name} (${score}%)`,
      html,
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    throw new Error(`GHL email error: ${err}`);
  }

  return { contactId, level };
}
