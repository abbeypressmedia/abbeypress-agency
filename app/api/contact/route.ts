import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  store?: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const store = body.store?.trim();
    const service = body.service?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and project details are required." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;

    if (!apiKey || !from) {
      return NextResponse.json(
        { error: "Email delivery is not configured yet. Please use WhatsApp for a direct response." },
        { status: 503 }
      );
    }

    const subject = `New AbbeyPress enquiry — ${service || "Ecommerce project"}`;
    const html = `
      <h2>New AbbeyPress project enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Store:</strong> ${escapeHtml(store || "Not provided")}</p>
      <p><strong>Service:</strong> ${escapeHtml(service || "Not specified")}</p>
      <hr />
      <p><strong>Message</strong></p>
      <p>${escapeHtml(message).replace(/\\n/g, "<br />")}</p>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "We couldn't deliver the enquiry email. Please use WhatsApp instead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please use WhatsApp for a direct response." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[character] || character));
}
