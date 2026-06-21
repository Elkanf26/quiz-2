import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, lastName, company, phone, score } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: "firstName and email are required" }, { status: 400 });
    }

    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: lastName ?? "",
          email,
          company: company ?? "",
          phone: phone ?? "",
          score,
          submittedAt: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
