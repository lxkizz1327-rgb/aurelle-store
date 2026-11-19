import type { BlogPost } from "@/lib/types";

// =====================================================================
//  BLOG / JOURNAL ARTICLES
// =====================================================================
//  ADD A NEW ARTICLE HERE: copy one block { ... }, paste it above the
//  others (newest first), and change the text.
//  - slug     : web address (lowercase-with-dashes, unique)
//  - image    : CHANGE BLOG IMAGE HERE (upload the .jpg into /public/images/blog/)
//  - content  : each line in quotes is one paragraph. Start a line with "## "
//               to make it a sub-heading.
//  DELETE AN ARTICLE: remove its whole block.
// =====================================================================

export const blogPosts: BlogPost[] = [
  {
    slug: "build-a-capsule-wardrobe",
    title: "How to Build a Capsule Wardrobe You Will Actually Wear",
    excerpt: "Twelve well-chosen pieces can create more than thirty outfits. Here is how to start.",
    image: "/images/blog/blog-01.jpg",
    author: "Editorial Team",
    date: "2026-11-10",
    readTime: "5 min read",
    tags: ["Style", "Wardrobe"],
    content: [
      "A capsule wardrobe is not about owning less for the sake of it. It is about owning pieces that all work together, so getting dressed becomes easy.",
      "## Start with what you already wear",
      "Look at the clothes you reach for most. Note the colours, the fits and the fabrics. Those are the clues to your real style, not the clothes you wish you wore.",
      "## Choose a simple colour palette",
      "Pick two or three neutral base colours and one or two accents. When everything coordinates, every top works with every bottom.",
      "## Invest in the layers that do the most work",
      "A good pair of denim, a crisp shirt, a merino sweater and a reliable jacket will carry you through most of the year. Buy the best quality you can afford in these.",
      "## Keep it flexible",
      "A capsule is a living thing. Swap pieces out with the seasons and let go of anything you have not worn in a year.",
    ],
  },
  {
    slug: "caring-for-wool-and-cashmere",
    title: "Caring for Wool and Cashmere: A Simple Guide",
    excerpt: "Natural fibres last for decades with a little care. These are the habits that matter most.",
    image: "/images/blog/blog-02.jpg",
    author: "Editorial Team",
    date: "2026-10-27",
    readTime: "4 min read",
    tags: ["Care", "Knitwear"],
    content: [
      "Wool and cashmere are some of the most durable fabrics in your wardrobe, as long as you look after them properly.",
      "## Wash less, air more",
      "Knitwear rarely needs washing after each wear. Hang it somewhere airy overnight and the fibres will refresh themselves.",
      "## When you do wash",
      "Use cool water and a gentle wool detergent, press the water out without wringing, then dry flat on a towel. Never hang a wet sweater — it will stretch.",
      "## Store it properly",
      "Fold knits rather than hanging them, and keep them in breathable cotton bags with cedar blocks to deter moths.",
    ],
  },
  {
    slug: "autumn-layering-guide",
    title: "The Autumn Layering Guide",
    excerpt: "Three simple formulas for staying warm without looking bulky when the weather turns.",
    image: "/images/blog/blog-03.jpg",
    author: "Editorial Team",
    date: "2026-10-12",
    readTime: "3 min read",
    tags: ["Style", "Seasonal"],
    content: [
      "Autumn weather is unpredictable, which makes layering the most useful skill in your style toolkit.",
      "## Base, mid, outer",
      "Start with a breathable base like a cotton tee or fine merino. Add a mid layer such as a cardigan or sweater for warmth. Finish with an outer layer that suits the weather.",
      "## Mix textures",
      "Pairing smooth cotton with soft knits and a structured jacket adds depth to a simple outfit without adding more colour.",
      "## Keep proportions balanced",
      "If one layer is oversized, keep the others closer to the body. It keeps the overall shape clean and easy to move in.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
