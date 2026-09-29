export type AuditCheck = {
  id: string;
  category: "Technical" | "SEO" | "Conversion" | "Trust" | "Performance";
  label: string;
  score: number;
  max: number;
  status: "pass" | "warning" | "fail";
  finding: string;
  recommendation: string;
};

export type AuditPlanPhase = {
  days: string;
  phase: string;
  objective: string;
  actions: string[];
};

export type AuditResult = {
  url: string;
  finalUrl: string;
  score: number;
  grade: string;
  generatedAt: string;
  checks: AuditCheck[];
  summary: string;
  actionPlan: AuditPlanPhase[];
};

function has(html: string, pattern: RegExp) {
  return pattern.test(html);
}

function count(html: string, pattern: RegExp) {
  return (html.match(pattern) || []).length;
}

function textBetween(html: string, pattern: RegExp) {
  const match = html.match(pattern);
  return match?.[1]?.replace(/\s+/g, " ").trim() || "";
}

export async function runAudit(inputUrl: string): Promise<AuditResult> {
  let parsed: URL;
  try {
    parsed = new URL(inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`);
  } catch {
    throw new Error("Enter a valid store URL.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only HTTP and HTTPS store URLs are supported.");
  }

  const hostname = parsed.hostname.toLowerCase();
  const blockedHost =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "0.0.0.0" ||
    hostname === "::1" ||
    hostname.startsWith("127.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname) ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".local");

  if (blockedHost) {
    throw new Error("That address is not a public storefront URL.");
  }

  const response = await fetch(parsed.toString(), {
    redirect: "follow",
    signal: AbortSignal.timeout(12000),
    headers: {
      "User-Agent": "AbbeyPress-Audit/1.0 (+https://abbeypress.agency)",
      "Accept": "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`The storefront returned HTTP ${response.status}. Make sure the store is publicly accessible.`);
  }

  const finalUrl = response.url;
  const html = (await response.text()).slice(0, 2_000_000);
  const lower = html.toLowerCase();

  const title = textBetween(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = textBetween(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
    || textBetween(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  const h1Count = count(html, /<h1(?:\s|>)/gi);
  const images = count(html, /<img(?:\s|>)/gi);
  const imagesWithAlt = count(html, /<img[^>]+alt=["'][^"']+["'][^>]*>/gi);
  const links = count(html, /<a(?:\s|>)/gi);
  const productSignals = has(lower, /shopify|woocommerce|product-json|add-to-cart|add to cart|buy now/);
  const schema = has(lower, /application\/ld\+json/);
  const canonical = has(lower, /<link[^>]+rel=["']canonical["']/i);
  const viewport = has(lower, /<meta[^>]+name=["']viewport["']/i);
  const socialProof = has(lower, /testimonial|review|reviews|customer|rated|star rating/);
  const paymentTrust = has(lower, /secure checkout|ssl|payment|visa|mastercard|paypal|stripe|klarna|apple pay|google pay/);
  const analytics = has(lower, /googletagmanager|google-analytics|gtag\(|fbq\(|facebook pixel|meta pixel/);
  const structuredProduct = has(lower, /"@type"\s*:\s*"product"/i);
  const ecommerceCta = has(lower, /add to cart|buy now|shop now|checkout|subscribe|order now/);
  const https = finalUrl.startsWith("https://");
  const wordCount = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;

  const checks: AuditCheck[] = [
    {
      id:"https", category:"Technical", label:"Secure HTTPS connection", max:10,
      score:https ? 10 : 0, status:https ? "pass" : "fail",
      finding:https ? "The final storefront URL uses HTTPS." : "The final storefront URL is not using HTTPS.",
      recommendation:https ? "Keep HTTPS enforced across every storefront route." : "Enable HTTPS and redirect every HTTP request to HTTPS."
    },
    {
      id:"viewport", category:"Technical", label:"Mobile viewport configuration", max:10,
      score:viewport ? 10 : 0, status:viewport ? "pass" : "fail",
      finding:viewport ? "A responsive viewport meta tag was detected." : "No responsive viewport declaration was detected.",
      recommendation:viewport ? "Validate the mobile experience on real devices." : "Add a responsive viewport declaration and test the storefront at mobile widths."
    },
    {
      id:"title", category:"SEO", label:"Unique page title", max:8,
      score:title.length >= 20 && title.length <= 65 ? 8 : title ? 4 : 0,
      status:title.length >= 20 && title.length <= 65 ? "pass" : title ? "warning" : "fail",
      finding:title ? `Detected: “${title.slice(0, 90)}${title.length > 90 ? "…" : ""}”` : "No usable page title was detected.",
      recommendation:title.length >= 20 && title.length <= 65 ? "Keep the title tightly aligned with search intent and the offer." : "Write a specific title that communicates the product/category and buying intent."
    },
    {
      id:"description", category:"SEO", label:"Meta description", max:7,
      score:description.length >= 70 && description.length <= 170 ? 7 : description ? 3 : 0,
      status:description.length >= 70 && description.length <= 170 ? "pass" : description ? "warning" : "fail",
      finding:description ? "A meta description is present." : "No meta description was detected.",
      recommendation:description ? "Make the description specific, benefit-led and consistent with the page offer." : "Add a compelling meta description that earns the search click."
    },
    {
      id:"headings", category:"Conversion", label:"Clear H1 hierarchy", max:8,
      score:h1Count === 1 ? 8 : h1Count > 1 ? 4 : 0,
      status:h1Count === 1 ? "pass" : h1Count > 1 ? "warning" : "fail",
      finding:`Detected ${h1Count} H1 heading${h1Count === 1 ? "" : "s"}.`,
      recommendation:h1Count === 1 ? "Keep the primary headline focused on the main customer outcome." : "Use one primary H1 and structure supporting sections with H2/H3 headings."
    },
    {
      id:"cta", category:"Conversion", label:"Purchase/action signals", max:12,
      score:ecommerceCta ? 12 : 4,
      status:ecommerceCta ? "pass" : "warning",
      finding:ecommerceCta ? "Clear commercial action language was detected." : "Few obvious commercial calls to action were detected.",
      recommendation:ecommerceCta ? "Make the primary CTA visually dominant and consistent with the visitor's intent." : "Add clear, repeated calls to action that tell shoppers exactly what to do next."
    },
    {
      id:"product", category:"Conversion", label:"Ecommerce/product signals", max:10,
      score:productSignals ? 10 : 4,
      status:productSignals ? "pass" : "warning",
      finding:productSignals ? "Ecommerce/product implementation signals were detected." : "The page does not expose strong ecommerce implementation signals.",
      recommendation:productSignals ? "Check product pages, cart and checkout separately for friction." : "Make product discovery and purchase paths explicit on the storefront."
    },
    {
      id:"images", category:"Performance", label:"Image accessibility basics", max:8,
      score:images === 0 ? 8 : Math.round((imagesWithAlt / images) * 8),
      status:images === 0 || imagesWithAlt === images ? "pass" : imagesWithAlt > images * .7 ? "warning" : "fail",
      finding:images === 0 ? "No image tags were found in the sampled HTML." : `${imagesWithAlt} of ${images} detected images include non-empty alt text.`,
      recommendation:images === 0 || imagesWithAlt === images ? "Keep descriptive alt text on meaningful imagery." : "Add useful alt text to meaningful product and content imagery; avoid keyword stuffing."
    },
    {
      id:"schema", category:"SEO", label:"Structured data", max:7,
      score:structuredProduct ? 7 : schema ? 4 : 0,
      status:structuredProduct ? "pass" : schema ? "warning" : "fail",
      finding:structuredProduct ? "Product structured data was detected." : schema ? "Structured data exists, but a Product schema was not detected." : "No JSON-LD structured data was detected.",
      recommendation:structuredProduct ? "Validate Product, Offer and review data as the catalog changes." : "Add valid JSON-LD for products, offers, organization and relevant content types."
    },
    {
      id:"trust", category:"Trust", label:"Trust and social-proof signals", max:10,
      score:(socialProof ? 6 : 0) + (paymentTrust ? 4 : 0),
      status:socialProof && paymentTrust ? "pass" : socialProof || paymentTrust ? "warning" : "fail",
      finding:`${socialProof ? "Social-proof signals detected." : "Limited social-proof signals detected."} ${paymentTrust ? "Payment/security language detected." : "Limited payment/security trust language detected."}`,
      recommendation:"Make reviews, guarantees, shipping/returns, payment reassurance and customer proof easy to find before checkout."
    },
    {
      id:"analytics", category:"Technical", label:"Analytics/measurement signals", max:8,
      score:analytics ? 8 : 0,
      status:analytics ? "pass" : "fail",
      finding:analytics ? "Common analytics or marketing measurement signals were detected." : "No common analytics/marketing measurement signal was detected in the HTML.",
      recommendation:analytics ? "Audit event quality—not just whether a tracking script exists." : "Install a consent-aware analytics stack and verify key ecommerce events."
    },
    {
      id:"canonical", category:"SEO", label:"Canonical URL", max:5,
      score:canonical ? 5 : 0,
      status:canonical ? "pass" : "warning",
      finding:canonical ? "A canonical link was detected." : "No canonical link was detected.",
      recommendation:canonical ? "Keep canonical URLs consistent with indexable page variants." : "Add canonical URLs where duplicate or parameterized pages can occur."
    },
    {
      id:"content", category:"Conversion", label:"Useful on-page content", max:7,
      score:wordCount >= 350 ? 7 : wordCount >= 180 ? 4 : 1,
      status:wordCount >= 350 ? "pass" : wordCount >= 180 ? "warning" : "fail",
      finding:`The sampled HTML contains roughly ${wordCount} words of text.`,
      recommendation:"Prioritize useful product/category information, objections, proof and buying guidance over generic filler."
    },
  ];

  const total = checks.reduce((sum, check) => sum + check.score, 0);
  const max = checks.reduce((sum, check) => sum + check.max, 0);
  const score = Math.round((total / max) * 100);
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
  const failures = checks.filter((check) => check.status === "fail").length;
  const warnings = checks.filter((check) => check.status === "warning").length;
  const critical = checks.filter((check) => check.status === "fail");
  const improvement = checks.filter((check) => check.status === "warning");
  const criticalActions = critical.length
    ? critical.map((check) => `Fix ${check.label}: ${check.recommendation}`)
    : ["No critical technical or conversion failures were detected. Validate the highest-value customer journey manually before scaling traffic."];
  const improvementActions = improvement.length
    ? improvement.map((check) => `Improve ${check.label}: ${check.recommendation}`)
    : ["No warning-level gaps were detected. Use controlled experiments to improve the strongest remaining growth constraint."];

  const actionPlan: AuditPlanPhase[] = [
    {
      days: "Days 1–7",
      phase: "Stabilize the foundation",
      objective: "Remove the issues that can block trust, discoverability, measurement or basic purchasing behavior.",
      actions: criticalActions.slice(0, 5),
    },
    {
      days: "Days 8–21",
      phase: "Repair the buying journey",
      objective: "Turn the storefront into a clearer path from landing page to product decision to checkout.",
      actions: [
        ...improvementActions.filter((action) => /CTA|Purchase|Ecommerce|Trust|content/i.test(action)).slice(0, 3),
        "Review the homepage, collection pages, product pages, cart and checkout as one connected funnel.",
        "Add proof, objections, shipping/returns and payment reassurance at the points where shoppers hesitate.",
      ],
    },
    {
      days: "Days 22–45",
      phase: "Build demand capture and measurement",
      objective: "Strengthen organic signals, content depth and event tracking so decisions are based on observed behavior.",
      actions: [
        ...improvementActions.filter((action) => /SEO|Structured|Canonical|Analytics|content/i.test(action)).slice(0, 3),
        "Verify analytics events for product views, add-to-cart, checkout start and purchase.",
        "Publish or improve high-intent content that answers buying questions and supports product discovery.",
      ],
    },
    {
      days: "Days 46–60",
      phase: "Test, learn and compound",
      objective: "Use the repaired foundation to run focused experiments and measure movement in the funnel.",
      actions: [
        "Establish a weekly baseline for traffic, product engagement, add-to-cart rate, checkout rate and conversion rate.",
        "Run 1–2 controlled tests against the biggest remaining bottleneck instead of changing the whole store at once.",
        "Compare results against the baseline, keep winning changes, document learnings and set the next 60-day priorities.",
      ],
    },
  ];

  return {
    url: parsed.toString(),
    finalUrl,
    score,
    grade,
    generatedAt: new Date().toISOString(),
    checks,
    actionPlan,
    summary: `${failures} high-priority gaps and ${warnings} improvement opportunities were detected in the public storefront scan.`,
  };
}
