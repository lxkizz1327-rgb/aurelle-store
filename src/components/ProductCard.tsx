"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getCategory } from "@/data/categories";
import type { Product } from "@/lib/types";
import { cn, formatPrice, isOnSale, unitPrice } from "@/lib/utils";
import SafeImage from "./SafeImage";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wished = isWishlisted(product.id);
  const soldOut = product.stock <= 0;
  const needsOptions = (product.sizes?.length ?? 0) > 0;
  const second = product.images[1];
  const sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";
  const badge = soldOut ? "Sold out" : product.badge;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="block h-full w-full">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              second ? "group-hover:opacity-0" : "group-hover:scale-105",
              soldOut && "opacity-70",
            )}
          />
          {second ? (
            <SafeImage
              src={second}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />
          ) : null}
        </Link>

        {badge ? (
          <span
            className={cn(
              "absolute left-3 top-3 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
              soldOut ? "bg-primary text-on-primary" : isOnSale(product) ? "bg-accent text-white" : "bg-surface text-ink",
            )}
          >
            {badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink shadow-sm transition-transform duration-300 hover:scale-110"
        >
          <Heart size={17} strokeWidth={1.6} className={cn("transition-colors", wished && "fill-accent text-accent")} />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-0 lg:translate-y-full lg:transition-transform lg:duration-300 lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0">
          {soldOut ? (
            <span className="block bg-surface px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              Sold out
            </span>
          ) : needsOptions ? (
            <Link
              href={`/product/${product.slug}`}
              className="block bg-primary px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-on-primary transition-colors hover:bg-accent"
            >
              Choose options
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product.id, { color: product.colors?.[0]?.name })}
              className="block w-full bg-primary px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-on-primary transition-colors hover:bg-accent"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{getCategory(product.category)?.name ?? product.category}</p>
        <h3 className="mt-1 font-heading text-xl leading-tight">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm">
          {isOnSale(product) ? (
            <>
              <span className="font-medium text-accent">{formatPrice(unitPrice(product))}</span>
              <span className="ml-2 text-muted line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </p>
        {product.colors && product.colors.length > 1 ? (
          <ul className="mt-2 flex gap-1.5" aria-label="Available colours">
            {product.colors.map((c) => (
              <li key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-line" style={{ backgroundColor: c.hex }} />
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
