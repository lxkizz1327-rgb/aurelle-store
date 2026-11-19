"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { siteConfig } from "@/data/site-config";
import { formatPrice, shippingFor } from "@/lib/utils";
import SafeImage from "./SafeImage";

export default function CartView() {
  const { hydrated, cartLines, subtotal, removeFromCart, updateQuantity, clearCart } = useStore();

  if (!hydrated) {
    return <div className="container-x py-24 text-center text-muted">Loading your cart…</div>;
  }

  if (cartLines.length === 0) {
    return (
      <div className="container-x flex flex-col items-center gap-5 py-24 text-center">
        <ShoppingBag size={48} strokeWidth={1.2} className="text-muted" aria-hidden="true" />
        <h2 className="text-4xl">Your cart is empty</h2>
        <p className="max-w-sm text-muted">Looks like you have not added anything yet. Explore the collection and find something you love.</p>
        <Link href="/shop" className="btn btn-primary">
          Start shopping
        </Link>
      </div>
    );
  }

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const remaining = Math.max(0, siteConfig.shop.freeShippingThreshold - subtotal);

  return (
    <div className="container-x grid gap-12 py-10 md:py-14 lg:grid-cols-[1.7fr_1fr]">
      <div>
        <ul className="divide-y divide-line border-y border-line">
          {cartLines.map(({ item, product, unitPrice, lineTotal }) => (
            <li key={item.key} className="flex gap-4 py-6 md:gap-6">
              <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] w-24 shrink-0 overflow-hidden bg-secondary md:w-32">
                <SafeImage src={product.images[0]} alt={product.name} fill sizes="128px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/product/${product.slug}`} className="font-heading text-2xl hover:text-accent">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">{[item.color, item.size].filter(Boolean).join(" · ")}</p>
                    <p className="mt-1 text-sm text-muted">{formatPrice(unitPrice)} each</p>
                  </div>
                  <p className="font-medium">{formatPrice(lineTotal)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-line">
                    <button type="button" aria-label="Decrease quantity" className="p-2.5 hover:bg-secondary" onClick={() => updateQuantity(item.key, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="p-2.5 hover:bg-secondary disabled:opacity-40"
                      disabled={item.quantity >= product.stock}
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.key)} className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent">
                    <Trash2 size={14} aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/shop" className="link-underline text-xs font-medium uppercase tracking-[0.16em]">
            ← Continue shopping
          </Link>
          <button type="button" onClick={clearCart} className="text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent">
            Clear cart
          </button>
        </div>
      </div>

      <aside className="h-fit border border-line bg-surface p-6 md:p-8 lg:sticky lg:top-28">
        <h2 className="text-3xl">Order summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-4 text-base font-medium">
            <dt>Estimated total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        {remaining > 0 ? (
          <p className="mt-4 text-xs text-muted">Add {formatPrice(remaining)} more to get free shipping.</p>
        ) : (
          <p className="mt-4 text-xs text-accent">Your order qualifies for free shipping.</p>
        )}
        <Link href="/checkout" className="btn btn-primary mt-6 w-full">
          Proceed to checkout
        </Link>
        <p className="mt-3 text-center text-xs text-muted">Demo checkout – no payment is taken.</p>
      </aside>
    </div>
  );
}
