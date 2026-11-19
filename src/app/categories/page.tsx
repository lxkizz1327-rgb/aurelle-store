import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/SafeImage";

export const metadata: Metadata = {
  title: "Shop by category",
  description: "Browse our collections: women, men, kids and accessories.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader title="Categories" subtitle="Find what you are looking for, collection by collection." crumbs={[{ label: "Categories" }]} />
      <section className="container-x section-y">
        <ul className="grid gap-5 sm:grid-cols-2">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={(i % 2) * 100}>
                <Link href={`/category/${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-secondary">
                  <SafeImage src={c.image} alt={`${c.name} collection`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white md:p-8">
                    <div>
                      <h2 className="text-4xl md:text-5xl">{c.name}</h2>
                      <p className="mt-2 max-w-xs text-sm opacity-90">{c.description}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] opacity-80">{getProductsByCategory(c.slug).length} products</p>
                    </div>
                    <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1 sm:flex">
                      <ArrowRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
