import type { Metadata } from "next";
import CheckoutView from "@/components/CheckoutView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Checkout (demo)",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <CheckoutView />
    </>
  );
}
