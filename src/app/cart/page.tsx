import type { Metadata } from "next";
import CartView from "@/components/CartView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Shopping cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Your cart" crumbs={[{ label: "Cart" }]} />
      <CartView />
    </>
  );
}
