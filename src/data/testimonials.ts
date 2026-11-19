import type { Testimonial } from "@/lib/types";

// =====================================================================
//  TESTIMONIALS (customer quotes on the home page)
//  CHANGE / ADD / DELETE REVIEWS HERE. rating is a number from 1 to 5.
//  Replace these sample quotes with real customer feedback.
// =====================================================================

export const testimonials: Testimonial[] = [
  {
    name: "Priya S.",
    location: "Mumbai",
    rating: 5,
    quote: "The cashmere cardigan is unbelievably soft and the fit is perfect. It already feels like an old favourite.",
  },
  {
    name: "Daniel R.",
    location: "London",
    rating: 5,
    quote: "Finally a shirt that fits well and does not fall apart after a few washes. I bought three more.",
  },
  {
    name: "Aisha K.",
    location: "Dubai",
    rating: 5,
    quote: "Fast delivery, beautiful packaging and the quality is far better than I expected for the price.",
  },
  {
    name: "Marco T.",
    location: "Milan",
    rating: 4,
    quote: "My kids live in the hoodies. They are soft, they wash well and they still look new after months.",
  },
];
