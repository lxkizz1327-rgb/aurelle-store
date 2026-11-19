import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelated, products } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { unitPrice } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import SectionHeading from "@/components/SectionHeading";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0], alt: product.name }],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((src) => `${base}${src}`),
    offers: {
      "@type": "Offer",
      price: unitPrice(product),
      priceCurrency: siteConfig.currency.code,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${base}/product/${product.slug}`,
    },
  };
  const related = getRelated(product, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} />
      <section className="container-x section-y" aria-label="You may also like">
        <SectionHeading eyebrow="More to love" title="You may also like" />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {related.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
