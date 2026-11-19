// =====================================================================
//  IMAGE MAP  –  which picture is used in which part of the website
// =====================================================================
//  HOW TO CHANGE AN IMAGE (easiest way):
//    1. Prepare your photo as a .jpg file.
//    2. Give it EXACTLY the same file name as listed below
//       (example: hero-banner.jpg).
//    3. Upload it into the matching folder inside /public/images/
//       (example: /public/images/hero/hero-banner.jpg). It replaces the old one.
//    No code change needed.
//
//  HOW TO USE A DIFFERENT FILE NAME:
//    Upload the new file, then change the path text below to match it.
//
//  Product photos are listed next to each product in  src/data/products.ts
//  Category photos are listed in                      src/data/categories.ts
//  Blog photos are listed in                          src/data/blog.ts
//
//  Until you upload your own photos, the site shows soft placeholder
//  pictures that are created automatically.
// =====================================================================

export const images = {
  // CHANGE LOGO HERE: leave "" to show the website name as text, or
  // upload a file (e.g. /public/images/logo/logo.png) and write "/images/logo/logo.png"
  logo: "",

  // CHANGE HERO IMAGE HERE (big picture at the top of the home page, 1920x1080 works well)
  hero: "/images/hero/hero-banner.jpg",

  // CHANGE PROMOTIONAL BANNER IMAGE HERE (wide banner on the home page, 1920x900)
  promoBanner: "/images/banners/banner-sale.jpg",

  // CHANGE FEATURED COLLECTION IMAGE HERE (large picture beside featured products, 900x1125)
  featuredCollection: "/images/banners/collection-feature.jpg",

  // CHANGE BRAND STORY IMAGE HERE (home page "our story" section)
  brandStory: "/images/about/brand-story.jpg",

  // CHANGE ABOUT PAGE IMAGES HERE
  aboutHero: "/images/about/about-us.jpg",
  aboutStory: "/images/about/about-story.jpg",

  // CHANGE INSTAGRAM / SOCIAL GALLERY IMAGES HERE (square pictures, 800x800)
  instagram: [
    "/images/instagram/insta-01.jpg",
    "/images/instagram/insta-02.jpg",
    "/images/instagram/insta-03.jpg",
    "/images/instagram/insta-04.jpg",
    "/images/instagram/insta-05.jpg",
    "/images/instagram/insta-06.jpg",
  ],

  // Shown automatically if any picture fails to load. Do not delete.
  fallback: "/images/placeholder.svg",
};
