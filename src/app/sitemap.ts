import type { MetadataRoute } from "next";
import { routes, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Same form as the canonical URL of the home (no trailing slash).
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}${routes.invitations}`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
