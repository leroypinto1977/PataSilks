"use client";

import { useCart as useCartContext } from "@/lib/cart-context";
import { useMounted } from "./use-mounted";

export function useCart() {
  const mounted = useMounted();

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

  // Use the context hook from cart-context
  const context = useCartContext();
  const { state, addItem, removeItem, updateQuantity, clearCart } = context;

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems: () => state.itemCount,
    getTotalPrice: () => state.total,
  };
}
