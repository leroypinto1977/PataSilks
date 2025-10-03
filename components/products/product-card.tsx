"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/lib/wishlist-context";
import { useState } from "react";
import { motion } from "framer-motion";
import { animations, animationPresets } from "@/lib/animations";
import { SanityProductPreview } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface ProductCardProps {
  product: SanityProductPreview;
}

// Helper function to safely get product image URL
function getProductImageUrl(product: SanityProductPreview): string {
  try {
    // Check if product has images and the first image is valid
    if (product.images && product.images.length > 0 && product.images[0]) {
      const image = product.images[0];

      // Check if the image has a valid asset reference
      if (image.asset && image.asset._ref) {
        // Validate the asset reference format - should start with 'image-' and contain a valid ID
        const assetRef = image.asset._ref;
        if (
          assetRef.startsWith("image-") &&
          assetRef.includes("-") &&
          !assetRef.includes("?")
        ) {
          return urlFor(image).width(600).height(750).url();
        }
      }

      // If image has a direct URL (fallback)
      if (typeof image === "string") {
        return image;
      }

      // If image has a url property (direct URL) - check if it's a string
      if (
        typeof image === "object" &&
        "url" in image &&
        typeof image.url === "string"
      ) {
        return image.url;
      }
    }
  } catch (error) {
    console.warn("Error processing product image:", error);
  }

  // Return placeholder if no valid image found
  return "/placeholder-product.jpg";
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isLiked,
  } = useWishlist();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: getProductImageUrl(product),
    });

    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleWishlistToggle = () => {
    if (isLiked(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      {...animations.slideUp}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
    >
      {/* Premium Badge */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          {...animations.scaleIn}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
        >
          {product.category?.name || "Premium"}
        </motion.div>
      </div>

      {/* Heart Button */}
      <div className="absolute top-4 right-4 z-10">
        <motion.button
          {...animations.buttonHover}
          onClick={handleWishlistToggle}
          className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Heart
            size={16}
            className={`transition-colors ${
              isLiked(product._id)
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </motion.button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-amber-50 to-stone-100">
        <Image
          src={getProductImageUrl(product)}
          alt={product.images[0]?.alt || product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex space-x-3">
            <motion.button
              {...animations.buttonHover}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </span>
            </motion.button>

            <Link href={`/products/${product.slug.current}`}>
              <motion.button
                {...animations.buttonHover}
                className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Eye size={16} className="text-gray-600" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Rating Stars */}
        <div className="absolute bottom-4 left-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1"
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className="text-yellow-400 fill-current"
              />
            ))}
            <span className="text-xs text-white ml-2 bg-black/30 backdrop-blur px-2 py-1 rounded-full">
              4.9
            </span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <Link href={`/products/${product.slug.current}`}>
          <motion.h3
            {...animations.fadeIn}
            className="text-lg font-serif font-bold text-gray-900 line-clamp-2 group-hover:text-amber-600 transition-colors cursor-pointer"
          >
            {product.name}
          </motion.h3>
        </Link>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <motion.p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </motion.p>
            <p className="text-sm text-gray-600">Free shipping</p>
          </div>

          <Link href={`/products/${product.slug.current}`}>
            <motion.button
              {...animations.buttonHover}
              className="bg-gradient-to-r from-amber-50 to-stone-100 hover:from-amber-100 hover:to-amber-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              View Details
            </motion.button>
          </Link>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {["Handwoven", "Pure Silk", "Premium"].map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out" />
    </motion.div>
  );
}
