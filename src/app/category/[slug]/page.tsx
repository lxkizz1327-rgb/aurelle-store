import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, getCategory } from "@/data/categories";
import PageHeader from "@/components/PageHeader";
import ShopBrowser from "@/components/ShopBrowser";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.description,
    openGraph: { title: category.name, description: category.description, images: [category.image] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <PageHeader
        title={category.name}
        subtitle={category.description}
        crumbs={[{ label: "Categories", href: "/categories" }, { label: category.name }]}
      />
      <Suspense fallback={<div className="container-x py-24 text-center text-muted">Loading products…</div>}>
        <ShopBrowser lockedCategory={category.slug} />
      </Suspense>
    </>
  );
}
