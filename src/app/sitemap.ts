import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();
  const staticPages = [
    "",
    "/shop",
    "/categories",
    "/about",
    "/contact",
    "/blog",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
    "/shipping-returns",
  ];
  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...categories.map((c) => ({ url: `${base}/category/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...blogPosts.map((b) => ({ url: `${base}/blog/${b.slug}`, lastModified: new Date(`${b.date}T00:00:00Z`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
