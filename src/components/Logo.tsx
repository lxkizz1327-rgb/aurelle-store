import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} – home`} className={`inline-flex items-center ${className}`}>
      {siteConfig.logoImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={siteConfig.logoImage} alt={siteConfig.name} className="h-8 w-auto md:h-9" />
      ) : (
        <span className="font-heading text-[26px] font-semibold tracking-[0.18em] md:text-[30px]">{siteConfig.name}</span>
      )}
    </Link>
  );
}
