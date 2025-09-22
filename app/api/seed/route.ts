import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient();

    // Sample saree images from Unsplash
    const sampleImages = [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0301ba5a65a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-4e8c4c4c8e2b?w=800&auto=format&fit=crop",
    ];

    // Create categories
    const { data: categories, error: categoriesError } = await (supabase as any)
      .from("categories")
      .upsert(
        [
          {
            id: "cat_sarees",
            name: "Sarees",
            description: "Traditional and contemporary silk sarees",
          },
          {
            id: "cat_lehengas",
            name: "Lehengas",
            description: "Elegant lehengas for special occasions",
          },
          {
            id: "cat_blouses",
            name: "Blouses",
            description: "Designer blouses and cholis",
          },
        ],
        { onConflict: "id" }
      )
      .select();

    if (categoriesError) {
      console.error("Categories error:", categoriesError);
    }

    // Create sample products
    const { data: products, error: productsError } = await (supabase as any)
      .from("products")
      .upsert(
        [
          {
            id: "prod_royal_kanjivaram",
            name: "Royal Kanjivaram Silk Saree",
            description:
              "Exquisite handwoven Kanjivaram saree with intricate gold zari borders and traditional temple motifs. This masterpiece showcases the finest craftsmanship of Tamil Nadu artisans.",
            slug: "royal-kanjivaram-silk-saree",
            price: 25999,
            images: [sampleImages[0], sampleImages[1]],
            active: true,
            in_stock: true,
            stock_count: 15,
            fabric: "Pure Kanjivaram Silk",
            color: "Deep Maroon with Gold",
            occasion: "Wedding, Festival",
            tags: ["premium", "handwoven", "traditional"],
            featured: true,
            new_arrival: false,
            category_id: "cat_sarees",
          },
          {
            id: "prod_banarasi_elegance",
            name: "Banarasi Elegance Silk Saree",
            description:
              "Pure Banarasi silk saree with opulent brocade work and silver zari. Woven with traditional techniques passed down through generations.",
            slug: "banarasi-elegance-silk-saree",
            price: 18999,
            images: [sampleImages[2], sampleImages[3]],
            active: true,
            in_stock: true,
            stock_count: 12,
            fabric: "Pure Banarasi Silk",
            color: "Royal Blue with Silver",
            occasion: "Wedding, Reception",
            tags: ["banarasi", "silk", "traditional"],
            featured: true,
            new_arrival: true,
            category_id: "cat_sarees",
          },
          {
            id: "prod_patola_masterpiece",
            name: "Patola Heritage Saree",
            description:
              "Authentic double ikat Patola saree from Gujarat, featuring geometric patterns and vibrant colors. Each saree takes months to complete.",
            slug: "patola-heritage-saree",
            price: 45999,
            images: [sampleImages[4], sampleImages[0]],
            active: true,
            in_stock: true,
            stock_count: 8,
            fabric: "Pure Silk Double Ikat",
            color: "Multi-color Traditional",
            occasion: "Wedding, Cultural Events",
            tags: ["patola", "heritage", "handwoven"],
            featured: true,
            new_arrival: false,
            category_id: "cat_sarees",
          },
          {
            id: "prod_contemporary_silk",
            name: "Contemporary Silk Saree",
            description:
              "Modern interpretation of traditional silk saree with contemporary prints and subtle embellishments. Perfect for the modern woman.",
            slug: "contemporary-silk-saree",
            price: 12999,
            images: [sampleImages[1], sampleImages[2]],
            active: true,
            in_stock: true,
            stock_count: 20,
            fabric: "Art Silk",
            color: "Dusty Rose with Gold",
            occasion: "Office, Party, Festival",
            tags: ["contemporary", "modern", "versatile"],
            featured: false,
            new_arrival: true,
            category_id: "cat_sarees",
          },
          {
            id: "prod_bridal_lehenga",
            name: "Bridal Heavy Lehenga Set",
            description:
              "Opulent bridal lehenga with heavy zardozi embroidery, sequins, and pearl work. Complete set includes lehenga, choli, and dupatta.",
            slug: "bridal-heavy-lehenga-set",
            price: 65999,
            images: [sampleImages[3], sampleImages[4]],
            active: true,
            in_stock: true,
            stock_count: 6,
            fabric: "Silk with Heavy Embroidery",
            color: "Deep Red with Gold",
            occasion: "Wedding, Reception",
            tags: ["bridal", "heavy-work", "premium"],
            featured: true,
            new_arrival: true,
            category_id: "cat_lehengas",
          },
        ],
        { onConflict: "id" }
      )
      .select();

    if (productsError) {
      console.error("Products error:", productsError);
      return NextResponse.json(
        { error: "Failed to create products", details: productsError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Sample data created successfully!",
      categories: categories?.length || 0,
      products: products?.length || 0,
    });
  } catch (error) {
    console.error("Error creating sample data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
