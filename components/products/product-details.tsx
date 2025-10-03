"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { SanityProduct } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface ProductDetailsProps {
  product: SanityProduct;
}

// Helper function to safely get product image URL
function getProductImageUrl(product: SanityProduct): string {
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
          return urlFor(image).width(400).height(500).url();
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

export function ProductDetails({ product }: ProductDetailsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: getProductImageUrl(product),
    });

    setTimeout(() => setIsAddingToCart(false), 1000);
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
    <div className="space-y-6">
      {/* Category Badge */}
      <div className="flex gap-2 flex-wrap">
        <Badge
          variant="secondary"
          className="bg-rich-beige/10 text-rich-beige hover:bg-rich-beige/20"
        >
          {product.category.name}
        </Badge>
        {product.newArrival && (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            New Arrival
          </Badge>
        )}
        {product.featured && (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Featured
          </Badge>
        )}
      </div>

      {/* Product Title */}
      <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-center space-x-4">
        <p className="text-3xl font-bold text-rich-beige">
          {formatPrice(product.price)}
        </p>
        {product.originalPrice && product.originalPrice > product.price && (
          <>
            <p className="text-gray-600 line-through">
              {formatPrice(product.originalPrice)}
            </p>
            <Badge variant="destructive">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Product Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-rich-beige/5 rounded-lg">
            <div className="w-8 h-8 bg-rich-beige/20 rounded-full flex items-center justify-center">
              <span className="text-rich-beige text-sm">✨</span>
            </div>
            <span className="text-gray-800 font-medium">100% Authentic</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-rich-beige/5 rounded-lg">
            <div className="w-8 h-8 bg-rich-beige/20 rounded-full flex items-center justify-center">
              <span className="text-rich-beige text-sm">🏺</span>
            </div>
            <span className="text-gray-800 font-medium">Handcrafted</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-rich-beige/5 rounded-lg">
            <div className="w-8 h-8 bg-rich-beige/20 rounded-full flex items-center justify-center">
              <span className="text-rich-beige text-sm">🧵</span>
            </div>
            <span className="text-gray-800 font-medium">
              {product.fabric || "Pure Silk"}
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-rich-beige/5 rounded-lg">
            <div className="w-8 h-8 bg-rich-beige/20 rounded-full flex items-center justify-center">
              <span className="text-rich-beige text-sm">🎨</span>
            </div>
            <span className="text-gray-800 font-medium">
              {product.color || "Traditional Colors"}
            </span>
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            product.stockCount > 0 ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <span
          className={`font-medium ${
            product.stockCount > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          {product.stockCount > 0
            ? `In Stock (${product.stockCount} available)`
            : "Out of Stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          size="lg"
          className="luxury-button flex-1"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart size={20} className="mr-2" />
          {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-rich-beige/20 hover:bg-rich-beige/5"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            size={20}
            className={`mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
          {isLiked ? "Loved" : "Add to Wishlist"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-rich-beige/20 hover:bg-rich-beige/5"
        >
          <Share2 size={20} className="mr-2" />
          Share
        </Button>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-rich-beige/10">
        <div className="text-center p-4 bg-rich-beige/5 rounded-xl">
          <p className="text-sm font-medium text-gray-900">Free Shipping</p>
          <p className="text-xs text-gray-700">On orders above ₹5,000</p>
        </div>
        <div className="text-center p-4 bg-rich-beige/5 rounded-xl">
          <p className="text-sm font-medium text-gray-900">Easy Returns</p>
          <p className="text-xs text-gray-700">7-day return policy</p>
        </div>
      </div>
    </div>
  );
}
