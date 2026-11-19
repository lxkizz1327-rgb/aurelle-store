"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { categories } from "@/data/categories";
import { searchProducts } from "@/data/products";
import { useLockBody } from "@/lib/useLockBody";
import { cn, formatPrice, unitPrice } from "@/lib/utils";
import SafeImage from "./SafeImage";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBody(searchOpen);

  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => (query.trim().length < 2 ? [] : searchProducts(query).slice(0, 6)), [query]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className={cn("fixed inset-0 z-[65]", searchOpen ? "visible" : "invisible pointer-events-none")} aria-hidden={!searchOpen}>
      <div
        onClick={() => setSearchOpen(false)}
        className={cn("absolute inset-0 bg-black transition-opacity duration-300", searchOpen ? "opacity-50" : "opacity-0")}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={cn(
          "absolute inset-x-0 top-0 max-h-[90vh] overflow-y-auto bg-surface shadow-2xl transition-transform duration-300",
          searchOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="container-x py-6 md:py-8">
          <form onSubmit={onSubmit} role="search" className="flex items-center gap-3 border-b border-primary pb-3">
            <Search size={22} strokeWidth={1.5} aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products…"
              autoComplete="off"
              className="flex-1 bg-transparent font-heading text-2xl outline-none placeholder:text-muted md:text-3xl"
              tabIndex={searchOpen ? 0 : -1}
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="p-1" tabIndex={searchOpen ? 0 : -1}>
              <X size={22} strokeWidth={1.5} />
            </button>
          </form>

          {query.trim().length >= 2 ? (
            results.length > 0 ? (
              <div className="py-6">
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 border border-line p-3 transition-colors hover:border-primary"
                        tabIndex={searchOpen ? 0 : -1}
                      >
                        <span className="relative block h-20 w-16 shrink-0 overflow-hidden bg-secondary">
                          <SafeImage src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-heading text-lg">{p.name}</span>
                          <span className="text-sm text-muted">{formatPrice(unitPrice(p))}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/shop?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => setSearchOpen(false)}
                  className="link-underline mt-6 inline-block text-xs font-medium uppercase tracking-[0.16em]"
                  tabIndex={searchOpen ? 0 : -1}
                >
                  See all results for “{query.trim()}”
                </Link>
              </div>
            ) : (
              <p className="py-8 text-muted">No products found for “{query.trim()}”. Try a different word.</p>
            )
          ) : (
            <div className="py-6">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">Popular categories</p>
              <ul className="flex flex-wrap gap-3">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/category/${c.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="inline-block border border-line px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-primary hover:text-on-primary"
                      tabIndex={searchOpen ? 0 : -1}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
