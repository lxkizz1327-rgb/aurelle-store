import type { LegalSection } from "@/lib/types";

// =====================================================================
//  LEGAL PAGES: Privacy Policy, Terms & Conditions, Shipping & Returns
//  IMPORTANT: this is general template text only. Before you start selling,
//  replace it with wording that matches your business and local law, and
//  have it reviewed by a qualified professional.
//  CHANGE LEGAL TEXT HERE. Each block has a heading and paragraphs.
// =====================================================================

export const legalLastUpdated = "18 November 2026"; // CHANGE "LAST UPDATED" DATE HERE

export const privacyPolicy: LegalSection[] = [
  {
    heading: "Who we are",
    body: ["This website is operated by the business named in the footer and on the Contact page. This policy explains how we handle your personal information."],
  },
  {
    heading: "Information we collect",
    body: [
      "Information you give us, such as your name, email address, delivery address and the contents of messages you send through our forms.",
      "Your shopping cart and wishlist are stored only in your own browser (local storage) so they are still there when you come back. We do not receive that data.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "To process and deliver orders, answer your questions, and (with your consent) send you news and offers. You can unsubscribe from marketing emails at any time.",
    ],
  },
  {
    heading: "Sharing your information",
    body: ["We only share information with service providers that help us run the shop, such as delivery and payment companies, and when required by law. We never sell your personal data."],
  },
  {
    heading: "Your rights",
    body: ["Depending on where you live, you may have the right to access, correct or delete the personal data we hold about you. Contact us using the details on the Contact page to make a request."],
  },
  {
    heading: "Contact",
    body: ["If you have questions about this policy, please get in touch through the Contact page."],
  },
];

export const termsAndConditions: LegalSection[] = [
  {
    heading: "Using this website",
    body: ["By using this website you agree to these terms. If you do not agree, please do not use the site."],
  },
  {
    heading: "Products and prices",
    body: [
      "We try to display products and colours as accurately as possible, but screens vary. Prices are shown in the currency selected on the site and may change without notice.",
      "We reserve the right to correct errors in prices or descriptions and to cancel orders affected by an error.",
    ],
  },
  {
    heading: "Orders and payment",
    body: ["An order is accepted when we confirm it by email. Payment must be completed before your order is dispatched."],
  },
  {
    heading: "Delivery and returns",
    body: ["Delivery and returns are covered in our Shipping & Returns policy, which forms part of these terms."],
  },
  {
    heading: "Intellectual property",
    body: ["All text, images and designs on this website belong to us or our licensors and may not be copied or reused without permission."],
  },
  {
    heading: "Limitation of liability",
    body: ["To the fullest extent permitted by law, we are not liable for indirect or consequential losses arising from your use of the site or products."],
  },
  {
    heading: "Changes to these terms",
    body: ["We may update these terms from time to time. The date at the top of this page shows when they were last changed."],
  },
];

export const shippingReturns: LegalSection[] = [
  {
    heading: "Shipping rates",
    body: ["Orders over $150 ship free. Below that, a flat shipping fee applies and is shown in your cart before you check out."],
  },
  {
    heading: "Processing and delivery times",
    body: [
      "Orders are processed within 1–2 working days. Standard delivery then takes 3–7 working days, depending on your location.",
      "You will receive an email with tracking information as soon as your order ships.",
    ],
  },
  {
    heading: "International orders",
    body: ["We ship to many countries. Delivery times and any customs duties or import taxes depend on the destination and are the responsibility of the recipient."],
  },
  {
    heading: "Returns",
    body: [
      "You can return items within 30 days of delivery. Items must be unworn, unwashed and have their original tags attached.",
      "To start a return, contact us through the Contact page with your order number and we will send you instructions.",
    ],
  },
  {
    heading: "Refunds",
    body: ["Refunds are issued to the original payment method within 5–10 working days after we receive and inspect your return."],
  },
  {
    heading: "Damaged or incorrect items",
    body: ["If something arrives damaged or is not what you ordered, contact us within 7 days and we will make it right with a replacement or a full refund."],
  },
];
