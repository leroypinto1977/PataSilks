import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { NewArrivalsSection } from "@/components/products/new-arrivals-section";
import { client, productQueries } from "@/lib/sanity";
import { SanityProductPreview } from "@/types/sanity";

async function getFeaturedProducts(): Promise<SanityProductPreview[]> {
  try {
    const products = await client.fetch(productQueries.featured);
    return products || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

async function getNewArrivals(): Promise<SanityProductPreview[]> {
  try {
    const products = await client.fetch(productQueries.newArrivals);
    return products || [];
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await client.fetch(`
      *[_type == "category" && active == true] | order(sortOrder asc, name asc) {
        _id,
        name,
        slug,
        description,
        image,
        featured,
        "productCount": count(*[_type == "product" && category._ref == ^._id && active == true])
      }
    `);
    return categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

import { HeroSection } from "@/components/home/hero-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductGrid } from "@/components/products/product-grid";

export default async function HomePage() {
  // Fetch data from Sanity
  const [featuredProducts, newArrivals, categories] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getCategories(),
  ]);

  return (
    <main className="bg-premium-beige">
      <HeroSection />

      {/* Featured Products Section */}
      <section className="py-20 bg-premium-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured
              <span className="text-rich-beige"> Collections</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover our handpicked selection of exquisite silk sarees,
              perfect for every special occasion
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <WhyChooseUsSection />
      <NewsletterSection />
    </main>
  );
}
