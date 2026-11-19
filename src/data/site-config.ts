import { images } from "./images";

// =====================================================================
//  SITE CONFIG  –  the main settings file for your whole website
// =====================================================================
//  Change the text between the "quote marks". Do not delete the commas
//  at the end of the lines, and do not remove the quote marks.
//  Look for the "CHANGE ... HERE" notes to find what you want to edit.
// =====================================================================

export const siteConfig = {
  // CHANGE WEBSITE NAME HERE
  name: "AURELLE",

  // CHANGE TAGLINE HERE (short sentence shown in the browser tab and on Google)
  tagline: "Considered clothing for everyday life",

  // CHANGE SEARCH-ENGINE DESCRIPTION HERE (about 150 characters)
  description:
    "Thoughtfully made clothing and accessories in natural fabrics. Women, men, kids and everyday essentials, designed to be worn for years.",

  // CHANGE YOUR LIVE WEBSITE ADDRESS HERE (needed for correct sharing previews + sitemap)
  url: "https://aurelle-store.vercel.app",

  // CHANGE LOGO HERE: set in src/data/images.ts  (line: logo)
  logoImage: images.logo,

  // CHANGE CURRENCY HERE: code = "USD", "EUR", "GBP", "INR" ...  locale = "en-US", "en-GB", "en-IN" ...
  currency: { code: "USD", locale: "en-US" },

  // -------------------------------------------------------------------
  //  BRAND COLOURS  –  change any colour here and the whole site updates.
  //  Use "hex" colour codes such as #1f1b18 (search "colour picker" online).
  // -------------------------------------------------------------------
  colors: {
    primary: "#1f1b18", // CHANGE PRIMARY COLOUR HERE (main buttons, dark text blocks)
    onPrimary: "#ffffff", // text colour that sits on top of the primary colour
    secondary: "#efe7dc", // CHANGE SECONDARY COLOUR HERE (soft background panels)
    accent: "#b5654a", // CHANGE ACCENT COLOUR HERE (highlights, sale tags, hover)
    background: "#faf8f5", // CHANGE PAGE BACKGROUND COLOUR HERE
    surface: "#ffffff", // cards, header, drawers
    text: "#2b2622", // CHANGE MAIN TEXT COLOUR HERE
    muted: "#7a7168", // lighter grey text
    border: "#e5ded4", // thin divider lines
  },
  // CHANGE FONTS in the file: src/app/fonts.ts

  // -------------------------------------------------------------------
  //  ANNOUNCEMENT BAR (thin strip at the very top)
  // -------------------------------------------------------------------
  announcement: {
    enabled: true, // CHANGE TO false TO HIDE THE BAR
    text: "Free shipping on orders over $150  ·  Free 30-day returns",
    linkLabel: "Shop now",
    linkHref: "/shop",
  },

  // -------------------------------------------------------------------
  //  NAVIGATION MENU  (add, remove or rename links here)
  // -------------------------------------------------------------------
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Women", href: "/category/women" },
    { label: "Men", href: "/category/men" },
    { label: "Kids", href: "/category/kids" },
    { label: "Journal", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // -------------------------------------------------------------------
  //  HOME PAGE – HERO (big top section). Image: src/data/images.ts (hero)
  // -------------------------------------------------------------------
  hero: {
    eyebrow: "Autumn / Winter 2026", // CHANGE HERO SMALL TEXT HERE
    heading: "Clothing made to be lived in", // CHANGE HERO HEADING HERE
    description:
      "Natural fabrics, relaxed tailoring and honest prices. Discover the new season's essentials.", // CHANGE HERO DESCRIPTION HERE
    primaryButton: { label: "Shop the collection", href: "/shop" }, // CHANGE HERO BUTTONS HERE
    secondaryButton: { label: "Our story", href: "/about" },
  },

  // -------------------------------------------------------------------
  //  HOME PAGE – SECTION HEADINGS
  // -------------------------------------------------------------------
  home: {
    categories: { eyebrow: "Shop by category", heading: "Find your style" },
    newArrivals: { eyebrow: "Just landed", heading: "New arrivals" },
    bestSellers: { eyebrow: "Customer favourites", heading: "Best sellers" },
    featuredCollection: {
      eyebrow: "Featured collection",
      heading: "The Autumn Edit",
      text: "A handpicked set of pieces that work together: warm layers, easy tailoring and fabrics that feel as good as they look.",
      buttonLabel: "Explore the shop",
      buttonHref: "/shop",
    },
    // CHANGE PROMOTIONAL BANNER HERE (image: src/data/images.ts -> promoBanner)
    promo: {
      eyebrow: "Limited time",
      heading: "Up to 20% off selected styles",
      text: "Seasonal favourites at lighter prices, while stock lasts.",
      buttonLabel: "Shop the sale",
      buttonHref: "/shop?sale=1",
    },
    // CHANGE BRAND STORY SECTION HERE (image: src/data/images.ts -> brandStory)
    story: {
      eyebrow: "Our story",
      heading: "Made slowly, worn for years",
      paragraphs: [
        "We started AURELLE with a simple idea: buy less, choose better. Every piece is designed in small runs from natural fabrics, and made by partners who are paid fairly.",
        "No endless trends and no throwaway fashion — just considered clothing that gets better with wear.",
      ],
      buttonLabel: "Read more about us",
      buttonHref: "/about",
    },
    // CHANGE PRODUCT BENEFITS HERE. icon options: Truck, RefreshCw, ShieldCheck, Leaf, Heart, Sparkles
    benefits: [
      { icon: "Truck", title: "Free shipping", text: "On all orders over $150" },
      { icon: "RefreshCw", title: "30-day returns", text: "Changed your mind? No problem" },
      { icon: "ShieldCheck", title: "Secure checkout", text: "Your details stay protected" },
      { icon: "Leaf", title: "Responsibly made", text: "Natural, traceable fabrics" },
    ],
    testimonials: { eyebrow: "Kind words", heading: "Loved by our customers" },
    instagram: {
      eyebrow: "Follow along",
      heading: "@aurelle.store", // CHANGE INSTAGRAM HANDLE HERE
      url: "https://instagram.com", // CHANGE INSTAGRAM LINK HERE
    },
    newsletter: {
      heading: "Join the list, get 10% off",
      text: "Be first to hear about new arrivals, restocks and private sales. Unsubscribe any time.",
      buttonLabel: "Subscribe",
    },
  },

  // -------------------------------------------------------------------
  //  SHOP SETTINGS
  // -------------------------------------------------------------------
  shop: {
    freeShippingThreshold: 150, // CHANGE FREE-SHIPPING AMOUNT HERE
    flatShippingRate: 8, // CHANGE SHIPPING PRICE HERE (charged below the free-shipping amount)
    // CHANGE PRICE FILTER RANGES HERE (max: null means "and above")
    priceRanges: [
      { min: 0, max: 50 },
      { min: 50, max: 100 },
      { min: 100, max: 150 },
      { min: 150, max: null },
    ] as { min: number; max: number | null }[],
  },

  // -------------------------------------------------------------------
  //  CONTACT DETAILS  (shown on the Contact page and in the footer)
  // -------------------------------------------------------------------
  contact: {
    email: "hello@example.com", // CHANGE CONTACT EMAIL HERE
    phone: "+1 (555) 123-4567", // CHANGE PHONE NUMBER HERE
    address: "24 Market Street, Your City, Your Country", // CHANGE ADDRESS HERE
    hours: "Mon – Fri, 9am – 6pm", // CHANGE OPENING HOURS HERE
  },

  // -------------------------------------------------------------------
  //  FORMS: contact form + newsletter
  //  Leave endpoint empty ("") and the forms open the visitor's email app,
  //  addressed to your contact email (works with no extra service).
  //  OPTIONAL: create a free form at formspree.io and paste its URL
  //  (e.g. "https://formspree.io/f/abcdwxyz") to receive messages by email directly.
  // -------------------------------------------------------------------
  forms: {
    endpoint: "",
  },

  // -------------------------------------------------------------------
  //  SOCIAL MEDIA LINKS  (icon options: Instagram, Facebook, Twitter, Youtube)
  // -------------------------------------------------------------------
  social: [
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com" }, // CHANGE SOCIAL LINKS HERE
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com" },
  ],

  // -------------------------------------------------------------------
  //  FOOTER
  // -------------------------------------------------------------------
  footer: {
    about: "Considered clothing and everyday essentials, made in small runs from natural fabrics.", // CHANGE FOOTER TEXT HERE
    columns: [
      {
        title: "Shop",
        links: [
          { label: "All products", href: "/shop" },
          { label: "Categories", href: "/categories" },
          { label: "Women", href: "/category/women" },
          { label: "Men", href: "/category/men" },
          { label: "Kids", href: "/category/kids" },
          { label: "Accessories", href: "/category/accessories" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About us", href: "/about" },
          { label: "Journal", href: "/blog" },
          { label: "Contact", href: "/contact" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Shipping & returns", href: "/shipping-returns" },
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "Terms & conditions", href: "/terms-and-conditions" },
          { label: "Wishlist", href: "/wishlist" },
          { label: "Cart", href: "/cart" },
        ],
      },
    ],
    copyright: "All rights reserved.", // CHANGE COPYRIGHT TEXT HERE (year + name are added automatically)
  },

  // -------------------------------------------------------------------
  //  ABOUT PAGE  (images: src/data/images.ts -> aboutHero, aboutStory)
  // -------------------------------------------------------------------
  about: {
    heading: "Clothing with intention", // CHANGE ABOUT HEADING HERE
    intro:
      "We are a small, independent label designing everyday clothing that is comfortable, durable and kind to the planet.",
    storyHeading: "How it began",
    story: [
      "AURELLE began at a kitchen table with a handful of fabric swatches and a frustration: why was it so hard to find simple, well-made clothes that lasted?",
      "Today we design every collection in-house, work directly with a small number of family-run mills and workshops, and produce in limited runs to avoid waste.",
      "We believe good clothes should feel great, look timeless and be priced honestly. That is what we try to deliver, one piece at a time.",
    ],
    values: [
      { icon: "Leaf", title: "Natural materials", text: "Organic cotton, merino, linen and leather — fabrics that age gracefully." },
      { icon: "Heart", title: "Fair making", text: "Small partner workshops where makers are paid fairly and treated well." },
      { icon: "Sparkles", title: "Made to last", text: "Timeless designs and honest construction so you buy less, and wear more." },
    ],
    stats: [
      { value: "12k+", label: "Happy customers" },
      { value: "100%", label: "Natural fibres" },
      { value: "30", label: "Day free returns" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
