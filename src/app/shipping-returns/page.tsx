import type { Metadata } from "next";
import { shippingReturns } from "@/data/legal";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description: "Delivery times, shipping costs, returns and refunds.",
};

export default function ShippingReturnsPage() {
  return <LegalPage title="Shipping & returns" intro="Delivery times, shipping costs, returns and refunds." sections={shippingReturns} />;
}
