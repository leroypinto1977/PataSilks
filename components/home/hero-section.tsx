"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Sparkles, Crown, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-pink-50 via-blush to-primary-pink-200">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-pink-300/20 to-blush/20 rounded-full blur-xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-rose-gold/20 to-primary-pink-300/20 rounded-full blur-xl"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-blush/20 to-rose-gold/20 rounded-full blur-xl"
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className={`absolute ${
              i % 4 === 0
                ? "text-primary-pink-400"
                : i % 4 === 1
                ? "text-primary-pink-600"
                : i % 4 === 2
                ? "text-rose-gold"
                : "text-primary-pink-300"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles size={20} />
            ) : i % 3 === 1 ? (
              <Star size={16} />
            ) : (
              <Crown size={18} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Premium Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-pink-100 to-blush border border-primary-pink-200 rounded-full px-6 py-3"
              >
                <Crown className="text-primary-pink-600" size={20} />
                <span className="text-primary-pink-700 font-semibold">
                  Premium Heritage Collection
                </span>
                <Sparkles className="text-primary-pink-600" size={16} />
              </motion.div>

              {/* Main Heading with Gradient Text */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-primary-pink-700 to-primary-pink-800 bg-clip-text text-transparent">
                  Timeless
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary-pink-600 via-primary-pink-700 to-rose-gold bg-clip-text text-transparent">
                  Elegance
                </span>
                <br />
                <span className="text-gray-900">in Every Thread</span>
              </h1>

              {/* Description with Enhanced Typography */}
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                Discover our{" "}
                <span className="font-semibold text-primary-pink-700">
                  exquisite collection
                </span>{" "}
                of handwoven silk sarees, lehengas, and traditional textiles
                crafted by
                <span className="font-semibold text-primary-pink-700">
                  {" "}
                  master artisans
                </span>{" "}
                with centuries of heritage.
              </p>
            </motion.div>

            {/* Action Buttons with Hover Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary-pink-600 to-primary-pink-700 hover:from-primary-pink-700 hover:to-primary-pink-800 text-white shadow-lg"
                  >
                    <Gift className="mr-2" size={20} />
                    Explore Collection
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/products?newArrivals=true">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary-pink-300 text-primary-pink-700 hover:bg-gradient-to-r hover:from-primary-pink-50 hover:to-blush"
                  >
                    <Sparkles className="mr-2" size={20} />
                    New Arrivals
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Social Proof with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center space-x-8 pt-6"
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Star
                        size={24}
                        className="fill-primary-pink-400 text-primary-pink-400"
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-gray-800 font-bold text-lg ml-3">
                  4.9/5
                </span>
              </div>
              <div className="text-gray-700">
                <span className="font-bold text-2xl bg-gradient-to-r from-primary-pink-600 to-primary-pink-700 bg-clip-text text-transparent">
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
            {/* Main Image with Enhanced Effects */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary-pink-100 via-blush to-primary-pink-300 shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg"
                alt="Luxury silk saree collection"
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Cards with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-primary-pink-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Premium Quality
                  </p>
                  <p className="text-xs text-gray-600">Handwoven Excellence</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-primary-pink-100"
            >
              <div className="flex items-center space-x-3">
                <Crown className="text-primary-pink-600" size={24} />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Heritage Craft
                  </p>
                  <p className="text-xs text-gray-600">Since 1850</p>
                </div>
              </div>
            </motion.div>

            {/* Additional Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-1/4 -left-4 bg-gradient-to-r from-primary-pink-500 to-primary-pink-700 text-white rounded-full p-4 shadow-lg"
            >
              <Sparkles size={20} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 text-white">
          <path
            fill="currentColor"
            d="M0,64L120,69.3C240,75,480,85,720,80C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
