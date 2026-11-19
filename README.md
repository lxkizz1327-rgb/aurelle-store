# AURELLE – your online store

A complete, modern online shop built with Next.js, React, TypeScript and Tailwind CSS.
You never need to touch the "code" – everything you will want to change lives in a few simple files.

> **Demo checkout:** the checkout page is a demonstration. It does **not** take payments.
> See "Taking real payments" at the bottom.

---

## The 3 places you will edit

| What you want to change | File / folder |
| --- | --- |
| Website name, colours, menu, hero text, contact details, social links, footer, About page, banners text | `src/data/site-config.ts` |
| Products (names, prices, sale prices, stock, sizes, colours, images) | `src/data/products.ts` |
| Categories | `src/data/categories.ts` |
| Blog articles | `src/data/blog.ts` |
| Customer reviews | `src/data/testimonials.ts` |
| FAQ questions | `src/data/faq.ts` |
| Privacy / Terms / Shipping & returns text | `src/data/legal.ts` |
| Which picture is used where | `src/data/images.ts` |
| Fonts | `src/app/fonts.ts` |
| Pictures | `public/images/…` folders |

Every setting has a comment such as `// CHANGE WEBSITE NAME HERE` right beside it.

**Golden rules when editing:** keep the "quote marks", keep the commas at the end of lines, and change only the words/numbers.

---

## How to edit on GitHub (no software needed)

1. Open your repository on github.com.
2. Click the file you want to change (for example `src/data/site-config.ts`).
3. Click the **pencil icon** (Edit).
4. Change the text, then click **Commit changes…** and confirm.
5. Vercel notices the change and publishes your live site automatically in about a minute.

To upload a picture: open the image folder (for example `public/images/products`), click **Add file → Upload files**, drag your picture in, and commit.

---

## 1. Change website text
Open `src/data/site-config.ts`. Look for the comments: `CHANGE HERO HEADING HERE`, `CHANGE HERO DESCRIPTION HERE`, `CHANGE FOOTER TEXT HERE` and so on. Edit the words inside the quotes.

## 2. Change images
All pictures live in `public/images/` in these folders:

```
public/images/hero/         big picture at the top of the home page
public/images/products/     product photos
public/images/categories/   category pictures
public/images/banners/      promotional banner + featured collection picture
public/images/blog/         blog article pictures
public/images/about/        About page + brand story pictures
public/images/instagram/    square pictures for the Instagram gallery
public/images/logo/         your logo
```

**Easiest method – same file name:** upload your own `.jpg` with exactly the same name as the existing picture (for example `hero-banner.jpg`). It replaces the old one. No code change needed.

**Using a new file name:** upload the picture, then open `src/data/images.ts` (or the product/category/blog file) and change the path, e.g. `"/images/hero/my-new-hero.jpg"`.

Until you upload your own photos, soft placeholder pictures are created automatically, so the site never shows broken images.

Recommended sizes: hero 1920×1080 · banners 1920×900 · products 900×1125 · categories 900×1125 · blog 1200×800 · Instagram 800×800. Keep each file under about 500 KB for speed (free tools like squoosh.app help).

The file names currently expected are listed in `src/data/images.ts`, `products.ts`, `categories.ts` and `blog.ts`.

## 3. Add new products
1. Open `src/data/products.ts`.
2. Copy one whole product block (from `{` to `},`).
3. Paste it just before the final `];`.
4. Change `id` and `slug` (both must be unique), then the name, price, description, category, images, sizes, colours and stock.
5. Upload the product photos into `public/images/products/` using the same file names you wrote in `images:`.
6. Set `featured`, `newArrival` or `bestSeller` to `true` to show it in those home page sections.

## 4. Delete products
Open `src/data/products.ts` and delete the product's whole block (from `{` to `},`).

## 5. Update product prices
In `src/data/products.ts`, change `price:` (normal price) and `salePrice:` (discounted price). Delete the `salePrice` line to end a sale. To mark an item as sold out, set `stock: 0`.

## 6. Change website colours
Open `src/data/site-config.ts` and edit the `colors` section (primary, secondary, accent, background, text …). Use hex codes like `#b5654a`. The whole site updates.
To change fonts, edit `src/app/fonts.ts`.

## 7. Change the logo
Upload your logo (for example `logo.png`) into `public/images/logo/`, then in `src/data/images.ts` set `logo: "/images/logo/logo.png"`. While it is empty (`""`), the website name is shown as text. Change the name in `site-config.ts` (`CHANGE WEBSITE NAME HERE`).

## 8. Update social media links
In `src/data/site-config.ts`, edit the `social` list (change each `url`). Instagram gallery link and handle are in `home.instagram`.

## 9. Update contact details
In `src/data/site-config.ts`, edit the `contact` section (email, phone, address, opening hours). They update on the Contact page and in the footer.

**Contact form / newsletter:** by default they open the visitor's email app addressed to your contact email. For real form delivery without an email app, create a free form at formspree.io and paste its URL into `forms.endpoint` in `site-config.ts`.

## 10. Update banners
- Top strip: `announcement` in `site-config.ts` (set `enabled: false` to hide).
- Promotional banner text: `home.promo` in `site-config.ts`; its picture: `promoBanner` in `images.ts`.
- Hero text: `hero` in `site-config.ts`; hero picture: `hero` in `images.ts`.

## 11. Update blog articles
Open `src/data/blog.ts`. Copy one article block, paste it at the top of the list, and change the title, text and image. Each line in `content` is one paragraph; start a line with `## ` for a sub-heading. Upload its picture to `public/images/blog/`.

## 12. Publish changes to the live website
The site is connected to Vercel. When your files change on GitHub (see "How to edit on GitHub" above), Vercel rebuilds and publishes automatically within about a minute. Check progress in your Vercel dashboard under **Deployments**. If a build ever fails (usually a missing comma or quote mark), the previous version stays live, and Vercel shows the error line so you can fix it.

**Important:** after you get your final web address (for example a custom domain), set it in `src/data/site-config.ts` → `url`, so link previews and the sitemap use the right address.

---

## What works
Home, Shop with search/category/price/availability filters and sorting, product pages with gallery, colours, sizes, quantity, stock, cart drawer + cart page, wishlist, demo checkout, Journal (blog) + articles, About, Contact, FAQ, Privacy, Terms, Shipping & returns, and a custom 404 page. Cart and wishlist are saved in the visitor's browser (localStorage).

## Taking real payments (needs a third-party service)
The checkout is a **demo**. To take real orders you need a payment provider. Stripe Checkout or Razorpay (popular in India) are common options; they charge per-transaction fees and require your own account and API keys, and a small server route. This project does not include one so you stay on a fully free setup. Ask for this as a follow-up when you are ready.

Other things that need outside services: sending order emails, storing orders/customers in a database, user accounts, and live stock syncing. None are required for the site to run today.

## Running on your own computer (optional)
```
npm install
npm run dev
```
Then open http://localhost:3000. This is not needed for normal editing.

## Free hosting notes
Vercel's Hobby plan is free for personal, non-commercial projects within its usage limits. If you start selling commercially, check Vercel's current terms, because commercial use may require a paid plan. Pictures in `public/` count toward bandwidth, so keep files reasonably small.
