"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { useStore } from "@/context/StoreContext";
import { useLockBody } from "@/lib/useLockBody";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLockBody(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-surface transition-shadow duration-300",
        scrolled ? "border-line shadow-sm" : "border-transparent",
      )}
    >
      <div className="container-x grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-4 md:h-[78px]">
        {/* Left: desktop nav / mobile menu button */}
        <div className="flex items-center">
          <button
            type="button"
            className="-ml-2 p-2 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {siteConfig.nav.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "link-underline text-[12px] font-medium uppercase tracking-[0.16em] transition-colors",
                  isActive(link.href) ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Centre: logo */}
        <Logo />

        {/* Right: secondary nav + icons */}
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <nav aria-label="Secondary" className="mr-4 hidden items-center gap-7 lg:flex">
            {siteConfig.nav.slice(4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "link-underline text-[12px] font-medium uppercase tracking-[0.16em] transition-colors",
                  isActive(link.href) ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button type="button" className="p-2 transition-colors hover:text-accent" aria-label="Search products" onClick={() => setSearchOpen(true)}>
            <Search size={21} strokeWidth={1.5} />
          </button>
          <Link href="/wishlist" className="relative p-2 transition-colors hover:text-accent" aria-label={`Wishlist (${wishlist.length} items)`}>
            <Heart size={21} strokeWidth={1.5} />
            {wishlist.length > 0 ? (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white">
                {wishlist.length}
              </span>
            ) : null}
          </Link>
          <button type="button" className="relative p-2 transition-colors hover:text-accent" aria-label={`Open cart (${cartCount} items)`} onClick={() => setCartOpen(true)}>
            <ShoppingBag size={21} strokeWidth={1.5} />
            {cartCount > 0 ? (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", menuOpen ? "visible" : "invisible pointer-events-none")} aria-hidden={!menuOpen}>
        <div
          onClick={() => setMenuOpen(false)}
          className={cn("absolute inset-0 bg-black transition-opacity duration-300", menuOpen ? "opacity-40" : "opacity-0")}
        />
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className={cn(
            "absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-surface p-6 transition-transform duration-300",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-heading text-2xl font-semibold tracking-[0.16em]">{siteConfig.name}</span>
            <button type="button" className="-mr-2 p-2" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <ul className="flex flex-1 flex-col divide-y divide-line overflow-y-auto">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn("block py-4 font-heading text-3xl", isActive(link.href) ? "text-accent" : "text-ink")}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link href="/wishlist" className="btn btn-outline" tabIndex={menuOpen ? 0 : -1}>
              Wishlist
            </Link>
            <Link href="/cart" className="btn btn-primary" tabIndex={menuOpen ? 0 : -1}>
              Cart
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
