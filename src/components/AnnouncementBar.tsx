import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function AnnouncementBar() {
  const { enabled, text, linkLabel, linkHref } = siteConfig.announcement;
  if (!enabled) return null;
  return (
    <div className="bg-primary px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.18em] text-on-primary md:text-xs">
      <span>{text}</span>
      {linkLabel ? (
        <Link href={linkHref} className="ml-3 underline underline-offset-4 transition-opacity hover:opacity-70">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
