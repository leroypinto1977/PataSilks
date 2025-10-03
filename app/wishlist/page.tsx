"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import { useWishlist } from "@/lib/wishlist-context";
import { useMounted } from "@/hooks/use-mounted";

export default function WishlistPage() {
  const { state, clearWishlist } = useWishlist();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="bg-white flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rich-beige"></div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Heart className="mx-auto h-16 w-16 text-gray-300 mb-6" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Start adding sarees you love to your wishlist. They'll appear here
              for easy access.
            </p>
            <Link href="/products">
              <Button className="bg-rich-beige hover:bg-rich-beige/90 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <ShoppingBag className="mr-2" size={20} />
                Browse Sarees
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Your Wishlist
              </h1>
              <p className="text-lg text-gray-600">
                {state.itemCount} saree{state.itemCount !== 1 ? "s" : ""} you
                love
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="border-rich-beige/20 hover:bg-rich-beige/5 text-rich-beige"
            >
              Clear All
            </Button>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProductGrid products={state.items} />
        </motion.div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link href="/products">
            <Button className="bg-rich-beige hover:bg-rich-beige/90 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <ShoppingBag className="mr-2" size={20} />
              Continue Shopping
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
