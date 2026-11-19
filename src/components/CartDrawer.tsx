"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { siteConfig } from "@/data/site-config";
import { useLockBody } from "@/lib/useLockBody";
import { cn, formatPrice } from "@/lib/utils";
import SafeImage from "./SafeImage";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartLines, subtotal, removeFromCart, updateQuantity } = useStore();
  useLockBody(cartOpen);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  const threshold = siteConfig.shop.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <div className={cn("fixed inset-0 z-[60]", cartOpen ? "visible" : "invisible pointer-events-none")} aria-hidden={!cartOpen}>
      <div
        onClick={() => setCartOpen(false)}
        className={cn("absolute inset-0 bg-black transition-opacity duration-300", cartOpen ? "opacity-40" : "opacity-0")}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-3xl">Your cart</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="-mr-2 p-2" tabIndex={cartOpen ? 0 : -1}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {cartLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <ShoppingBag size={40} strokeWidth={1.2} className="text-muted" aria-hidden="true" />
            <p className="text-muted">Your cart is empty.</p>
            <Link href="/shop" onClick={() => setCartOpen(false)} className="btn btn-primary" tabIndex={cartOpen ? 0 : -1}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-4 text-sm">
              {remaining > 0 ? (
                <p>
                  Spend <strong>{formatPrice(remaining)}</strong> more for free shipping
                </p>
              ) : (
                <p className="text-accent">You have unlocked free shipping!</p>
              )}
              <div className="mt-2 h-1 w-full bg-secondary">
                <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {cartLines.map(({ item, product, unitPrice, lineTotal }) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="relative block h-28 shrink-0 overflow-hidden bg-secondary"
                    style={{ width: 88 }}
                    tabIndex={cartOpen ? 0 : -1}
                  >
                    <SafeImage src={product.images[0]} alt={product.name} fill sizes="88px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="font-heading text-xl leading-tight hover:text-accent"
                        tabIndex={cartOpen ? 0 : -1}
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        aria-label={`Remove ${product.name}`}
                        className="shrink-0 text-muted transition-colors hover:text-accent"
                        tabIndex={cartOpen ? 0 : -1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted">{[item.color, item.size].filter(Boolean).join(" · ")}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="p-2 hover:bg-secondary"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          tabIndex={cartOpen ? 0 : -1}
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="p-2 hover:bg-secondary disabled:opacity-40"
                          disabled={item.quantity >= product.stock}
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          tabIndex={cartOpen ? 0 : -1}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium">{formatPrice(lineTotal)}</p>
                        {item.quantity > 1 ? <p className="text-xs text-muted">{formatPrice(unitPrice)} each</p> : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="text-lg font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-muted">Shipping and taxes are calculated at checkout.</p>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={() => setCartOpen(false)} className="btn btn-outline px-4" tabIndex={cartOpen ? 0 : -1}>
                  View cart
                </Link>
                <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn btn-primary px-4" tabIndex={cartOpen ? 0 : -1}>
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
