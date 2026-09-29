import type { MetadataRoute } from "next";

const baseUrl = "https://abbeypress-agency.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: baseUrl + "/audit", changeFrequency: "monthly", priority: 0.9 },
    { url: baseUrl + "/contact", changeFrequency: "monthly", priority: 0.9 },
    { url: baseUrl + "/blog", changeFrequency: "monthly", priority: 0.6 },
    { url: baseUrl + "/privacy", changeFrequency: "yearly", priority: 0.2 },
  ];
}
