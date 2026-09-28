"use client";

import { useState } from "react";

const systems = [
  ["01", "Store strategy", "Positioning, offer architecture and the commercial path from first click to repeat purchase."],
  ["02", "Conversion design", "Landing pages and storefront UX built around clarity, trust and action."],
  ["03", "Technical foundations", "Speed, mobile UX, analytics and the infrastructure that keeps growth measurable."],
  ["04", "Retention", "Lifecycle email, segmentation and post-purchase systems that increase customer value."],
  ["05", "Paid acquisition", "Creative, landing-page alignment and channel systems for profitable traffic."],
  ["06", "Growth reporting", "A practical operating view of what changed, what worked and what to improve next."],
];

const services = [
  { name: "Storefront", copy: "A sharper ecommerce experience from homepage to checkout.", bullets: ["UX audit", "Design system", "Shopify implementation"] },
  { name: "Growth", copy: "A connected acquisition and conversion system, not isolated campaigns.", bullets: ["Offer strategy", "Landing pages", "Paid media support"] },
  { name: "Retention", copy: "Turn more first-time buyers into repeat customers.", bullets: ["Lifecycle flows", "Segmentation", "Campaign calendar"] },
];

const proof = [
  ["01", "Diagnose", "Find the revenue leaks before spending more money."],
  ["02", "Prioritize", "Turn the audit into a ranked execution plan."],
  ["03", "Build", "Ship the highest-impact improvements in focused sprints."],
  ["04", "Measure", "Track the inputs and commercial outcomes that matter."],
];

export function HomeSections() {
  const [activeService, setActiveService] = useState(services[0].name);

  return (
    <>
      <section className="hero section">
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow"><span className="pulse" /> ECOMMERCE GROWTH STUDIO</div>
            <h1>Build an online store that <em>earns</em> attention.</h1>
            <p className="hero-copy">
              AbbeyPress helps ecommerce brands turn traffic into customers with stronger storefronts,
              clearer offers and conversion systems that compound.
            </p>
            <div className="actions">
              <a className="button button-dark" href="#audit">Get your free audit <span>↗</span></a>
              <a className="text-link" href="#systems">Explore the systems <span>↓</span></a>
            </div>
            <div className="micro-proof">
              <span>Strategy</span><i /> <span>Design</span><i /> <span>Development</span><i /> <span>Growth</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract ecommerce growth dashboard preview">
            <div className="art-grid" />
            <div className="metric-card metric-main">
              <small>STORE HEALTH</small>
              <strong>86<span>/100</span></strong>
              <div className="mini-bars">
                <span style={{ height: "28%" }} />
                <span style={{ height: "42%" }} />
                <span style={{ height: "36%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "68%" }} />
                <span style={{ height: "82%" }} />
                <span style={{ height: "94%" }} />
              </div>
            </div>
            <div className="metric-card metric-side">
              <small>CONVERSION</small>
              <strong>+31.8%</strong>
              <span className="trend">↗ compared with previous period</span>
            </div>
            <div className="floating-pill">Commerce systems, connected.</div>
          </div>
        </div>
      </section>

      <section className="signal-bar">
        <div className="shell signal-inner">
          <span>BUILT FOR GROWTH-MINDED BRANDS</span>
          <div><b>SHOPIFY</b><b>KLAVIYO</b><b>META</b><b>GOOGLE</b><b>TIKTOK</b></div>
        </div>
      </section>

      <section className="section intro" id="proof">
        <div className="shell split">
          <div>
            <div className="eyebrow">THE ABBEYPRESS APPROACH</div>
            <h2>Less guessing.<br /><em>More useful work.</em></h2>
          </div>
          <div>
            <p className="lead">
              Most stores do not need another random tactic. They need a connected system where the
              storefront, offer, traffic, retention and measurement all support the same commercial goal.
            </p>
            <a className="text-link" href="#audit">See how we diagnose a store <span>↗</span></a>
          </div>
        </div>
        <div className="shell process-grid">
          {proof.map(([number, title, copy]) => (
            <article key={number} className="process-card">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section dark-section" id="systems">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow light">THE GROWTH SYSTEM</div>
              <h2>Six levers.<br /><em>One commercial engine.</em></h2>
            </div>
            <p>Start where the bottleneck is, then connect the improvements so each layer reinforces the next.</p>
          </div>
          <div className="system-grid">
            {systems.map(([number, title, copy]) => (
              <article className="system-card" key={number}>
                <span className="system-number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="arrow">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">SERVICES</div>
              <h2>Choose the work.<br /><em>Keep the outcome in view.</em></h2>
            </div>
          </div>
          <div className="service-layout">
            <div className="service-tabs">
              {services.map((service) => (
                <button
                  key={service.name}
                  className={activeService === service.name ? "service-tab active" : "service-tab"}
                  onClick={() => setActiveService(service.name)}
                >
                  <span>{service.name}</span>
                  <b>→</b>
                </button>
              ))}
            </div>
            <div className="service-panel">
              {services.filter((service) => service.name === activeService).map((service) => (
                <div key={service.name}>
                  <span className="eyebrow">SELECTED SERVICE</span>
                  <h3>{service.name}</h3>
                  <p>{service.copy}</p>
                  <div className="tag-row">
                    {service.bullets.map((bullet) => <span key={bullet}>{bullet}</span>)}
                  </div>
                  <a className="button button-dark" href="#contact">Talk about this work <span>↗</span></a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section audit-section" id="audit">
        <div className="shell audit-card">
          <div>
            <div className="eyebrow">FREE STORE AUDIT</div>
            <h2>Before we build,<br /><em>let's find the leak.</em></h2>
            <p>
              Get a practical first-pass review covering storefront clarity, mobile experience,
              conversion friction, trust, tracking and growth readiness.
            </p>
            <div className="audit-points">
              <span>✓ Shareable report</span>
              <span>✓ Prioritized opportunities</span>
              <span>✓ No sales call required</span>
            </div>
          </div>
          <form className="audit-form" action="#contact">
            <label htmlFor="store-url">Store URL</label>
            <input id="store-url" name="store-url" placeholder="https://yourstore.com" type="url" required />
            <label htmlFor="email">Work email</label>
            <input id="email" name="email" placeholder="you@company.com" type="email" required />
            <button className="button button-light" type="submit">Start the audit <span>↗</span></button>
            <small>Demo form for the first build. The audit engine will be wired in the next phase.</small>
          </form>
        </div>
      </section>

      <section className="section roadmap">
        <div className="shell split">
          <div>
            <div className="eyebrow">WHAT COMES NEXT</div>
            <h2>A website is the front door.<br /><em>The system is the business.</em></h2>
          </div>
          <div>
            <p className="lead">We will turn this foundation into a complete agency operating site: case studies, seasonal planning, live audit reports, blog, integrations and lead capture.</p>
            <a className="button button-dark" href="#contact">Start a project <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="shell contact-box">
          <div>
            <div className="eyebrow light">CONTACT</div>
            <h2>Have a store to grow?</h2>
            <p>Bring the URL, the commercial goal and the bottleneck. We will start from there.</p>
          </div>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:hello@abbeypress.agency">Email AbbeyPress <span>↗</span></a>
            <a className="contact-link" href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <div className="brand footer-brand"><span className="brand-mark">A</span><span>ABBEYPRESS</span><small>AGENCY</small></div>
          <p>© {new Date().getFullYear()} AbbeyPress Agency. Built for better commerce.</p>
        </div>
      </footer>
    </>
  );
}
