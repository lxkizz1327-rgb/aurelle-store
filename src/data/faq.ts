import type { FaqItem } from "@/lib/types";

// =====================================================================
//  FAQ  (Frequently Asked Questions page)
//  CHANGE / ADD / DELETE QUESTIONS HERE. Each block is one question.
// =====================================================================

export const faqs: FaqItem[] = [
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3–7 working days. You will receive an email with tracking details as soon as your order ships.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes. Orders over $150 ship free. Below that amount a flat shipping fee applies, shown in your cart before you check out.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "You can return unworn items with their tags attached within 30 days of delivery for a full refund. See the Shipping & Returns page for details.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Each product page lists the available sizes. Our pieces are designed to fit true to size, and the product notes tell you if an item runs relaxed or fitted. If you are between sizes we recommend sizing up.",
  },
  {
    question: "How should I care for my garments?",
    answer:
      "Care instructions are listed on each product page and on the garment label. As a rule, wash cool, avoid tumble drying and air-dry knitwear flat.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Contact us as soon as possible using the Contact page. If your order has not shipped yet, we will gladly change or cancel it.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "Payment methods are shown at checkout. (Edit this answer in src/data/faq.ts once you have set up your payment provider.)",
  },
  {
    question: "How can I contact you?",
    answer:
      "Use the form on the Contact page or email us directly. We usually reply within one working day.",
  },
];
