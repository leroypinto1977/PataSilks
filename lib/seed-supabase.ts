import { createSupabaseAdminClient } from "./supabase-server";

const supabase = createSupabaseAdminClient();

const sampleSareeImages = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594736797933-d0301ba5a65a?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566479179817-4e8c4c4c8e2b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594736797933-d0301ba5a65a?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop",
];

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Create categories
    const { data: categories, error: categoriesError } = await supabase
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
          {
            id: "cat_dupattas",
            name: "Dupattas",
            description: "Beautiful dupattas and scarves",
          },
        ],
        { onConflict: "id" }
      )
      .select();

    if (categoriesError) {
      console.error("Error creating categories:", categoriesError);
      return;
    }

    console.log("✅ Categories created");

    // Create sample products
    const products = [
      {
        id: "prod_royal_kanjivaram",
        name: "Royal Kanjivaram Silk Saree",
        description:
          "Exquisite handwoven Kanjivaram saree with intricate gold zari borders and traditional temple motifs. This masterpiece showcases the finest craftsmanship of Tamil Nadu artisans, featuring pure mulberry silk and genuine gold threads.",
        price: 25999,
        images: [sampleSareeImages[0], sampleSareeImages[1]],
        active: true,
        in_stock: true,
        stock_count: 15,
        fabric: "Pure Kanjivaram Silk",
        color: "Deep Maroon with Gold",
        occasion: "Wedding, Festival",
        tags: ["premium", "handwoven", "traditional", "wedding"],
        featured: true,
        new_arrival: false,
        category_id: "cat_sarees",
      },
      {
        id: "prod_banarasi_elegance",
        name: "Banarasi Elegance Silk Saree",
        description:
          "Pure Banarasi silk saree with opulent brocade work and silver zari. Woven with traditional techniques passed down through generations, this saree embodies the royal heritage of Varanasi.",
        price: 18999,
        images: [sampleSareeImages[2], sampleSareeImages[3]],
        active: true,
        in_stock: true,
        stock_count: 12,
        fabric: "Pure Banarasi Silk",
        color: "Royal Blue with Silver",
        occasion: "Wedding, Reception",
        tags: ["banarasi", "silk", "traditional", "premium"],
        featured: true,
        new_arrival: true,
        category_id: "cat_sarees",
      },
      {
        id: "prod_patola_masterpiece",
        name: "Patola Heritage Saree",
        description:
          "Authentic double ikat Patola saree from Gujarat, featuring geometric patterns and vibrant colors. Each saree takes months to complete and represents the pinnacle of Indian textile artistry.",
        price: 45999,
        images: [sampleSareeImages[4], sampleSareeImages[5]],
        active: true,
        in_stock: true,
        stock_count: 8,
        fabric: "Pure Silk Double Ikat",
        color: "Multi-color Traditional",
        occasion: "Wedding, Cultural Events",
        tags: ["patola", "heritage", "handwoven", "exclusive"],
        featured: true,
        new_arrival: false,
        category_id: "cat_sarees",
      },
      {
        id: "prod_contemporary_silk",
        name: "Contemporary Silk Saree",
        description:
          "Modern interpretation of traditional silk saree with contemporary prints and subtle embellishments. Perfect for the modern woman who appreciates both tradition and style.",
        price: 12999,
        images: [sampleSareeImages[6], sampleSareeImages[7]],
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
        id: "prod_tussar_natural",
        name: "Natural Tussar Silk Saree",
        description:
          "Handloom Tussar silk saree with natural texture and earthy tones. Hand-block printed with traditional motifs, this saree celebrates the beauty of natural fibers.",
        price: 8999,
        images: [sampleSareeImages[0], sampleSareeImages[2]],
        active: true,
        in_stock: true,
        stock_count: 25,
        fabric: "Pure Tussar Silk",
        color: "Natural Beige with Brown",
        occasion: "Casual, Office, Day Events",
        tags: ["tussar", "handloom", "natural", "eco-friendly"],
        featured: false,
        new_arrival: false,
        category_id: "cat_sarees",
      },
      {
        id: "prod_bridal_lehenga",
        name: "Bridal Heavy Lehenga Set",
        description:
          "Opulent bridal lehenga with heavy zardozi embroidery, sequins, and pearl work. Complete set includes lehenga, choli, and dupatta. A dream ensemble for your special day.",
        price: 65999,
        images: [sampleSareeImages[1], sampleSareeImages[3]],
        active: true,
        in_stock: true,
        stock_count: 6,
        fabric: "Silk with Heavy Embroidery",
        color: "Deep Red with Gold",
        occasion: "Wedding, Reception",
        tags: ["bridal", "heavy-work", "premium", "exclusive"],
        featured: true,
        new_arrival: true,
        category_id: "cat_lehengas",
      },
    ];

    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .upsert(products, { onConflict: "id" })
      .select();

    if (productsError) {
      console.error("Error creating products:", productsError);
      return;
    }

    console.log("✅ Products created");
    console.log("🎉 Database seeding completed successfully!");

    return { categories, products: productsData };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}
