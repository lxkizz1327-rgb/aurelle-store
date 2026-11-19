import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight size={12} aria-hidden="true" />
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function PageHeader({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="border-b border-line bg-secondary">
      <div className="container-x py-12 md:py-16">
        <Breadcrumbs items={crumbs.length ? crumbs : [{ label: title }]} />
        <h1 className="text-5xl md:text-6xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{subtitle}</p> : null}
      </div>
    </section>
  );
}
