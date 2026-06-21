import { NextResponse } from "next/server";

function getLevelFromScore(score: number): string {
  if (score <= 19) return "Observateur";
  if (score <= 39) return "Curieux";
  if (score <= 59) return "Explorateur";
  if (score <= 79) return "Praticien";
  return "Expert";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, lastName = "", company = "", phone = "", score } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: "firstName and email are required" }, { status: 400 });
    }

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/lwMKLuJwcN8czGMON9QG/webhook-trigger/8d4c3158-1f30-4a6b-8849-aa83c7f9b532";

    const level = getLevelFromScore(score);

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        company,
        score,
        niveau: level,
        submittedAt: new Date().toISOString(),
      }),
    });
    console.log("[leads] webhook GHL envoyé");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
