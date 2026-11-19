import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bodyFont, headingFont } from "./fonts";
import { siteConfig } from "@/data/site-config";
import { images } from "@/data/images";
import { StoreProvider } from "@/context/StoreContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import Toasts from "@/components/Toasts";

const siteTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: siteTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [{ url: images.hero, width: 1920, height: 1080, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.description,
    images: [images.hero],
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.background,
  width: "device-width",
  initialScale: 1,
};

function themeCss(): string {
  const c = siteConfig.colors;
  return `:root{--c-primary:${c.primary};--c-on-primary:${c.onPrimary};--c-secondary:${c.secondary};--c-accent:${c.accent};--c-background:${c.background};--c-surface:${c.surface};--c-text:${c.text};--c-muted:${c.muted};--c-border:${c.border};}`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <Toasts />
        </StoreProvider>
      </body>
    </html>
  );
}
