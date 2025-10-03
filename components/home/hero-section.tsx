"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-premium-beige to-warm-beige">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-rich-beige/10 border border-rich-beige/20 rounded-full px-6 py-3"
              >
                <Sparkles className="text-rich-beige" size={20} />
                <span className="text-rich-beige font-semibold">
                  Premium Heritage Collection
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-gray-900">Timeless</span>
                <br />
                <span className="text-rich-beige">Elegance</span>
                <br />
                <span className="text-gray-800">in Every Thread</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-gray-700 leading-relaxed max-w-lg"
              >
                Discover our exquisite collection of handwoven silk sarees,
                lehengas, and traditional textiles crafted by master artisans
                with centuries of heritage.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rich-beige text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                >
                  Explore Collection
                  <ArrowRight size={20} className="ml-2" />
                </motion.button>
              </Link>
              <Link href="/products?newArrivals=true">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-rich-beige text-rich-beige px-8 py-4 rounded-full font-semibold hover:bg-rich-beige hover:text-white transition-all duration-300 flex items-center"
                >
                  <Sparkles className="mr-2" size={20} />
                  New Arrivals
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center space-x-8 pt-6"
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-rich-beige text-rich-beige"
                    />
                  ))}
                </div>
                <span className="text-gray-800 font-bold text-lg ml-3">
                  4.9/5
                </span>
              </div>
              <div className="text-gray-700">
                <span className="font-bold text-2xl text-rich-beige">
                  15,000+
                </span>
                <br />
                <span className="text-sm">Happy Customers</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-warm-beige to-premium-beige shadow-2xl"
            >
              <Image
                src="https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg"
                alt="Luxury silk saree collection"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-rich-beige/20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Premium Quality
                  </p>
                  <p className="text-xs text-gray-600">Handwoven Excellence</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-rich-beige/20"
            >
              <div className="flex items-center space-x-3">
                <Sparkles className="text-rich-beige" size={24} />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Heritage Craft
                  </p>
                  <p className="text-xs text-gray-600">Since 1850</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
