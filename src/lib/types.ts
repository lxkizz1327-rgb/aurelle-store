// Shapes of the data used across the site. You do not need to edit this file.

export type ColorOption = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // must match a category "slug" in categories.ts
  price: number;
  salePrice?: number;
  shortDescription: string;
  description: string;
  details: string[];
  images: string[];
  colors?: ColorOption[];
  sizes?: string[];
  stock: number; // 0 = sold out
  badge?: string;
  popularity: number; // higher = shown first when sorting by popularity
  createdAt: string; // YYYY-MM-DD
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
};

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  quote: string;
};

export type FaqItem = { question: string; answer: string };

export type LegalSection = { heading: string; body: string[] };
