"use client";

import { useEffect } from "react";

/** Stops the page behind a drawer/menu from scrolling while it is open. */
export function useLockBody(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
