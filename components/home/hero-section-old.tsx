"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, Crown } from "lucide-react";
import { PerformantButton } from "@/components/ui/performant-button";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-300/20 to-orange-300/20 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-xl" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-xl" />
      </div>

      {/* Simplified Decorative Elements - Static for Performance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${
              i % 3 === 0
                ? "text-amber-400"
                : i % 3 === 1
                ? "text-orange-400"
                : "text-purple-400"
            } opacity-30`}
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
          </div>
        ))}
      </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur rounded-full text-amber-700 font-medium text-sm shadow-sm mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                New Collection Available
              </div>

              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                <span className="block text-brown-900">Exquisite</span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-purple-600 bg-clip-text text-transparent">
                  Silk Sarees
                </span>
                <span className="block text-brown-900">Collection</span>
              </h1>

              <p className="text-xl text-brown-700 leading-relaxed max-w-xl">
                Discover the finest handwoven silk sarees crafted by master
                artisans. Each piece tells a story of tradition, elegance, and
                timeless beauty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="space-y-3">
                <PerformantButton size="lg" className="group">
                  <Sparkles className="mr-2" size={20} />
                  Special Offer - 25% Off
                </PerformantButton>
              </div>

              <div className="space-y-3">
                <PerformantButton 
                  variant="secondary" 
                  size="lg"
                  className="group"
                >
                  <Link href="/products" className="flex items-center">
                    Explore Collection
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" size={20} />
                  </Link>
                </PerformantButton>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                <p className="text-brown-600 text-sm">Premium Designs</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                <p className="text-brown-600 text-sm">Master Artisans</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                <p className="text-brown-600 text-sm">Years Heritage</p>
              </div>
            </div>
          </div>" "}
                <span className="font-semibold text-amber-700">
                  exquisite collection
                </span>{" "}
                of handwoven silk sarees, lehengas, and traditional textiles
                crafted by
                <span className="font-semibold text-amber-700">
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
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
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
                    className="border-2 border-amber-300 text-amber-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50"
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
                        className="fill-amber-400 text-amber-400"
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-brown-800 font-bold text-lg ml-3">
                  4.9/5
                </span>
              </div>
              <div className="text-brown-700">
                <span className="font-bold text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
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
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 shadow-2xl"
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
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-amber-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-bold text-brown-900">
                    Premium Quality
                  </p>
                  <p className="text-xs text-brown-600">Handwoven Excellence</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-purple-100"
            >
              <div className="flex items-center space-x-3">
                <Crown className="text-purple-600" size={24} />
                <div>
                  <p className="text-sm font-bold text-brown-900">
                    Heritage Craft
                  </p>
                  <p className="text-xs text-brown-600">Since 1850</p>
                </div>
              </div>
            </motion.div>

            {/* Additional Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-1/4 -left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full p-4 shadow-lg"
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
