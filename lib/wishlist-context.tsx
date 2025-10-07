"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { SanityProductPreview } from "@/types/sanity";

// Extended product type to handle both _id and id
interface WishlistProduct {
  _id?: string; // For Sanity products
  id?: string; // For database products
  name: string;
  slug?: { current: string } | string; // Handle both formats
  description?: string;
  price: number;
  images?: any[]; // Flexible image format
  category?: {
    _id?: string;
    id?: string;
    name: string;
    slug?: { current: string } | string;
  };
  fabric?: string;
  color?: string;
  featured?: boolean;
  newArrival?: boolean;
  new_arrival?: boolean;
}

interface WishlistState {
  items: WishlistProduct[];
  itemCount: number;
}

interface WishlistContextType {
  state: WishlistState;
  addItem: (product: WishlistProduct) => void;
  removeItem: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistProduct }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistProduct[] };

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (existingItem) {
        return state; // Don't add duplicates
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        itemCount: state.itemCount + 1,
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => (item._id || item.id) !== action.payload
        ),
        itemCount: Math.max(0, state.itemCount - 1),
      };

    case "CLEAR_WISHLIST":
      return {
        ...state,
        items: [],
        itemCount: 0,
      };

    case "LOAD_WISHLIST":
      return {
        ...state,
        items: action.payload,
        itemCount: action.payload.length,
      };

    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
  });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        dispatch({ type: "LOAD_WISHLIST", payload: items });
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: WishlistProduct) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const isLiked = (productId: string) => {
    return state.items.some((item) => (item._id || item.id) === productId);
  };

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        isLiked,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
