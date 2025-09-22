"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug?: string;
  category?: {
    name: string;
  };
  categories?: {
    name: string;
  };
  featured?: boolean;
  new_arrival?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder-product.jpg",
    });

    setTimeout(() => setIsAddingToCart(false), 500);
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
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
    >
      {/* Premium Badge */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-gradient-to-r from-primary-pink-300 to-rose-gold text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
        >
          {product.category?.name || product.categories?.name || "Traditional"}
        </motion.div>
      </div>

      {/* Heart Button */}
      <div className="absolute top-4 right-4 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Heart
            size={16}
            className={`transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </motion.button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary-pink-50 to-blush">
        <Image
          src={product.images[0] || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-pink-400 to-rose-gold text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </span>
            </motion.button>

            <Link href={`/products/${product.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
            transition={{ duration: 0.3 }}
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
        <Link href={`/products/${product.id}`}>
          <motion.h3 className="text-lg font-serif font-bold text-gray-900 line-clamp-2 group-hover:text-primary-pink-400 transition-colors cursor-pointer">
            {product.name}
          </motion.h3>
        </Link>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <motion.p className="text-2xl font-bold bg-gradient-to-r from-primary-pink-400 to-rose-gold bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </motion.p>
            <p className="text-sm text-gray-600">Free shipping</p>
          </div>

          <Link href={`/products/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-pink-100 to-blush hover:from-blush hover:to-rose-gold/20 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
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
              className="text-xs bg-primary-pink-100 text-gray-600 px-2 py-1 rounded-full"
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
