"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { siteConfig } from "@/data/site-config";
import { cn, formatPrice, isOnSale, unitPrice } from "@/lib/utils";
import ProductCard from "./ProductCard";

type SortKey = "popularity" | "newest" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popularity", label: "Most popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export default function ShopBrowser({ lockedCategory }: { lockedCategory?: string }) {
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";
  const urlCategory = params.get("category") ?? "all";
  const urlSale = params.get("sale") === "1";

  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState(lockedCategory ?? urlCategory);
  const [rangeIndex, setRangeIndex] = useState(-1);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(urlSale);
  const [sort, setSort] = useState<SortKey>("popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => setQuery(urlQuery), [urlQuery]);
  useEffect(() => {
    if (!lockedCategory) setCategory(urlCategory);
  }, [urlCategory, lockedCategory]);
  useEffect(() => setSaleOnly(urlSale), [urlSale]);

  const ranges = siteConfig.shop.priceRanges;

  const scope = useMemo(
    () => (lockedCategory ? products.filter((p) => p.category === lockedCategory) : products),
    [lockedCategory],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = scope.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (q && !`${p.name} ${p.category} ${p.shortDescription} ${p.description}`.toLowerCase().includes(q)) return false;
      if (rangeIndex >= 0) {
        const r = ranges[rangeIndex];
        const price = unitPrice(p);
        if (price < r.min) return false;
        if (r.max !== null && price >= r.max) return false;
      }
      if (inStockOnly && p.stock <= 0) return false;
      if (saleOnly && !isOnSale(p)) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.createdAt.localeCompare(a.createdAt);
        case "price-asc":
          return unitPrice(a) - unitPrice(b);
        case "price-desc":
          return unitPrice(b) - unitPrice(a);
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [scope, query, category, rangeIndex, inStockOnly, saleOnly, sort, ranges]);

  const activeFilters =
    (category !== "all" && !lockedCategory ? 1 : 0) +
    (rangeIndex >= 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (saleOnly ? 1 : 0) +
    (query.trim() ? 1 : 0);

  function clearAll() {
    setQuery("");
    if (!lockedCategory) setCategory("all");
    setRangeIndex(-1);
    setInStockOnly(false);
    setSaleOnly(false);
  }

  function rangeLabel(r: { min: number; max: number | null }): string {
    if (r.max === null) return `${formatPrice(r.min)} and above`;
    if (r.min === 0) return `Under ${formatPrice(r.max)}`;
    return `${formatPrice(r.min)} – ${formatPrice(r.max)}`;
  }

  const countFor = (slug: string) => products.filter((p) => p.category === slug).length;

  return (
    <div className="container-x py-10 md:py-14">
      {/* Top bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <p className="text-sm text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {query.trim() ? <> for “{query.trim()}”</> : null}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            aria-controls="shop-filters"
            className="btn btn-outline px-4 py-2.5 lg:hidden"
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            Filters{activeFilters > 0 ? ` (${activeFilters})` : ""}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="hidden text-muted sm:inline">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field w-auto py-2.5 pr-8">
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
        {/* Filters */}
        <aside id="shop-filters" className={cn("space-y-8", filtersOpen ? "block" : "hidden", "lg:block")} aria-label="Product filters">
          <div>
            <label htmlFor="shop-search" className="label">
              Search
            </label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="field"
            />
          </div>

          {!lockedCategory ? (
            <fieldset>
              <legend className="label">Category</legend>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    aria-pressed={category === "all"}
                    className={cn("flex w-full justify-between py-1 text-left transition-colors hover:text-accent", category === "all" && "font-medium text-accent")}
                  >
                    <span>All products</span>
                    <span className="text-muted">{products.length}</span>
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <button
                      type="button"
                      onClick={() => setCategory(c.slug)}
                      aria-pressed={category === c.slug}
                      className={cn("flex w-full justify-between py-1 text-left transition-colors hover:text-accent", category === c.slug && "font-medium text-accent")}
                    >
                      <span>{c.name}</span>
                      <span className="text-muted">{countFor(c.slug)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>
          ) : null}

          <fieldset>
            <legend className="label">Price</legend>
            <ul className="space-y-2 text-sm">
              <li>
                <label className="flex cursor-pointer items-center gap-2.5 py-1">
                  <input type="radio" name="price" checked={rangeIndex === -1} onChange={() => setRangeIndex(-1)} className="accent-[var(--c-accent)]" />
                  Any price
                </label>
              </li>
              {ranges.map((r, i) => (
                <li key={`${r.min}-${r.max}`}>
                  <label className="flex cursor-pointer items-center gap-2.5 py-1">
                    <input type="radio" name="price" checked={rangeIndex === i} onChange={() => setRangeIndex(i)} className="accent-[var(--c-accent)]" />
                    {rangeLabel(r)}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <legend className="label">Availability</legend>
            <div className="space-y-2 text-sm">
              <label className="flex cursor-pointer items-center gap-2.5 py-1">
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="accent-[var(--c-accent)]" />
                In stock only
              </label>
              <label className="flex cursor-pointer items-center gap-2.5 py-1">
                <input type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} className="accent-[var(--c-accent)]" />
                On sale
              </label>
            </div>
          </fieldset>

          {activeFilters > 0 ? (
            <button type="button" onClick={clearAll} className="link-underline inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em]">
              <X size={13} aria-hidden="true" />
              Clear all filters
            </button>
          ) : null}
        </aside>

        {/* Results */}
        <div>
          {filtered.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <li key={p.id} className="animate-fade-in">
                  <ProductCard product={p} priority={i < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-4 border border-dashed border-line py-20 text-center">
              <p className="font-heading text-3xl">No products match your filters</p>
              <p className="text-muted">Try removing a filter or searching for something else.</p>
              <button type="button" onClick={clearAll} className="btn btn-primary">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
