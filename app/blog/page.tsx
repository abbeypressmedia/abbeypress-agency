import { SiteNav } from "@/components/site-nav";

const articles = [
  {
    category: "CONVERSION",
    title: "Why more traffic won't fix a confused storefront.",
    excerpt: "Traffic amplifies whatever happens after the click. Start by making the buying path obvious.",
  },
  {
    category: "STRATEGY",
    title: "The difference between an ecommerce tactic and a growth system.",
    excerpt: "A tactic can create a spike. A system gives the business a repeatable operating model.",
  },
  {
    category: "RETENTION",
    title: "Where the second purchase actually starts.",
    excerpt: "Retention begins before checkout—with expectations, onboarding and the reason to return.",
  },
];

export default function BlogPage() {
  return (
    <main>
      <SiteNav />
      <section className="section blog-hero">
        <div className="shell">
          <div className="eyebrow">ABBEYPRESS / INSIGHTS</div>
          <h1>Useful thinking for<br /><em>better commerce.</em></h1>
          <p className="hero-copy">Practical notes on storefronts, conversion, acquisition, retention and ecommerce systems.</p>
        </div>
      </section>
      <section className="section blog-list">
        <div className="shell article-grid blog-page-grid">
          {articles.map((article) => (
            <article key={article.title}>
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <a href="#contact">Read article ↗</a>
            </article>
          ))}
        </div>
      </section>
      <section className="section contact-section" id="contact">
        <div className="shell contact-box">
          <div>
            <div className="eyebrow light">ABBEYPRESS</div>
            <h2>Have a store to grow?</h2>
            <p>Start with the store audit and we’ll identify the highest-value opportunities.</p>
          </div>
          <a className="button button-light" href="/#audit">Get the audit <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
