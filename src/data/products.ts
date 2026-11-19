import type { Product } from "@/lib/types";

// =====================================================================
//  PRODUCTS  –  every item in your shop lives in this list
// =====================================================================
//  ADD NEW PRODUCTS HERE: copy one whole block { ... }, paste it below the
//  last one (keep the comma after the closing brace) and change the text.
//  Every product needs a different `id` and a different `slug`.
//
//  DELETE A PRODUCT: remove its whole block { ... } from the list.
//
//  What each line means:
//    id            – a unique code, e.g. "p17"
//    slug          – web address of the product page (lowercase-with-dashes)
//    name          – CHANGE PRODUCT NAME HERE
//    category      – one of the slugs from categories.ts (women, men, kids, accessories)
//    price         – CHANGE PRODUCT PRICE HERE (numbers only, no currency symbol)
//    salePrice     – CHANGE SALE PRICE HERE (delete the whole line if not on sale)
//    shortDescription / description / details – CHANGE PRODUCT DESCRIPTION HERE
//    images        – CHANGE PRODUCT IMAGES HERE. First picture is the main one,
//                    the second shows when you hover. Upload the .jpg files into
//                    /public/images/products/ using the same names.
//    colors        – optional colour choices (name + hex code). Delete the line for none.
//    sizes         – optional size choices. Delete the line for none.
//    stock         – CHANGE STOCK HERE: number available. 0 = shows "Sold out".
//    badge         – optional small label on the picture, e.g. "New". Delete if not needed.
//    popularity    – bigger number = listed earlier when visitors sort by popularity
//    createdAt     – date added (YYYY-MM-DD), used for "Newest" sorting
//    featured / newArrival / bestSeller – set to true to show the product in
//                    "Featured collection" / "New arrivals" / "Best sellers" on the home page
// =====================================================================

export const products: Product[] = [
  // ---------------------------------------------------------------- MEN
  {
    id: "p01",
    slug: "heritage-oxford-shirt",
    name: "Heritage Oxford Shirt",
    category: "men",
    price: 78,
    shortDescription: "A crisp, brushed-cotton oxford with a relaxed collar.",
    description:
      "Our everyday shirt, woven from long-staple cotton and brushed for a soft hand from the very first wear. The collar rolls naturally, the cuffs are generous and the hem is cut to be worn tucked or loose.",
    details: ["100% organic cotton oxford", "Mother-of-pearl style buttons", "Regular fit, true to size", "Machine wash cold"],
    images: ["/images/products/product-01.jpg", "/images/products/product-01-b.jpg"],
    colors: [
      { name: "White", hex: "#f4f1ec" },
      { name: "Sky", hex: "#a9c1d9" },
      { name: "Sand", hex: "#cdb99c" },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 24,
    badge: "New",
    popularity: 72,
    createdAt: "2026-11-02",
    newArrival: true,
  },
  {
    id: "p02",
    slug: "tapered-selvedge-denim",
    name: "Tapered Selvedge Denim",
    category: "men",
    price: 120,
    salePrice: 96,
    shortDescription: "Japanese-style selvedge denim with a clean tapered leg.",
    description:
      "Mid-weight selvedge denim that fades beautifully with wear. A mid rise, straight thigh and gently tapered leg make these easy to dress up or down.",
    details: ["12oz selvedge cotton denim", "Mid rise, tapered leg", "Button fly", "Wash inside out, cold"],
    images: ["/images/products/product-02.jpg", "/images/products/product-02-b.jpg"],
    colors: [
      { name: "Indigo", hex: "#2f3e5c" },
      { name: "Black", hex: "#1d1d1f" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 18,
    badge: "Sale",
    popularity: 96,
    createdAt: "2026-09-12",
    bestSeller: true,
    featured: true,
  },
  {
    id: "p03",
    slug: "merino-crew-sweater",
    name: "Merino Crew Sweater",
    category: "men",
    price: 135,
    shortDescription: "Fine-gauge merino that regulates temperature all day.",
    description:
      "A lightweight, fine-gauge sweater that layers under a jacket or stands alone. Naturally breathable and soft against the skin, with ribbed trims that keep their shape.",
    details: ["100% extra-fine merino wool", "Ribbed collar, cuffs and hem", "Regular fit", "Hand wash or wool cycle"],
    images: ["/images/products/product-03.jpg", "/images/products/product-03-b.jpg"],
    colors: [
      { name: "Charcoal", hex: "#43434a" },
      { name: "Oat", hex: "#d8ccb6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    popularity: 88,
    createdAt: "2026-08-20",
    bestSeller: true,
  },
  {
    id: "p04",
    slug: "water-resistant-field-jacket",
    name: "Water-Resistant Field Jacket",
    category: "men",
    price: 210,
    salePrice: 168,
    shortDescription: "A versatile four-pocket jacket with a weather-ready finish.",
    description:
      "Cut from a tightly woven cotton-nylon blend with a durable water-repellent finish. Four pockets, an adjustable hem and a soft corduroy collar make it the jacket you will reach for every autumn.",
    details: ["Cotton-nylon blend, water-repellent finish", "Four front pockets", "Corduroy collar", "Relaxed fit, size up for layering"],
    images: ["/images/products/product-04.jpg", "/images/products/product-04-b.jpg"],
    colors: [
      { name: "Olive", hex: "#5d614a" },
      { name: "Navy", hex: "#273348" },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    badge: "Sale",
    popularity: 80,
    createdAt: "2026-09-28",
    featured: true,
  },

  // -------------------------------------------------------------- WOMEN
  {
    id: "p05",
    slug: "silk-blend-slip-dress",
    name: "Silk-Blend Slip Dress",
    category: "women",
    price: 165,
    shortDescription: "A bias-cut midi dress with a liquid drape.",
    description:
      "Cut on the bias from a washable silk blend so it skims rather than clings. Adjustable straps and a subtle cowl neckline take it from dinner out to a wedding guest outfit.",
    details: ["Silk and viscose blend", "Bias cut, midi length", "Adjustable straps", "Dry clean or gentle hand wash"],
    images: ["/images/products/product-05.jpg", "/images/products/product-05-b.jpg"],
    colors: [
      { name: "Champagne", hex: "#e3d2b8" },
      { name: "Forest", hex: "#2f4a3c" },
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 12,
    badge: "New",
    popularity: 84,
    createdAt: "2026-11-05",
    newArrival: true,
  },
  {
    id: "p06",
    slug: "wide-leg-wool-trousers",
    name: "Wide-Leg Wool Trousers",
    category: "women",
    price: 142,
    salePrice: 119,
    shortDescription: "High-waisted, fully lined trousers with a fluid leg.",
    description:
      "Tailored from a drapey wool blend with a high waist, front pleats and a full-length wide leg. Fully lined for comfort and a clean fall.",
    details: ["Wool-blend suiting", "High rise, pleated front", "Side zip and hook closure", "Dry clean"],
    images: ["/images/products/product-06.jpg", "/images/products/product-06-b.jpg"],
    colors: [
      { name: "Stone", hex: "#c9bfae" },
      { name: "Black", hex: "#1f1f21" },
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 14,
    badge: "Sale",
    popularity: 78,
    createdAt: "2026-10-04",
    featured: true,
  },
  {
    id: "p07",
    slug: "cashmere-wrap-cardigan",
    name: "Cashmere Wrap Cardigan",
    category: "women",
    price: 189,
    shortDescription: "An ultra-soft wrap cardigan in responsibly sourced cashmere.",
    description:
      "A generous wrap silhouette in a plush cashmere blend. Wear it belted, open or draped over the shoulders — it feels like a blanket you can leave the house in.",
    details: ["Cashmere and merino blend", "Self-tie belt", "Relaxed, oversized fit", "Hand wash cold, dry flat"],
    images: ["/images/products/product-07.jpg", "/images/products/product-07-b.jpg"],
    colors: [
      { name: "Oatmeal", hex: "#d9cdb8" },
      { name: "Rose", hex: "#d6b2a8" },
    ],
    sizes: ["S", "M", "L"],
    stock: 7,
    popularity: 94,
    createdAt: "2026-08-02",
    bestSeller: true,
    featured: true,
  },
  {
    id: "p08",
    slug: "organic-cotton-tee",
    name: "Organic Cotton Tee",
    category: "women",
    price: 38,
    shortDescription: "The everyday tee, in heavyweight organic cotton.",
    description:
      "A boxy, slightly cropped tee in dense organic cotton jersey that holds its shape wash after wash. Layer it, tuck it, live in it.",
    details: ["100% organic cotton, 220gsm", "Boxy, slightly cropped fit", "Pre-washed to reduce shrinkage", "Machine wash cold"],
    images: ["/images/products/product-08.jpg", "/images/products/product-08-b.jpg"],
    colors: [
      { name: "White", hex: "#f5f3ef" },
      { name: "Black", hex: "#1f1f21" },
      { name: "Clay", hex: "#b88a73" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 60,
    badge: "New",
    popularity: 99,
    createdAt: "2026-11-09",
    newArrival: true,
    bestSeller: true,
  },

  // --------------------------------------------------------------- KIDS
  {
    id: "p09",
    slug: "everyday-hooded-sweatshirt",
    name: "Everyday Hooded Sweatshirt",
    category: "kids",
    price: 46,
    shortDescription: "Brushed-back fleece that is soft from the first wash.",
    description:
      "A roomy hoodie in organic cotton fleece with a kangaroo pocket and flat-lock seams that will not irritate. Built to survive the playground.",
    details: ["Organic cotton fleece", "Kangaroo pocket", "Flat-lock seams", "Machine wash warm"],
    images: ["/images/products/product-09.jpg", "/images/products/product-09-b.jpg"],
    colors: [
      { name: "Heather", hex: "#b8b6b3" },
      { name: "Mustard", hex: "#d3a845" },
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 30,
    popularity: 85,
    createdAt: "2026-09-02",
    bestSeller: true,
  },
  {
    id: "p10",
    slug: "corduroy-dungarees",
    name: "Corduroy Dungarees",
    category: "kids",
    price: 58,
    salePrice: 49,
    shortDescription: "Soft needlecord dungarees with adjustable straps.",
    description:
      "Classic dungarees in soft needlecord with adjustable buckle straps, deep pockets and snap-button legs that make changing easy.",
    details: ["Cotton needlecord", "Adjustable straps", "Snap-open inner legs", "Machine wash cold"],
    images: ["/images/products/product-10.jpg", "/images/products/product-10-b.jpg"],
    colors: [
      { name: "Rust", hex: "#a4583a" },
      { name: "Navy", hex: "#2b3752" },
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 20,
    badge: "Sale",
    popularity: 70,
    createdAt: "2026-09-15",
  },
  {
    id: "p11",
    slug: "rain-ready-puffer",
    name: "Rain-Ready Puffer",
    category: "kids",
    price: 72,
    shortDescription: "A warm recycled-fill puffer with a rain-proof shell.",
    description:
      "Lightweight but properly warm, filled with recycled insulation and finished with a water-repellent shell. Reflective details help little ones stay visible.",
    details: ["Recycled polyester fill", "Water-repellent shell", "Reflective trims", "Elastic cuffs"],
    images: ["/images/products/product-11.jpg", "/images/products/product-11-b.jpg"],
    colors: [
      { name: "Sage", hex: "#9fae9a" },
      { name: "Berry", hex: "#8b3f55" },
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 16,
    badge: "New",
    popularity: 66,
    createdAt: "2026-11-06",
    newArrival: true,
  },
  {
    id: "p12",
    slug: "trail-canvas-sneakers",
    name: "Trail Canvas Sneakers",
    category: "kids",
    price: 44,
    shortDescription: "Easy-on canvas sneakers with a grippy rubber sole.",
    description:
      "Hook-and-loop straps make these easy for little hands, while the cushioned insole and flexible rubber sole keep up with every adventure.",
    details: ["Organic cotton canvas upper", "Hook-and-loop straps", "Flexible rubber outsole", "Spot clean"],
    images: ["/images/products/product-12.jpg", "/images/products/product-12-b.jpg"],
    colors: [{ name: "Cream", hex: "#ece3d1" }],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9"],
    stock: 0,
    badge: "Sold out",
    popularity: 60,
    createdAt: "2026-07-18",
  },

  // -------------------------------------------------------- ACCESSORIES
  {
    id: "p13",
    slug: "full-grain-leather-belt",
    name: "Full-Grain Leather Belt",
    category: "accessories",
    price: 52,
    shortDescription: "Vegetable-tanned leather with a solid brass buckle.",
    description:
      "Cut from a single piece of vegetable-tanned leather, this belt develops a rich patina with wear. The solid brass buckle is built to last decades.",
    details: ["Full-grain vegetable-tanned leather", "Solid brass buckle", "30mm width", "Made in small batches"],
    images: ["/images/products/product-13.jpg", "/images/products/product-13-b.jpg"],
    colors: [
      { name: "Tan", hex: "#a56b3f" },
      { name: "Espresso", hex: "#3b2a22" },
    ],
    sizes: ["S", "M", "L"],
    stock: 22,
    popularity: 90,
    createdAt: "2026-08-10",
    bestSeller: true,
  },
  {
    id: "p14",
    slug: "everyday-canvas-tote",
    name: "Everyday Canvas Tote",
    category: "accessories",
    price: 48,
    shortDescription: "A roomy tote in heavyweight canvas with leather handles.",
    description:
      "Big enough for a laptop, a lunch and a change of shoes. Heavyweight canvas, an inner zip pocket and reinforced leather handles make this a long-term bag.",
    details: ["Heavyweight organic canvas", "Leather handles", "Inner zip pocket", "38 x 40 x 12 cm"],
    images: ["/images/products/product-14.jpg", "/images/products/product-14-b.jpg"],
    colors: [
      { name: "Natural", hex: "#e2d8c4" },
      { name: "Black", hex: "#222224" },
    ],
    stock: 35,
    badge: "New",
    popularity: 82,
    createdAt: "2026-11-10",
    newArrival: true,
  },
  {
    id: "p15",
    slug: "merino-knit-beanie",
    name: "Merino Knit Beanie",
    category: "accessories",
    price: 29,
    shortDescription: "A snug rib-knit beanie in soft merino wool.",
    description:
      "A close-fitting, rib-knit beanie in itch-free merino. Folds once for a cuffed look or sits slouchy for a relaxed feel.",
    details: ["100% merino wool", "One size", "Rib knit", "Hand wash cold"],
    images: ["/images/products/product-15.jpg", "/images/products/product-15-b.jpg"],
    colors: [
      { name: "Charcoal", hex: "#45454b" },
      { name: "Camel", hex: "#b99468" },
      { name: "Cream", hex: "#ece4d4" },
    ],
    stock: 40,
    badge: "New",
    popularity: 74,
    createdAt: "2026-11-08",
    newArrival: true,
  },
  {
    id: "p16",
    slug: "compact-leather-cardholder",
    name: "Compact Leather Cardholder",
    category: "accessories",
    price: 36,
    salePrice: 29,
    shortDescription: "Four card slots and a centre pocket for folded notes.",
    description:
      "A slim, hand-finished cardholder that disappears in a pocket. Four card slots, one centre pocket and edges burnished by hand.",
    details: ["Full-grain leather", "4 card slots + 1 centre pocket", "Hand-burnished edges", "10 x 7.5 cm"],
    images: ["/images/products/product-16.jpg", "/images/products/product-16-b.jpg"],
    colors: [
      { name: "Tan", hex: "#a56b3f" },
      { name: "Black", hex: "#1f1f21" },
    ],
    stock: 28,
    badge: "Sale",
    popularity: 68,
    createdAt: "2026-07-30",
  },
];

// ---------------------------------------------------------------------
//  Helper functions used by the pages. You do not need to edit below.
// ---------------------------------------------------------------------

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(limit = 4): Product[] {
  return products
    .filter((p) => p.newArrival)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getBestSellers(limit = 4): Product[] {
  return products
    .filter((p) => p.bestSeller)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getFeatured(limit = 3): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...same, ...others].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    `${p.name} ${p.category} ${p.shortDescription} ${p.description}`.toLowerCase().includes(q),
  );
}
