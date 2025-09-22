"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  category: { name: string };
}

interface NewArrivalsSectionProps {
  initialProducts: Product[];
}

export function NewArrivalsSection({
  initialProducts,
}: NewArrivalsSectionProps) {
  const [products, setProducts] = useState(initialProducts);
  const [supabase] = useState(() => createSupabaseBrowserClient());

  useEffect(() => {
    // Subscribe to real-time updates for new arrivals
    const channel = supabase
      .channel("new-arrivals")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
          filter: "newArrival=eq.true",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            // Fetch the new product with category info
            const { data: newProduct } = await supabase
              .from("products")
              .select(
                `
                *,
                category:categories(name)
              `
              )
              .eq("id", payload.new.id)
              .eq("active", true)
              .eq("inStock", true)
              .single();

            if (newProduct) {
              setProducts((prev) => [newProduct, ...prev.slice(0, 7)]); // Keep only 8 products
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedProduct = payload.new as any;

            if (
              updatedProduct.newArrival &&
              updatedProduct.active &&
              updatedProduct.inStock
            ) {
              // Product was marked as new arrival
              const { data: productWithCategory } = await supabase
                .from("products")
                .select(
                  `
                  *,
                  category:categories(name)
                `
                )
                .eq("id", updatedProduct.id)
                .single();

              if (productWithCategory) {
                setProducts((prev) => {
                  const exists = prev.find(
                    (p) => p.id === productWithCategory.id
                  );
                  if (exists) {
                    return prev.map((p) =>
                      p.id === productWithCategory.id ? productWithCategory : p
                    );
                  } else {
                    return [productWithCategory, ...prev.slice(0, 7)];
                  }
                });
              }
            } else {
              // Product was removed from new arrivals or deactivated
              setProducts((prev) =>
                prev.filter((p) => p.id !== updatedProduct.id)
              );
            }
          } else if (payload.eventType === "DELETE") {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brown-900 mb-4">
            ✨ New Arrivals
          </h2>
          <p className="text-brown-700 text-lg max-w-2xl mx-auto">
            Fresh from our artisans - the latest additions to our exclusive
            collection
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                NEW
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products?newArrivals=true">
            <Button
              variant="outline"
              className="border-amber-200 hover:bg-amber-50"
            >
              View All New Arrivals
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
