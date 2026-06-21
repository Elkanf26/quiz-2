import { NextResponse } from "next/server";
import { syncToGHL } from "@/lib/ghl";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, lastName = "", company = "", phone = "", score } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: "firstName and email are required" }, { status: 400 });
    }

    // Sync to Go High Level (contact + email)
    if (process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID) {
      await syncToGHL({ firstName, lastName, email, company, phone, score });
    }

    // Optional secondary webhook
    if (process.env.WEBHOOK_URL) {
      await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, company, phone, score, submittedAt: new Date().toISOString() }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
