import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Answers about delivery, returns, sizing, care and more.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader title="FAQ" subtitle="Quick answers to the questions we hear most." crumbs={[{ label: "FAQ" }]} />
      <section className="container-x section-y">
        <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <details key={f.question} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 font-heading text-2xl">
                {f.question}
                <Plus size={20} className="shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center text-muted">
          Still have a question?{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-accent">
            Contact us
          </Link>
          .
        </p>
      </section>
    </>
  );
}
