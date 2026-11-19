import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import Icon from "./Icon";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-primary text-on-primary">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr]">
          <div>
            <p className="font-heading text-3xl font-semibold tracking-[0.16em]">{siteConfig.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-75">{siteConfig.footer.about}</p>
            <ul className="mt-6 flex gap-3">
              {siteConfig.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center border border-white transition-colors hover:bg-white hover:text-black"
                  >
                    <Icon name={s.icon} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {siteConfig.footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] opacity-60">{col.title}</p>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="opacity-85 transition-opacity hover:opacity-100 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] opacity-60">Stay in touch</p>
            <p className="mb-4 text-sm leading-relaxed opacity-75">{siteConfig.home.newsletter.text}</p>
            <NewsletterForm buttonLabel="Join" dark />
            <ul className="mt-6 space-y-2 text-sm opacity-85">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white pt-6 text-xs opacity-70 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {siteConfig.footer.copyright}
          </p>
          <p>Demo checkout – no real payments are taken.</p>
        </div>
      </div>
    </footer>
  );
}
