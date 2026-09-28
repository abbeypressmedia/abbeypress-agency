import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = typeof body?.url === "string" ? body.url.trim() : "";

    if (!url) {
      return NextResponse.json({ error: "Store URL is required." }, { status: 400 });
    }

    const result = await runAudit(url);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The audit could not be completed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
