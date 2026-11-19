import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import ShopBrowser from "@/components/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop all products",
  description: "Browse the full collection. Filter by category and price, and sort by popularity or price.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader title="Shop" subtitle="Everything in the collection, in one place." crumbs={[{ label: "Shop" }]} />
      <Suspense fallback={<div className="container-x py-24 text-center text-muted">Loading products…</div>}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}
