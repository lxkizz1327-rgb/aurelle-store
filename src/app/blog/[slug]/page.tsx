import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/PageHeader";
import SafeImage from "@/components/SafeImage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [{ url: post.image, alt: post.title }] },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <header className="container-x pt-10 text-center md:pt-14">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Journal", href: "/blog" }, { label: post.title }]} />
          </div>
          <p className="eyebrow mt-4">
            {formatDate(post.date)} · {post.readTime}
          </p>
          <h1 className="text-5xl md:text-6xl">{post.title}</h1>
          <p className="mt-5 text-sm text-muted">By {post.author}</p>
        </div>
        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden bg-secondary">
          <SafeImage src={post.image} alt={post.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </header>

      <div className="container-x section-y">
        <div className="mx-auto max-w-2xl space-y-5 text-lg leading-relaxed">
          {post.content.map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="!mt-10 text-4xl">
                {block.slice(3)}
              </h2>
            ) : (
              <p key={i} className="text-muted">
                {block}
              </p>
            ),
          )}
          <ul className="flex flex-wrap gap-2 pt-6">
            {post.tags.map((t) => (
              <li key={t} className="border border-line px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-t border-line pt-10">
          <Link href="/blog" className="link-underline inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em]">
            <ArrowLeft size={14} aria-hidden="true" />
            Back to the journal
          </Link>
          {others.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/blog/${o.slug}`} className="group block">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{formatDate(o.date)}</p>
                    <p className="mt-1 font-heading text-2xl transition-colors group-hover:text-accent">{o.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
