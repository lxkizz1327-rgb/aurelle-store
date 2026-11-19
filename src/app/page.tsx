import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { images } from "@/data/images";
import { categories } from "@/data/categories";
import { getBestSellers, getFeatured, getNewArrivals, getProductsByCategory } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { formatPrice, isOnSale, unitPrice } from "@/lib/utils";
import Icon from "@/components/Icon";
import NewsletterForm from "@/components/NewsletterForm";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/SafeImage";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";

export default function HomePage() {
  const { hero, home } = siteConfig;
  const newArrivals = getNewArrivals(4);
  const bestSellers = getBestSellers(4);
  const featured = getFeatured(3);

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-secondary md:h-[80vh] md:max-h-[820px]" aria-labelledby="hero-title">
        <SafeImage src={images.hero} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/10 md:bg-gradient-to-r md:from-black/55 md:via-black/15 md:to-transparent" />
        <div className="container-x pb-14 pt-32 text-white md:pb-24">
          <div className="max-w-xl animate-fade-in">
            <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.28em] opacity-90">{hero.eyebrow}</span>
            <h1 id="hero-title" className="text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              {hero.heading}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed opacity-90 md:text-lg">{hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={hero.primaryButton.href} className="btn btn-light">
                {hero.primaryButton.label}
              </Link>
              <Link href={hero.secondaryButton.href} className="btn btn-ghost-light">
                {hero.secondaryButton.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ CATEGORIES */}
      <section className="container-x section-y" aria-label="Shop by category">
        <Reveal>
          <SectionHeading eyebrow={home.categories.eyebrow} title={home.categories.heading} actionLabel="View all" actionHref="/categories" />
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 80}>
                <Link href={`/category/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-secondary">
                  <SafeImage
                    src={c.image}
                    alt={`${c.name} collection`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white md:p-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl">{c.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-85">{getProductsByCategory(c.slug).length} products</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ----------------------------------------------------- NEW ARRIVALS */}
      <section className="container-x pb-16 md:pb-24" aria-label="New arrivals">
        <Reveal>
          <SectionHeading eyebrow={home.newArrivals.eyebrow} title={home.newArrivals.heading} actionLabel="Shop all" actionHref="/shop" />
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------ PROMO BANNER */}
      <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-secondary" aria-label="Promotion">
        <SafeImage src={images.promoBanner} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <Reveal className="container-x py-20 text-center text-white">
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.28em] opacity-90">{home.promo.eyebrow}</span>
          <h2 className="mx-auto max-w-2xl text-4xl md:text-6xl">{home.promo.heading}</h2>
          <p className="mx-auto mt-4 max-w-md opacity-90">{home.promo.text}</p>
          <Link href={home.promo.buttonHref} className="btn btn-light mt-8">
            {home.promo.buttonLabel}
          </Link>
        </Reveal>
      </section>

      {/* ------------------------------------------------------- BEST SELLERS */}
      <section className="container-x section-y" aria-label="Best sellers">
        <Reveal>
          <SectionHeading eyebrow={home.bestSellers.eyebrow} title={home.bestSellers.heading} actionLabel="Shop all" actionHref="/shop" />
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ FEATURED COLLECTION */}
      <section className="bg-secondary" aria-label="Featured collection">
        <div className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <SafeImage src={images.featuredCollection} alt="Featured collection" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">{home.featuredCollection.eyebrow}</span>
            <h2 className="text-4xl md:text-6xl">{home.featuredCollection.heading}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">{home.featuredCollection.text}</p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {featured.map((p) => (
                <li key={p.id}>
                  <Link href={`/product/${p.slug}`} className="group flex items-center gap-4 py-4">
                    <span className="relative block h-20 w-16 shrink-0 overflow-hidden bg-surface">
                      <SafeImage src={p.images[0]} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-heading text-xl transition-colors group-hover:text-accent">{p.name}</span>
                      <span className="text-sm text-muted">
                        {isOnSale(p) ? (
                          <>
                            <span className="text-accent">{formatPrice(unitPrice(p))}</span> <span className="line-through">{formatPrice(p.price)}</span>
                          </>
                        ) : (
                          formatPrice(p.price)
                        )}
                      </span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={home.featuredCollection.buttonHref} className="btn btn-primary mt-8">
              {home.featuredCollection.buttonLabel}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ BRAND STORY */}
      <section className="container-x section-y" aria-label="Our story">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">{home.story.eyebrow}</span>
            <h2 className="text-4xl md:text-6xl">{home.story.heading}</h2>
            <div className="mt-6 max-w-lg space-y-4 leading-relaxed text-muted">
              {home.story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link href={home.story.buttonHref} className="btn btn-outline mt-8">
              {home.story.buttonLabel}
            </Link>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={100}>
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary lg:aspect-[5/6]">
              <SafeImage src={images.brandStory} alt="Our story" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- BENEFITS */}
      <section className="border-y border-line bg-surface" aria-label="Why shop with us">
        <ul className="container-x grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {home.benefits.map((b) => (
            <li key={b.title} className="flex flex-col items-center text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-accent">
                <Icon name={b.icon} size={24} />
              </span>
              <h3 className="font-heading text-2xl">{b.title}</h3>
              <p className="mt-1 text-sm text-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------ TESTIMONIALS */}
      <section className="container-x section-y" aria-label="Customer reviews">
        <Reveal>
          <SectionHeading eyebrow={home.testimonials.eyebrow} title={home.testimonials.heading} align="center" />
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 80} className="h-full">
                <figure className="flex h-full flex-col border border-line bg-surface p-7">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-4 flex-1 font-heading text-xl leading-snug">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">
                    {t.name} · {t.location}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------- INSTAGRAM */}
      <section className="pb-16 md:pb-24" aria-label="Instagram gallery">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow={home.instagram.eyebrow} title={home.instagram.heading} align="center" />
          </Reveal>
        </div>
        <ul className="grid grid-cols-3 md:grid-cols-6">
          {images.instagram.map((src, i) => (
            <li key={src}>
              <a
                href={home.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Instagram – photo ${i + 1}`}
                className="group relative block aspect-square overflow-hidden bg-secondary"
              >
                <SafeImage src={src} alt={`Instagram photo ${i + 1}`} fill sizes="(min-width: 768px) 17vw, 34vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-black text-white opacity-0 transition-opacity duration-300 group-hover:opacity-40" aria-hidden="true" />
                <Icon name="Instagram" size={26} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- NEWSLETTER */}
      <section className="bg-secondary" aria-label="Newsletter">
        <Reveal className="container-x py-16 text-center md:py-24">
          <h2 className="mx-auto max-w-2xl text-4xl md:text-5xl">{home.newsletter.heading}</h2>
          <p className="mx-auto mt-4 max-w-md text-muted">{home.newsletter.text}</p>
          <div className="mx-auto mt-8 max-w-lg">
            <NewsletterForm buttonLabel={home.newsletter.buttonLabel} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
