import Link from "next/link";
import { getFeatured } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function NotFound() {
  const suggestions = getFeatured(3);
  return (
    <section className="container-x py-24 text-center md:py-32">
      <p className="eyebrow">Error 404</p>
      <h1 className="text-6xl md:text-8xl">Page not found</h1>
      <p className="mx-auto mt-5 max-w-md text-muted">The page you are looking for may have moved or no longer exists. Let us get you back on track.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/shop" className="btn btn-outline">
          Browse the shop
        </Link>
      </div>
      {suggestions.length > 0 ? (
        <div className="mx-auto mt-20 max-w-4xl text-left">
          <p className="mb-8 text-center font-heading text-3xl">Maybe you will like these</p>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {suggestions.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
