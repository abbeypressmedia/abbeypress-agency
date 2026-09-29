import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "AbbeyPress privacy notice.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="shell">
        <a href="/">← AbbeyPress</a>
        <div className="eyebrow">ABBEYPRESS / PRIVACY</div>
        <h1>Privacy <em>notice.</em></h1>
        <p>AbbeyPress respects the information you share when you ask about an ecommerce project, request an audit or contact the agency.</p>
        <h2>Information you provide</h2>
        <p>When you use the project enquiry form, you may provide your name, email address, store URL, requested service and project details. The form is designed to send those details to AbbeyPress so the enquiry can be followed up.</p>
        <h2>How information is used</h2>
        <p>Information submitted through the contact flow is used to respond to enquiries, understand the requested ecommerce work and communicate about the project. It is not collected for unrelated marketing purposes through this form.</p>
        <h2>Audit scans</h2>
        <p>The public store audit fetches the URL you submit and analyzes publicly accessible storefront HTML. Do not submit private, authenticated or confidential URLs. The audit does not require administrator access to the store.</p>
        <h2>Third-party services</h2>
        <p>The contact workflow may use Resend for email delivery and WhatsApp for direct conversation. Those services process information according to their own terms and privacy practices.</p>
        <h2>Retention and requests</h2>
        <p>AbbeyPress should retain enquiry information only for as long as reasonably needed for communication, project administration and legitimate business record-keeping. For questions about information associated with an enquiry, contact abbeypressmedia@gmail.com.</p>
        <h2>Updates</h2>
        <p>This notice may be updated when the site adds analytics, a custom domain or other third-party services. The current version will be published on this page.</p>
        <p className="legal-note">Last updated: September 29, 2026.</p>
      </div>
    </main>
  );
}
