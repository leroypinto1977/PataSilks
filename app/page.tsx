import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { NewArrivalsSection } from "@/components/products/new-arrivals-section";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

async function getFeaturedProducts() {
  const supabase = createSupabaseAdminClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(name)
    `
    )
    .eq("active", true)
    .eq("featured", true)
    .eq("inStock", true)
    .order("createdAt", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return products || [];
}

async function getNewArrivals() {
  const supabase = createSupabaseAdminClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(name)
    `
    )
    .eq("active", true)
    .eq("newArrival", true)
    .eq("inStock", true)
    .order("createdAt", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }

  return products || [];
}

async function getCategories() {
  const supabase = createSupabaseAdminClient();

  const { data: categories, error } = await supabase.from("categories").select(`
      *,
      products!inner(id)
    `);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  // Count products for each category
  const categoriesWithCount =
    categories?.map((category) => ({
      ...category,
      _count: {
        products: category.products?.length || 0,
      },
    })) || [];

  return categoriesWithCount;
}

import { HeroSection } from "@/components/home/hero-section";
import { StorySection } from "@/components/home/story-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { OurStorySection } from "@/components/home/our-story-section";
import { CraftsmanshipSection } from "@/components/home/craftsmanship-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { CTASection } from "@/components/home/cta-section";
import { ProductGrid } from "@/components/products/product-grid";

export default async function HomePage() {
  // Mock products for now - replace with actual data fetching
  const products = [
    {
      id: "1",
      name: "Royal Silk Saree",
      price: 15999,
      images: [
        "https://images.pexels.com/photos/8105134/pexels-photo-8105134.jpeg",
      ],
      category: { name: "Silk" },
    },
    {
      id: "2",
      name: "Traditional Kanjeevaram",
      price: 25999,
      images: [
        "https://images.pexels.com/photos/6966644/pexels-photo-6966644.jpeg",
      ],
      category: { name: "Kanjeevaram" },
    },
    {
      id: "3",
      name: "Designer Silk Collection",
      price: 18999,
      images: [
        "https://images.pexels.com/photos/7262340/pexels-photo-7262340.jpeg",
      ],
      category: { name: "Designer" },
    },
    {
      id: "4",
      name: "Wedding Special",
      price: 35999,
      images: [
        "https://images.pexels.com/photos/8879441/pexels-photo-8879441.jpeg",
      ],
      category: { name: "Wedding" },
    },
    {
      id: "5",
      name: "Contemporary Silk",
      price: 12999,
      images: [
        "https://images.pexels.com/photos/6966629/pexels-photo-6966629.jpeg",
      ],
      category: { name: "Contemporary" },
    },
    {
      id: "6",
      name: "Heritage Collection",
      price: 29999,
      images: [
        "https://images.pexels.com/photos/8879456/pexels-photo-8879456.jpeg",
      ],
      category: { name: "Heritage" },
    },
  ];

  return (
    <main>
      <HeroSection />
      <WhyChooseUsSection />
      {/* <OurStorySection /> */}
      <StorySection />
      <CraftsmanshipSection />

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-primary-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              Featured
              <span className="bg-gradient-to-r from-primary-pink-400 to-rose-gold bg-clip-text text-transparent">
                {" "}
                Collections
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover our handpicked selection of exquisite silk sarees,
              perfect for every special occasion
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </main>
  );
}
