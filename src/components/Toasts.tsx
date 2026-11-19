"use client";

import { Check, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Toasts() {
  const { toasts, dismissToast, setCartOpen } = useStore();
  return (
    <div
      className="pointer-events-none fixed bottom-4 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 flex-col gap-2"
      aria-live="polite"
      role="status"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex animate-toast-in items-center gap-3 bg-primary px-4 py-3 text-sm text-on-primary shadow-xl"
        >
          <Check size={16} className="shrink-0" aria-hidden="true" />
          <span className="flex-1">{toast.message}</span>
          {toast.showCartLink ? (
            <button
              type="button"
              onClick={() => {
                setCartOpen(true);
                dismissToast(toast.id);
              }}
              className="shrink-0 text-xs font-medium uppercase tracking-wider underline underline-offset-4"
            >
              View cart
            </button>
          ) : null}
          <button type="button" onClick={() => dismissToast(toast.id)} aria-label="Dismiss notification" className="shrink-0 opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
