import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/SafeImage";

export const metadata: Metadata = {
  title: "Journal",
  description: "Style guides, care tips and stories from the studio.",
};

export default function BlogPage() {
  const [first, ...rest] = blogPosts;
  return (
    <>
      <PageHeader title="Journal" subtitle="Style guides, care tips and stories from the studio." crumbs={[{ label: "Journal" }]} />
      <section className="container-x section-y">
        {first ? (
          <Reveal>
            <Link href={`/blog/${first.slug}`} className="group grid gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                <SafeImage src={first.image} alt={first.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="eyebrow">
                  {formatDate(first.date)} · {first.readTime}
                </p>
                <h2 className="text-4xl transition-colors group-hover:text-accent md:text-5xl">{first.title}</h2>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{first.excerpt}</p>
                <span className="link-underline mt-6 self-start text-xs font-medium uppercase tracking-[0.16em]">Read article</span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                    <SafeImage src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="eyebrow mt-5">
                    {formatDate(post.date)} · {post.readTime}
                  </p>
                  <h2 className="text-3xl transition-colors group-hover:text-accent">{post.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{post.excerpt}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
