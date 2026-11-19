import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Questions about an order, a product or anything else? Get in touch with our team.",
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const details = [
    { icon: "Mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: "Phone", label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` },
    { icon: "MapPin", label: "Address", value: contact.address },
    { icon: "Clock", label: "Hours", value: contact.hours },
  ];
  return (
    <>
      <PageHeader title="Contact us" subtitle="We would love to hear from you. Send a message and we will reply within one working day." crumbs={[{ label: "Contact" }]} />
      <section className="container-x section-y">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="text-4xl">Get in touch</h2>
            <ul className="mt-8 space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-accent">
                    <Icon name={d.icon} size={19} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="hover:text-accent">
                        {d.value}
                      </a>
                    ) : (
                      <p>{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-surface p-6 md:p-10">
            <h2 className="mb-6 text-4xl">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
