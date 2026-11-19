import type { Metadata } from "next";
import { privacyPolicy } from "@/data/legal";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How we collect, use and protect your personal information.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy policy" intro="How we collect, use and protect your personal information." sections={privacyPolicy} />;
}
