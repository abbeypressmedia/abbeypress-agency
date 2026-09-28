"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Check = {
  id: string;
  category: string;
  label: string;
  score: number;
  max: number;
  status: "pass" | "warning" | "fail";
  finding: string;
  recommendation: string;
};

type Result = {
  url: string;
  finalUrl: string;
  score: number;
  grade: string;
  generatedAt: string;
  checks: Check[];
  summary: string;
};

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialUrl = params.get("url");
    if (initialUrl) setUrl(initialUrl);
  }, []);

  const grouped = useMemo(() => {
    if (!result) return {};
    return result.checks.reduce<Record<string, Check[]>>((acc, check) => {
      (acc[check.category] ||= []).push(check);
      return acc;
    }, {});
  }, [result]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Audit failed.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Audit failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="audit-page-hero">
        <div className="shell">
          <a className="audit-back" href="/">← AbbeyPress</a>
          <div className="eyebrow light">ABBEYPRESS / STORE AUDIT</div>
          <h1>Find the gaps<br /><em>before you spend more.</em></h1>
          <p>Enter a public storefront URL. We’ll scan the page for technical, SEO, conversion, trust and measurement signals and turn the findings into a practical action list.</p>
          <form className="audit-page-form" onSubmit={submit}>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourstore.com" type="url" required />
            <button className="button button-light" disabled={loading}>{loading ? "Scanning store…" : "Run free audit ↗"}</button>
          </form>
          {error && <p className="audit-error">{error}</p>}
          <div className="audit-expectations">
            <span>✓ Public storefront only</span><span>✓ No admin access required</span><span>✓ Practical recommendations</span>
          </div>
        </div>
      </section>

      {result && (
        <section className="audit-result-section">
          <div className="shell">
            <div className="audit-result-top">
              <div>
                <div className="eyebrow">AUDIT RESULT</div>
                <h2>{new URL(result.finalUrl).hostname}</h2>
                <p>{result.summary}</p>
              </div>
              <div className="score-ring"><strong>{result.score}</strong><span>/100</span><small>GRADE {result.grade}</small></div>
            </div>

            <div className="audit-priority">
              {(["fail", "warning"] as const).map((status) => {
                const items = result.checks.filter((check) => check.status === status);
                return (
                  <div key={status}>
                    <span className={`status-label ${status}`}>{status === "fail" ? "Priority fixes" : "Improve next"}</span>
                    <strong>{items.length}</strong>
                    <small>{status === "fail" ? "issues affecting fundamentals" : "opportunities detected"}</small>
                  </div>
                );
              })}
            </div>

            <div className="audit-category-grid">
              {Object.entries(grouped).map(([category, checks]) => (
                <section className="audit-category" key={category}>
                  <div className="category-head"><h3>{category}</h3><span>{checks.reduce((a, c) => a + c.score, 0)} / {checks.reduce((a, c) => a + c.max, 0)}</span></div>
                  {checks.map((check) => (
                    <article className="audit-check" key={check.id}>
                      <div className={`check-dot ${check.status}`} />
                      <div>
                        <strong>{check.label}</strong>
                        <p>{check.finding}</p>
                        <small><b>Next:</b> {check.recommendation}</small>
                      </div>
                      <span className="check-score">{check.score}/{check.max}</span>
                    </article>
                  ))}
                </section>
              ))}
            </div>

            <div className="audit-result-cta">
              <div><span className="eyebrow">TURN THE AUDIT INTO ACTION</span><h3>Want us to prioritize the fixes?</h3><p>Send the report to AbbeyPress and we can turn the findings into a practical growth roadmap.</p></div>
              <a className="button button-dark" href="/contact">Talk through the findings ↗</a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
