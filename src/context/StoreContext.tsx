"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/data/products";
import type { Product } from "@/lib/types";
import { unitPrice } from "@/lib/utils";

export type CartItem = {
  key: string;
  productId: string;
  color?: string;
  size?: string;
  quantity: number;
};

export type CartLine = {
  item: CartItem;
  product: Product;
  unitPrice: number;
  lineTotal: number;
};

export type ToastMessage = { id: number; message: string; showCartLink?: boolean };

type AddOptions = { color?: string; size?: string; quantity?: number };

type StoreContextValue = {
  hydrated: boolean;
  cart: CartItem[];
  cartLines: CartLine[];
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  addToCart: (productId: string, options?: AddOptions) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  notify: (message: string, showCartLink?: boolean) => void;
  dismissToast: (id: number) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "aurelle-cart-v1";
const WISHLIST_KEY = "aurelle-wishlist-v1";

function makeKey(productId: string, color?: string, size?: string): string {
  return `${productId}|${color ?? ""}|${size ?? ""}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load saved cart + wishlist from the visitor's browser
  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_KEY);
      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          const valid = (parsed as CartItem[]).filter(
            (i) => i && typeof i.productId === "string" && typeof i.quantity === "number" && getProductById(i.productId),
          );
          setCart(valid);
        }
      }
      const savedWishlist = window.localStorage.getItem(WISHLIST_KEY);
      if (savedWishlist) {
        const parsed: unknown = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          setWishlist((parsed as string[]).filter((id) => typeof id === "string" && getProductById(id)));
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // storage may be full or blocked
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      // storage may be full or blocked
    }
  }, [wishlist, hydrated]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, showCartLink?: boolean) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev.slice(-2), { id, message, showCartLink }]);
      window.setTimeout(() => dismissToast(id), 3800);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (productId: string, options: AddOptions = {}) => {
      const product = getProductById(productId);
      if (!product || product.stock <= 0) {
        notify("Sorry, this item is currently sold out.");
        return;
      }
      const quantity = Math.max(1, options.quantity ?? 1);
      const key = makeKey(productId, options.color, options.size);
      const existing = cart.find((i) => i.key === key);
      const current = existing ? existing.quantity : 0;
      const next = Math.min(product.stock, current + quantity);
      if (next === current) {
        notify(`Only ${product.stock} available in stock.`);
        return;
      }
      setCart((prev) =>
        existing
          ? prev.map((i) => (i.key === key ? { ...i, quantity: next } : i))
          : [...prev, { key, productId, color: options.color, size: options.size, quantity: next }],
      );
      notify(`${product.name} added to your cart`, true);
    },
    [cart, notify],
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.key !== key) return i;
          const product = getProductById(i.productId);
          const max = product ? product.stock : quantity;
          return { ...i, quantity: Math.min(max, quantity) };
        })
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      const has = wishlist.includes(productId);
      setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
      if (product) notify(has ? `Removed ${product.name} from your wishlist` : `Saved ${product.name} to your wishlist`);
    },
    [wishlist, notify],
  );

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const cartLines = useMemo<CartLine[]>(() => {
    const lines: CartLine[] = [];
    for (const item of cart) {
      const product = getProductById(item.productId);
      if (!product) continue;
      const price = unitPrice(product);
      lines.push({ item, product, unitPrice: price, lineTotal: price * item.quantity });
    }
    return lines;
  }, [cart]);

  const cartCount = useMemo(() => cartLines.reduce((sum, l) => sum + l.item.quantity, 0), [cartLines]);
  const subtotal = useMemo(() => cartLines.reduce((sum, l) => sum + l.lineTotal, 0), [cartLines]);

  const value: StoreContextValue = {
    hydrated,
    cart,
    cartLines,
    cartCount,
    subtotal,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    toasts,
    notify,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
