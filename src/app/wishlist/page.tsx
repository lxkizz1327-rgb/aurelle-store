import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WishlistView from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader title="Wishlist" subtitle="Your saved favourites, ready when you are." crumbs={[{ label: "Wishlist" }]} />
      <WishlistView />
    </>
  );
}
