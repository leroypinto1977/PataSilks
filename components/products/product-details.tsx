"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/lib/wishlist-context";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  category: {
    name: string;
    id?: string;
  };
  category_id?: string;
  fabric: string;
  color: string;
  featured?: boolean;
  new_arrival?: boolean;
  active: boolean;
  in_stock: boolean;
  stock_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Convert Product to WishlistProduct format
function convertToWishlistProduct(product: Product) {
  return {
    _id: product.id, // Use id as _id for compatibility
    id: product.id,
    name: product.name,
    slug: product.slug, // Keep as string
    description: product.description,
    price: product.price,
    images: product.images, // Keep as string array
    category: {
      _id: product.category_id || product.category.id || "",
      id: product.category_id || product.category.id || "",
      name: product.category.name,
      slug: product.category.name.toLowerCase(), // Keep as string
    },
    fabric: product.fabric,
    color: product.color,
    featured: product.featured,
    newArrival: product.new_arrival,
    new_arrival: product.new_arrival,
  };
}

interface ProductDetailsProps {
  product: Product;
}

// Helper function to safely get product image URL
function getProductImageUrl(product: Product): string {
  try {
    if (product.images && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
  } catch (error) {
    console.warn("Error processing product image:", error);
  }
  return "/placeholder-product.jpg";
}

// Helper function to safely get product ID
function getProductId(product: Product): string {
  return product.id;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("Free Size");
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

    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleWishlistToggle = () => {
    if (isLiked(getProductId(product))) {
      removeFromWishlist(getProductId(product));
    } else {
      addToWishlist(convertToWishlistProduct(product));
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Product Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Badge
            variant="secondary"
            className="bg-rich-brown/10 text-rich-brown border-rich-brown/20"
          >
            {product.category.name}
          </Badge>
          {product.featured && (
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-800 border-amber-200"
            >
              Featured
            </Badge>
          )}
          {product.new_arrival && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200"
            >
              New Arrival
            </Badge>
          )}
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-yellow-400 fill-current"
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">(4.8) • 124 reviews</span>
        </div>

        {/* Price */}
        <div className="text-3xl font-bold text-gray-900 mb-6">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            <strong>Fabric:</strong> {product.fabric}
          </span>
          <span>
            <strong>Color:</strong> {product.color}
          </span>
        </div>

        {product.stock_count > 0 ? (
          <div className="text-green-600 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {product.stock_count} in stock
          </div>
        ) : (
          <div className="text-red-600 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Out of stock
          </div>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || !product.in_stock}
            className="flex-1 bg-rich-brown text-white hover:bg-rich-brown/90 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart size={18} className="mr-2" />
                {product.in_stock ? "Add to Cart" : "Out of Stock"}
              </>
            )}
          </Button>

          <Button
            onClick={handleWishlistToggle}
            variant="outline"
            className="w-12 h-12 border-rich-brown/30 hover:border-rich-brown hover:bg-rich-brown/5"
          >
            <Heart
              size={20}
              className={`transition-colors ${
                isLiked(getProductId(product))
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </Button>

          <Button
            variant="outline"
            className="w-12 h-12 border-rich-brown/30 hover:border-rich-brown hover:bg-rich-brown/5"
          >
            <Share2 size={20} className="text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rich-brown/10 rounded-full flex items-center justify-center">
            <Truck size={18} className="text-rich-brown" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Free Shipping</p>
            <p className="text-gray-600 text-xs">On orders over ₹5,000</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rich-brown/10 rounded-full flex items-center justify-center">
            <Shield size={18} className="text-rich-brown" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              Secure Payment
            </p>
            <p className="text-gray-600 text-xs">100% secure checkout</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rich-brown/10 rounded-full flex items-center justify-center">
            <RotateCcw size={18} className="text-rich-brown" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Easy Returns</p>
            <p className="text-gray-600 text-xs">30-day return policy</p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">SKU:</span>
            <span className="ml-2 font-medium">
              {product.id.slice(-8).toUpperCase()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Added:</span>
            <span className="ml-2 font-medium">
              {formatDate(product.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
