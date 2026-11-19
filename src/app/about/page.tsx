import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { images } from "@/data/images";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/SafeImage";

export const metadata: Metadata = {
  title: "About us",
  description: siteConfig.about.intro,
};

export default function AboutPage() {
  const { about } = siteConfig;
  return (
    <>
      <PageHeader title={about.heading} subtitle={about.intro} crumbs={[{ label: "About us" }]} />

      <section className="container-x pt-12 md:pt-16">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary md:aspect-[21/9]">
            <SafeImage src={images.aboutHero} alt={`The ${siteConfig.name} team and studio`} fill priority sizes="100vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="container-x section-y">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <SafeImage src={images.aboutStory} alt="Our story" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">Our story</span>
            <h2 className="text-4xl md:text-5xl">{about.storyHeading}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-x section-y">
          <ul className="grid gap-10 md:grid-cols-3">
            {about.values.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={i * 100}>
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface text-accent">
                    <Icon name={v.icon} size={24} />
                  </span>
                  <h3 className="text-3xl">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x section-y">
        <ul className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {about.stats.map((s) => (
            <li key={s.label}>
              <p className="font-heading text-6xl text-accent">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <Link href="/shop" className="btn btn-primary">
            Shop the collection
          </Link>
        </div>
      </section>
    </>
  );
}
