import PageHeader from "./PageHeader";
import { legalLastUpdated } from "@/data/legal";
import type { LegalSection } from "@/lib/types";

export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader title={title} subtitle={intro} />
      <article className="container-x section-y">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-sm text-muted">Last updated: {legalLastUpdated}</p>
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="mb-3 text-3xl">{s.heading}</h2>
                <div className="space-y-3 leading-relaxed text-muted">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
