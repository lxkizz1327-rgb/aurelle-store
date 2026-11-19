import type { Metadata } from "next";
import { termsAndConditions } from "@/data/legal";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms that apply when you use this website and buy from us.",
};

export default function TermsPage() {
  return <LegalPage title="Terms & conditions" intro="The terms that apply when you use this website and buy from us." sections={termsAndConditions} />;
}
