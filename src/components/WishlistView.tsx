"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/data/products";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function WishlistView() {
  const { hydrated, wishlist } = useStore();

  if (!hydrated) {
    return <div className="container-x py-24 text-center text-muted">Loading your wishlist…</div>;
  }

  const items = wishlist.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));

  if (items.length === 0) {
    return (
      <div className="container-x flex flex-col items-center gap-5 py-24 text-center">
        <Heart size={48} strokeWidth={1.2} className="text-muted" aria-hidden="true" />
        <h2 className="text-4xl">Your wishlist is empty</h2>
        <p className="max-w-sm text-muted">Tap the heart on any product to save it here for later.</p>
        <Link href="/shop" className="btn btn-primary">
          Discover products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <p className="mb-8 text-sm text-muted">
        {items.length} saved {items.length === 1 ? "item" : "items"}
      </p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
        {items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
