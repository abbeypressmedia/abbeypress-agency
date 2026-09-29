"use client";

import { useState } from "react";

const systems = [
  ["01", "Store build", "Storefront architecture, Shopify development and conversion-led UX."],
  ["02", "Search", "Technical SEO, product SEO, feeds and search visibility."],
  ["03", "Paid media", "Google, Meta and TikTok acquisition aligned with the offer and landing experience."],
  ["04", "Social & video", "Creative systems, social content and video designed for commerce."],
  ["05", "Email & retention", "Lifecycle flows, campaigns and retention systems that support repeat purchase."],
  ["06", "Data & automation", "Analytics, reporting and automation so decisions are based on evidence."],
];

const services = [
  { name: "Technical fixes", copy: "Resolve the issues that make a store harder to crawl, trust, use or measure.", bullets: ["Bug resolution", "Technical SEO", "Tracking & analytics"] },
  { name: "Site & conversion", copy: "Improve the path from first click to product decision to checkout.", bullets: ["UX audit", "Landing pages", "Product pages"] },
  { name: "Integrations & setup", copy: "Connect the platforms that make an ecommerce operation easier to run.", bullets: ["Shopify setup", "Merchant Center", "Analytics & apps"] },
  { name: "Growth & marketing", copy: "Connect search, paid media, social, content and retention around one commercial goal.", bullets: ["Google & Meta", "Content & video", "Email & retention"] },
];

const platforms = ["Shopify", "WooCommerce", "Wix", "Magento", "Squarespace", "Shopline", "BigCommerce", "PrestaShop", "WordPress", "Webflow", "Etsy", "Amazon", "eBay", "Shopware", "OpenCart", "Walmart", "TikTok Shop"];

const ecosystem = ["Shopify", "Google Ads", "Meta", "TikTok", "Pinterest", "YouTube", "Instagram", "Klaviyo", "Mailchimp", "Google Analytics", "Search Console", "Merchant Center", "Bing", "Ahrefs", "SEMrush", "Canva", "Zapier"];

const proofImages = [
  { src: "https://kiondigital.agency/__l5e/assets-v1/8c1e88d0-acdb-456b-88ca-5a7cae09ab03/proof-01.jpg", label: "Merchant Center overview" },
  { src: "https://kiondigital.agency/__l5e/assets-v1/5463f73c-cab5-4015-9f8b-6f8a4064658d/proof-02.jpg", label: "Catalogue optimisation" },
  { src: "https://kiondigital.agency/__l5e/assets-v1/9699e351-34e3-437f-bf40-9c864acd6237/proof-03.jpg", label: "Store quality" },
  { src: "https://kiondigital.agency/__l5e/assets-v1/1a45a147-d730-4996-af80-0bcb20550f85/proof-04.jpg", label: "Product approvals" },
  { src: "https://kiondigital.agency/__l5e/assets-v1/4a7514be-f63f-4e48-b888-64a7d2667f01/proof-05.jpg", label: "Shopify + Google Ads" },
  { src: "https://kiondigital.agency/__l5e/assets-v1/22087aab-89be-4a09-87ba-9a60052f306c/proof-06.jpg", label: "Analytics reporting" },
];

const seasonal = [
  ["OCT", "Halloween", "Themed bundles, urgency banners, paid social"],
  ["NOV", "Black Friday", "Offer strategy, landing pages, checkout, speed and full-funnel ads"],
  ["NOV", "Cyber Monday", "Retargeting, abandoned cart and last-chance email"],
  ["DEC", "Christmas", "Gift guides, delivery cut-offs and merchandising"],
  ["DEC", "Boxing Day", "Clearance, bundles and inventory clean-up"],
  ["FEB", "Valentine's", "Gifting collections, bundles and campaign creative"],
  ["MAR", "Eid / Easter", "Gifting, shipping promises and seasonal creative"],
  ["MAY", "Mother's Day", "Gift finders, personalised products and UGC ads"],
];

export function HomeSections() {
  const [activeService, setActiveService] = useState(services[0].name);

  return (
    <>
      <section className="hero section">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow"><span className="pulse" /> E-COMMERCE & SHOPIFY GROWTH SYSTEMS</div>
            <h1>Build better.<br /><em>Convert more.</em><br />Grow faster.</h1>
            <p className="hero-copy">
              AbbeyPress builds, optimizes and scales ecommerce brands across search, paid media, social, email, data and conversion.
            </p>
            <div className="actions">
              <a className="button button-dark" href="/audit">Run a free store audit <span>↗</span></a>
              <a className="text-link" href="#systems">Explore the growth systems <span>↓</span></a>
            </div>
            <div className="micro-proof"><span>Store build</span><i /><span>Search</span><i /><span>Paid</span><i /><span>Social</span><i /><span>Email</span><i /><span>Data</span></div>
          </div>

          <div className="hero-art hero-dashboard" aria-label="Ecommerce growth dashboard">
            <div className="dashboard-top"><span>LIVE STORE SIGNALS</span><b>GROWTH SYSTEM</b></div>
            <div className="dashboard-score"><small>STORE HEALTH</small><strong>86<span>/100</span></strong><div className="dashboard-line"><i /><i /><i /><i /><i /><i /><i /></div></div>
            <div className="dashboard-row"><div><small>CONVERSION</small><strong>+31.8%</strong></div><div><small>CHANNELS</small><strong>06</strong></div></div>
            <div className="dashboard-footer">Commerce systems, connected. <span>↗</span></div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="shell stats-grid">
          <div><strong>16</strong><span>Growth systems</span></div>
          <div><strong>26</strong><span>Specialists across the operation</span></div>
          <div><strong>12</strong><span>Audit areas in the deep scan</span></div>
          <div><strong>60</strong><span>Days in the first execution roadmap</span></div>
        </div>
      </section>

      <section className="section platform-section">
        <div className="shell">
          <div className="section-head">
            <div><div className="eyebrow">PLATFORMS</div><h2>Built across the<br /><em>commerce stack.</em></h2></div>
            <p>From Shopify development and conversion optimization to marketplaces, search, paid media and retention.</p>
          </div>
          <div className="platform-cloud">{platforms.map((platform) => <span key={platform}>{platform}</span>)}</div>
        </div>
      </section>

      <section className="section audit-section" id="audit">
        <div className="shell audit-card">
          <div>
            <div className="eyebrow">FREE TOOL · NO SIGNUP</div>
            <h2>See what your store is losing<br /><em>in one deep scan.</em></h2>
            <p>Paste your public storefront. The engine reads the live page and checks technical SEO, mobile, conversion, trust, tracking, product signals and more — then ranks what needs attention first.</p>
            <div className="audit-points"><span>✓ Real storefront data</span><span>✓ Critical issues first</span><span>✓ 60-day action plan</span><span>✓ No admin access</span></div>
          </div>
          <form className="audit-form" action="/audit" method="get">
            <label htmlFor="store-url">Store URL</label>
            <input id="store-url" name="url" placeholder="https://yourstore.com" type="url" required />
            <button className="button button-dark" type="submit">Run the audit <span>↗</span></button>
            <small>We only read public storefront pages. The report explains what was detected, why it matters, what to fix first and what to work on over the next 60 days.</small>
          </form>
        </div>
      </section>

      <section className="section video-proof-section">
        <div className="shell">
          <div className="section-head">
            <div><div className="eyebrow">CLIENT VIDEO REVIEWS</div><h2>Hear it from the<br /><em>store owners.</em></h2></div>
            <p>Unedited client video reviews are the strongest proof format. The production-ready layout is here; approved video files can be dropped into the cards without changing the design.</p>
          </div>
          <div className="video-review-grid">
            {[1, 2, 3].map((n) => (
              <article className="video-review-card" key={n}>
                <div className="video-placeholder"><span>CLIENT STORY {String(n).padStart(2, "0")}</span><b>▶</b></div>
                <div><strong>Store owner review</strong><small>Video testimonial · add approved client clip</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section" id="systems">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow light">OUR SYSTEMS</div><h2>Six visible levers.<br /><em>One operating engine.</em></h2></div><p>Store build, search, paid media, social, video, email, data and automation work together instead of living in separate silos.</p></div>
          <div className="system-grid">{systems.map(([number, title, copy]) => <article className="system-card" key={number}><span className="system-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="arrow">↗</span></article>)}</div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">SERVICES & OFFERS</div><h2>Pick exactly what<br /><em>your store needs.</em></h2></div><p>Start with the bottleneck. Then connect the work around the commercial outcome.</p></div>
          <div className="service-layout"><div className="service-tabs">{services.map((service) => <button key={service.name} className={activeService === service.name ? "service-tab active" : "service-tab"} onClick={() => setActiveService(service.name)}><span>{service.name}</span><b>→</b></button>)}</div><div className="service-panel">{services.filter((service) => service.name === activeService).map((service) => <div key={service.name}><span className="eyebrow">SELECTED SERVICE</span><h3>{service.name}</h3><p>{service.copy}</p><div className="tag-row">{service.bullets.map((bullet) => <span key={bullet}>{bullet}</span>)}</div><a className="button button-dark" href="/contact">Talk about this work <span>↗</span></a></div>)}</div></div>
        </div>
      </section>

      <section className="section seasonal-section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">SEASONAL PLANNER</div><h2>Every shopping moment<br /><em>needs lead time.</em></h2></div><p>Use the calendar to decide which retail moments deserve campaigns, landing pages, creative and retention work.</p></div>
          <div className="season-grid">{seasonal.map(([month, title, copy]) => <div key={title}><span>{month}</span><strong>{title}</strong><small>{copy}</small></div>)}</div>
        </div>
      </section>

      <section className="section proof-section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">REAL WORK PROOF</div><h2>Real dashboards.<br /><em>Real work.</em></h2></div><p>Proof imagery is drawn from the source material: Merchant Center, product feeds, store quality, approvals, Shopify connections and analytics.</p></div>
          <div className="proof-gallery">{proofImages.map((item, i) => <figure className={i === 0 ? "proof-image proof-image-large" : "proof-image"} key={item.src}><img src={item.src} alt={item.label} loading="lazy" /><figcaption>{item.label}</figcaption></figure>)}</div>
          <div className="proof-note"><strong>547 products submitted · 19 manually optimised</strong><span>Example work-proof metric from the source material. Keep only figures that are genuinely attributable to the relevant client/work.</span></div>
        </div>
      </section>

      <section className="section ecosystem-section">
        <div className="shell ecosystem-grid"><div><div className="eyebrow">OUR ECOSYSTEM</div><h2>One team.<br /><em>Multiple growth channels.</em></h2><p className="lead">From Shopify development and conversion optimization to SEO, paid media, analytics and retention, the operation connects the tools modern ecommerce brands rely on.</p></div><div className="ecosystem-logos">{ecosystem.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
      </section>

      <section className="section testimonial-section">
        <div className="shell testimonial-box"><div className="eyebrow">TESTIMONIALS</div><h2>What store owners<br /><em>say about the work.</em></h2><div className="testimonial-hold"><strong>Approved client testimony goes here.</strong><p>The source site exposes a client-review section and video-review cards, but the public crawl does not expose the underlying quote text or video files. I have deliberately not invented testimonials.</p><span>Video review system ready for your approved clips.</span></div></div>
      </section>

      <section className="section founder-section"><div className="shell founder-grid"><div className="founder-photo-wrap"><img src="/founder.jpg" alt="AbbeyPress founder" className="founder-photo" /><div className="founder-badge">ABBEYPRESS<br /><span>FOUNDER</span></div></div><div><div className="eyebrow">THE PERSON BEHIND THE SYSTEM</div><h2>Built around the<br /><em>commercial outcome.</em></h2><p className="lead">Strategy, storefront experience, acquisition, retention and measurement should reinforce one another. That is the operating idea behind AbbeyPress.</p></div></div></section>

      <section className="section contact-section" id="contact"><div className="shell contact-box"><div><div className="eyebrow light">READY TO GROW?</div><h2>Tell us where your store is today.</h2><p>Send the store URL, the commercial goal and the bottleneck. Start with the audit if you want the evidence first.</p></div><div className="contact-actions"><a className="button button-light" href="/audit">Run the audit <span>↗</span></a><a className="contact-link" href="/contact">Start a project <span>↗</span></a></div></div></section>

      <footer className="footer"><div className="shell footer-inner"><div className="brand footer-brand"><span className="brand-mark">A</span><span>ABBEYPRESS</span><small>AGENCY</small></div><p>© {new Date().getFullYear()} AbbeyPress Agency. Ecommerce growth systems.</p></div></footer>
    </>
  );
}
