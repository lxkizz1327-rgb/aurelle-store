import { Cormorant_Garamond, Inter } from "next/font/google";

// =====================================================================
//  FONTS
//  CHANGE HEADING FONT HERE: replace "Cormorant_Garamond" (in the line
//  below AND in the import line above) with another Google font name.
//  Examples: Playfair_Display, DM_Serif_Display, Lora, Fraunces.
//  Font names with spaces use an underscore (Playfair Display -> Playfair_Display).
//  Some fonts need a "weight" list like the one below; others (variable
//  fonts such as Fraunces, Lora or Inter) can drop the weight line.
// =====================================================================
export const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// CHANGE BODY FONT HERE (the font used for normal text)
export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
