"use client";

import { useCartStore } from "@/lib/store";
import { useMounted } from "./use-mounted";

export function useCart() {
  const mounted = useMounted();
  const store = useCartStore();

  // Return safe defaults during SSR
  if (!mounted) {
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getTotalItems: () => 0,
      getTotalPrice: () => 0,
    };
  }

  return store;
}
