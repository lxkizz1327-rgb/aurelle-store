import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  actionLabel,
  actionHref,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  actionLabel?: string;
  actionHref?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`mb-10 flex flex-col gap-4 md:mb-14 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="text-4xl md:text-5xl">{title}</h2>
        {text ? <p className="mt-4 text-base leading-relaxed text-muted">{text}</p> : null}
      </div>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="link-underline inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em]">
          {actionLabel}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
