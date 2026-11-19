"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, RefreshCw, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getCategory } from "@/data/categories";
import { siteConfig } from "@/data/site-config";
import type { Product } from "@/lib/types";
import { cn, discountPercent, formatPrice, isOnSale, unitPrice } from "@/lib/utils";
import { Breadcrumbs } from "./PageHeader";
import SafeImage from "./SafeImage";

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, notify } = useStore();
  const category = getCategory(product.category);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]?.name);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });

  const soldOut = product.stock <= 0;
  const wished = isWishlisted(product.id);
  const lowStock = !soldOut && product.stock <= 5;
  const count = product.images.length;

  function move(delta: number) {
    setActive((i) => (i + delta + count) % count);
  }

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100, on: true });
  }

  function handleAdd() {
    if (product.sizes && product.sizes.length > 0 && !size) {
      setSizeError(true);
      notify("Please choose a size first.");
      return;
    }
    addToCart(product.id, { color, size, quantity });
  }

  return (
    <section className="container-x py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          {count > 1 ? (
            <ul className="flex gap-3 md:flex-col" aria-label="Product images">
              {product.images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={active === i}
                    className={cn(
                      "relative block h-20 w-16 overflow-hidden border-2 bg-secondary transition-colors md:h-24 md:w-20",
                      active === i ? "border-primary" : "border-transparent hover:border-line",
                    )}
                  >
                    <SafeImage src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div
            className="group relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-secondary"
            onMouseMove={onMove}
            onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          >
            <SafeImage
              key={product.images[active]}
              src={product.images[active]}
              alt={`${product.name} – image ${active + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="animate-fade-in object-cover transition-transform duration-300 ease-out"
              style={{ transform: zoom.on ? "scale(1.6)" : "scale(1)", transformOrigin: `${zoom.x}% ${zoom.y}%` }}
            />
            {isOnSale(product) && !soldOut ? (
              <span className="absolute left-4 top-4 bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                -{discountPercent(product)}%
              </span>
            ) : null}
            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface shadow transition-opacity md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface shadow transition-opacity md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : null}
          </div>
        </div>

        {/* Info */}
        <div className="lg:pt-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{category?.name}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{product.name}</h1>

          <p className="mt-4 text-xl">
            {isOnSale(product) ? (
              <>
                <span className="font-medium text-accent">{formatPrice(unitPrice(product))}</span>
                <span className="ml-3 text-base text-muted line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              formatPrice(product.price)
            )}
          </p>

          <p className="mt-5 leading-relaxed text-muted">{product.shortDescription}</p>

          <p className={cn("mt-5 flex items-center gap-2 text-sm", soldOut ? "text-accent" : "text-ink")}>
            <span className={cn("h-2 w-2 rounded-full", soldOut ? "bg-accent" : lowStock ? "bg-amber-500" : "bg-green-600")} aria-hidden="true" />
            {soldOut ? "Sold out" : lowStock ? `Only ${product.stock} left in stock` : "In stock"}
          </p>

          {product.colors && product.colors.length > 0 ? (
            <fieldset className="mt-7">
              <legend className="label">
                Colour: <span className="normal-case tracking-normal text-ink">{color}</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    title={c.name}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    className={cn(
                      "h-9 w-9 rounded-full border border-line p-0.5 transition-all",
                      color === c.name ? "ring-2 ring-primary ring-offset-2" : "hover:scale-110",
                    )}
                  >
                    <span className="block h-full w-full rounded-full" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {product.sizes && product.sizes.length > 0 ? (
            <fieldset className="mt-7">
              <legend className="label">
                Size{sizeError ? <span className="ml-2 normal-case tracking-normal text-accent">– please choose a size</span> : null}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    aria-pressed={size === s}
                    className={cn(
                      "min-w-12 border px-3.5 py-2.5 text-sm transition-colors",
                      size === s ? "border-primary bg-primary text-on-primary" : "border-line hover:border-primary",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-line" role="group" aria-label="Quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="px-4 py-3.5 hover:bg-secondary disabled:opacity-40"
                disabled={quantity <= 1 || soldOut}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={15} />
              </button>
              <span className="w-10 text-center text-sm" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="px-4 py-3.5 hover:bg-secondary disabled:opacity-40"
                disabled={quantity >= product.stock || soldOut}
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              >
                <Plus size={15} />
              </button>
            </div>
            <button type="button" onClick={handleAdd} disabled={soldOut} className="btn btn-primary min-w-[180px] flex-1">
              {soldOut ? "Sold out" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={wished}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              className="flex w-[52px] items-center justify-center border border-line transition-colors hover:border-primary"
            >
              <Heart size={20} strokeWidth={1.6} className={cn(wished && "fill-accent text-accent")} />
            </button>
          </div>

          <ul className="mt-8 space-y-3 border-y border-line py-6 text-sm">
            <li className="flex items-center gap-3">
              <Truck size={18} strokeWidth={1.5} aria-hidden="true" />
              Free shipping on orders over {formatPrice(siteConfig.shop.freeShippingThreshold)}
            </li>
            <li className="flex items-center gap-3">
              <RefreshCw size={18} strokeWidth={1.5} aria-hidden="true" />
              Free 30-day returns
            </li>
          </ul>

          <div className="mt-2 divide-y divide-line">
            <details open className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-xs font-medium uppercase tracking-[0.16em]">
                Description
                <Plus size={16} className="transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-xs font-medium uppercase tracking-[0.16em]">
                Details &amp; care
                <Plus size={16} className="transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-xs font-medium uppercase tracking-[0.16em]">
                Shipping &amp; returns
                <Plus size={16} className="transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Orders ship within 1–2 working days. Unworn items can be returned within 30 days.{" "}
                <Link href="/shipping-returns" className="underline underline-offset-4 hover:text-accent">
                  Read the full policy
                </Link>
                .
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
