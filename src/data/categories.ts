import type { Category } from "@/lib/types";

// =====================================================================
//  PRODUCT CATEGORIES
// =====================================================================
//  ADD A NEW CATEGORY HERE: copy one block below, paste it at the end of
//  the list and change the text. The "slug" is the short web-address word
//  (lowercase, no spaces) and is what you write in a product's
//  `category:` line in products.ts.
//  CHANGE CATEGORY IMAGES HERE: upload a .jpg into /public/images/categories/
//  with the same file name as written in `image`.
// =====================================================================

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    description: "Fluid silhouettes and quietly luxurious fabrics for every day.",
    image: "/images/categories/category-women.jpg",
  },
  {
    slug: "men",
    name: "Men",
    description: "Well-cut staples in natural fabrics, made to be worn on repeat.",
    image: "/images/categories/category-men.jpg",
  },
  {
    slug: "kids",
    name: "Kids",
    description: "Soft, durable pieces that keep up with growing, moving kids.",
    image: "/images/categories/category-kids.jpg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Leather goods, knits and carry-alls that finish the look.",
    image: "/images/categories/category-accessories.jpg",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
