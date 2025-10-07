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

// Extended product interface to handle both _id and id
interface ExtendedProduct {
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

interface ProductCardProps {
  product: ExtendedProduct;
}

// Helper function to safely get product ID
function getProductId(product: ExtendedProduct): string {
  return product._id || product.id || "";
}

// Helper function to safely get product image URL
function getProductImageUrl(product: ExtendedProduct): string {
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

// Helper function to get product slug
function getProductSlug(product: ExtendedProduct): string {
  if (typeof product.slug === "string") {
    return product.slug;
  }
  if (
    product.slug &&
    typeof product.slug === "object" &&
    getProductSlug(product)
  ) {
    return getProductSlug(product);
  }
  return "";
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
      id: getProductId(product),
      name: product.name,
      price: product.price,
      image: getProductImageUrl(product),
    });

    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleWishlistToggle = () => {
    const productId = getProductId(product);
    if (isLiked(productId)) {
      removeFromWishlist(productId);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Heart Button */}
      <div className="absolute top-3 right-3 z-10">
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleWishlistToggle();
          }}
          className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            size={14}
            className={`transition-colors ${
              isLiked(getProductId(product))
                ? "fill-red-500 text-red-500"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </motion.button>
      </div>

      {/* Image Container - 4:3 Ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Link href={`/products/${getProductSlug(product)}`}>
          <Image
            src={getProductImageUrl(product)}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${getProductSlug(product)}`}>
          <div className="space-y-2">
            {/* Category */}

            {/* Product Name */}
            <h3
              className="text-sm font-medium text-gray-900 group-hover:text-rich-brown transition-colors duration-300 leading-tight overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900 group-hover:text-rich-brown transition-colors duration-300">
                {formatPrice(product.price)}
              </p>

              {/* Add to Cart Button - Appears on Hover */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                className="flex-1 ml-3"
              >
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  disabled={isAddingToCart}
                  size="sm"
                  className="w-full h-8 bg-rich-brown text-white hover:bg-rich-brown/90 transition-all duration-200 text-xs"
                >
                  {isAddingToCart ? (
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ShoppingCart size={12} className="mr-1" />
                  )}
                  {isAddingToCart ? "" : "Add"}
                </Button>
              </motion.div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
