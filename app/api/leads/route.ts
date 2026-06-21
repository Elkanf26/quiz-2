import { NextResponse } from "next/server";
import { syncToGHL } from "@/lib/ghl";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, lastName = "", company = "", phone = "", score } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: "firstName and email are required" }, { status: 400 });
    }

    const hasGHL = !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
    console.log("[leads] GHL configured:", hasGHL);
    console.log("[leads] payload:", { firstName, email, score });

    if (hasGHL) {
      try {
        const result = await syncToGHL({ firstName, lastName, email, company, phone, score });
        console.log("[leads] GHL sync OK:", result);
      } catch (ghlErr) {
        console.error("[leads] GHL sync ERROR:", ghlErr);
        // On ne bloque pas le lead même si GHL échoue
      }
    }

    if (process.env.WEBHOOK_URL) {
      await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, company, phone, score, submittedAt: new Date().toISOString() }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
