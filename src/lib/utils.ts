import { siteConfig } from "@/data/site-config";
import type { Product } from "./types";

export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

export function formatPrice(amount: number): string {
  const { code, locale } = siteConfig.currency;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function isOnSale(p: Product): boolean {
  return p.salePrice !== undefined && p.salePrice < p.price;
}

export function unitPrice(p: Product): number {
  return isOnSale(p) ? (p.salePrice as number) : p.price;
}

export function discountPercent(p: Product): number {
  if (!isOnSale(p)) return 0;
  return Math.round(((p.price - unitPrice(p)) / p.price) * 100);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function shippingFor(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= siteConfig.shop.freeShippingThreshold ? 0 : siteConfig.shop.flatShippingRate;
}
