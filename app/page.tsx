"use client";

import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { NewArrivalsSection } from "@/components/products/new-arrivals-section";
import { motion } from "framer-motion";
import { animations } from "@/lib/animations";
import { useEffect, useState } from "react";

function useProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("/api/products");
        if (productsResponse.ok) {
          const products = await productsResponse.json();
          setFeaturedProducts(
            products.filter((p: any) => p.featured).slice(0, 6)
          );
          setNewArrivals(
            products.filter((p: any) => p.new_arrival).slice(0, 6)
          );
        }

        // Fetch categories
        const categoriesResponse = await fetch("/api/categories");
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { featuredProducts, newArrivals, categories, loading };
}

import { HeroSection } from "@/components/home/hero-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductGrid } from "@/components/products/product-grid";

export default function HomePage() {
  const { featuredProducts, newArrivals, categories, loading } = useProducts();

  if (loading) {
    return (
      <main className="bg-premium-beige">
        <HeroSection />
        <div className="py-20 bg-premium-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
        <WhyChooseUsSection />
        <NewsletterSection />
      </main>
    );
  }

  return (
    <main className="bg-premium-beige">
      <HeroSection />

      {/* Featured Products Section */}
      <section className="py-20 bg-premium-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Featured <span className="text-rich-brown">Collections</span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Discover our handpicked selection of exquisite silk sarees,
              perfect for every special occasion
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <ProductGrid products={featuredProducts} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WhyChooseUsSection />
      <NewsletterSection />
    </main>
  );
}
