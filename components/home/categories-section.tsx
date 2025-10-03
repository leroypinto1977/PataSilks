"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: any;
  featured?: boolean;
  productCount?: number;
}

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const featuredCategories = categories
    .filter((cat) => cat.featured)
    .slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Shop by
            <span className="text-rich-beige"> Category</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our curated collections of premium silk textiles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/products?category=${category.slug.current}`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-warm-beige to-premium-beige shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {category.image ? (
                    <Image
                      src={category.image.asset.url}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-warm-beige to-premium-beige flex items-center justify-center">
                      <span className="text-4xl font-bold text-rich-beige">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-3">
                      {category.productCount || 0} products
                    </p>
                    <div className="flex items-center text-sm font-medium">
                      Shop Now
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rich-beige text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Categories
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
