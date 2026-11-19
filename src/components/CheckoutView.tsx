"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Info } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice, shippingFor } from "@/lib/utils";
import SafeImage from "./SafeImage";

type Placed = { reference: string; total: number; email: string };

export default function CheckoutView() {
  const { hydrated, cartLines, subtotal, clearCart } = useStore();
  const [placed, setPlaced] = useState<Placed | null>(null);

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const reference = `DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlaced({ reference, total, email: String(data.get("email") ?? "") });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <div className="container-x flex flex-col items-center gap-5 py-24 text-center">
        <CheckCircle2 size={56} strokeWidth={1.2} className="text-accent" aria-hidden="true" />
        <h2 className="text-4xl md:text-5xl">Demo order received</h2>
        <p className="max-w-md text-muted">
          Reference <strong className="text-ink">{placed.reference}</strong> · {formatPrice(placed.total)}.
          <br />
          This was a demonstration checkout only: no payment was taken and no real order was created.
        </p>
        <Link href="/shop" className="btn btn-primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!hydrated) {
    return <div className="container-x py-24 text-center text-muted">Loading checkout…</div>;
  }

  if (cartLines.length === 0) {
    return (
      <div className="container-x flex flex-col items-center gap-5 py-24 text-center">
        <h2 className="text-4xl">Nothing to check out yet</h2>
        <p className="text-muted">Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <div className="mb-10 flex items-start gap-3 border border-accent bg-surface p-4 text-sm">
        <Info size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <p>
          <strong>Demo checkout.</strong> This page shows how checkout will look, but it does not process payments. To take real orders you need to connect a payment
          provider (for example Stripe) – see the README.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={onSubmit} className="space-y-10">
          <fieldset className="space-y-5">
            <legend className="mb-2 text-3xl">Contact</legend>
            <div>
              <label htmlFor="co-email" className="label">
                Email
              </label>
              <input id="co-email" name="email" type="email" required autoComplete="email" className="field" />
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-2 text-3xl">Delivery address</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="co-first" className="label">
                  First name
                </label>
                <input id="co-first" name="first" required autoComplete="given-name" className="field" />
              </div>
              <div>
                <label htmlFor="co-last" className="label">
                  Last name
                </label>
                <input id="co-last" name="last" required autoComplete="family-name" className="field" />
              </div>
            </div>
            <div>
              <label htmlFor="co-address" className="label">
                Address
              </label>
              <input id="co-address" name="address" required autoComplete="street-address" className="field" />
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="co-city" className="label">
                  City
                </label>
                <input id="co-city" name="city" required autoComplete="address-level2" className="field" />
              </div>
              <div>
                <label htmlFor="co-postal" className="label">
                  Postal code
                </label>
                <input id="co-postal" name="postal" required autoComplete="postal-code" className="field" />
              </div>
              <div>
                <label htmlFor="co-country" className="label">
                  Country
                </label>
                <input id="co-country" name="country" required autoComplete="country-name" className="field" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-3xl">Payment</legend>
            <div className="border border-dashed border-line bg-secondary p-5 text-sm text-muted">
              Payment is not connected. Clicking the button below places a <strong className="text-ink">demo order</strong> only; no card details are collected and nothing is charged.
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Place demo order · {formatPrice(total)}
          </button>
        </form>

        <aside className="h-fit border border-line bg-surface p-6 md:p-8 lg:sticky lg:top-28">
          <h2 className="text-3xl">Your order</h2>
          <ul className="mt-6 divide-y divide-line">
            {cartLines.map(({ item, product, lineTotal }) => (
              <li key={item.key} className="flex gap-4 py-4">
                <span className="relative block h-20 w-16 shrink-0 overflow-hidden bg-secondary">
                  <SafeImage src={product.images[0]} alt="" fill sizes="64px" className="object-cover" />
                  <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center bg-primary px-1 text-[10px] text-on-primary">{item.quantity}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-lg leading-tight">{product.name}</span>
                  <span className="text-xs text-muted">{[item.color, item.size].filter(Boolean).join(" · ")}</span>
                </span>
                <span className="text-sm">{formatPrice(lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-base font-medium">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
