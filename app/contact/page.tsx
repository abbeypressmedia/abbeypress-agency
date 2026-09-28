"use client";

import { FormEvent, useState } from "react";
import { emailUrl, siteConfig, whatsappUrl } from "@/lib/site-config";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", store: "", service: "Store growth", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const message = [
    `Hi AbbeyPress, I'm ${form.name || "interested in working with you"}.`,
    form.store ? `Store: ${form.store}` : "",
    `I'm interested in: ${form.service}`,
    form.message ? `\n${form.message}` : "",
  ].filter(Boolean).join("\n");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setSent(false);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Email notification is not configured yet. WhatsApp is still available below.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Email notification could not be reached. WhatsApp is still available below.");
    } finally {
      setSending(false);
      window.setTimeout(() => {
        window.location.href = whatsappUrl(message);
      }, 500);
    }
  }

  return (
    <main>
      <section className="contact-page-hero">
        <div className="shell">
          <a className="audit-back" href="/">← AbbeyPress</a>
          <div className="eyebrow light">LET'S TALK COMMERCE</div>
          <h1>Bring the store.<br /><em>We'll find the opportunity.</em></h1>
          <p>Tell us what you're selling, what you want to improve and where the bottleneck is. Start with WhatsApp for the fastest response, or send a structured enquiry below.</p>
          <div className="direct-actions">
            <a className="button button-light" href={whatsappUrl("Hi AbbeyPress, I'd like to discuss an ecommerce project.")}>WhatsApp AbbeyPress ↗</a>
            <a className="direct-email" href={emailUrl("AbbeyPress project enquiry", "Hi AbbeyPress, I'd like to discuss an ecommerce project.")}>Email AbbeyPress ↗</a>
          </div>
        </div>
      </section>

      <section className="section contact-form-section">
        <div className="shell contact-form-grid">
          <div>
            <div className="eyebrow">PROJECT ENQUIRY</div>
            <h2>Give us enough context to make the first conversation useful.</h2>
            <p className="lead">You don't need a polished brief. Store URL + goal + bottleneck is enough to start.</p>
          </div>
          <form className="project-form" onSubmit={submit}>
            <label>Name<input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" /></label>
            <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@company.com" /></label>
            <label>Store URL<input value={form.store} onChange={e => setForm({...form, store: e.target.value})} placeholder="https://yourstore.com" /></label>
            <label>What do you need?<select value={form.service} onChange={e => setForm({...form, service: e.target.value})}><option>Store growth</option><option>Shopify development</option><option>Conversion optimization</option><option>Paid acquisition</option><option>Retention / email</option><option>Full ecommerce strategy</option></select></label>
            <label>What should we know?<textarea rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="What's happening now, and what would a successful outcome look like?" /></label>
            <button className="button button-dark" type="submit" disabled={sending}>{sending ? "Sending enquiry…" : "Send enquiry + open WhatsApp ↗"}</button>
            {sent && <p className="form-success">Enquiry captured. Opening WhatsApp so you can continue the conversation directly.</p>}
            {error && <p className="form-error">{error}</p>}
            <small>Your enquiry is emailed to {siteConfig.email} once Resend email delivery is configured. WhatsApp opens now so you never lose the lead.</small>
          </form>
        </div>
      </section>

      <section className="contact-details-section">
        <div className="shell contact-details">
          <div><span>DIRECT EMAIL</span><strong>{siteConfig.email}</strong></div>
          <div><span>WHATSAPP</span><strong>{siteConfig.whatsappDisplay}</strong></div>
          <div><span>BASE</span><strong>{siteConfig.location}</strong></div>
        </div>
      </section>
    </main>
  );
}
