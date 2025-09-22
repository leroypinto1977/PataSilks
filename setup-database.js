// Database setup script for Supabase
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

async function setupDatabase() {
  console.log("🚀 Setting up Supabase database for Patta Silks...");

  if (!supabaseUrl || !supabaseSecretKey) {
    console.error("❌ Missing Supabase configuration!");
    console.log("Please add to your .env file:");
    console.log("SUPABASE_SECRET_KEY=sb_secret_... (from Supabase dashboard)");
    console.log("OR SUPABASE_SERVICE_ROLE_KEY=eyJ... (service_role JWT)");
    return false;
  }

  const supabase = createClient(supabaseUrl, supabaseSecretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    console.log("📋 Creating database schema...");

    // Create categories table
    const { error: categoriesError } = await supabase.rpc("sql", {
      query: `
        CREATE TABLE IF NOT EXISTS categories (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    });

    // Create products table
    const { error: productsError } = await supabase.rpc("sql", {
      query: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price INTEGER NOT NULL,
          images TEXT[] DEFAULT '{}',
          active BOOLEAN DEFAULT true,
          "inStock" BOOLEAN DEFAULT true,
          "stockCount" INTEGER DEFAULT 1,
          sold BOOLEAN DEFAULT false,
          "soldAt" TIMESTAMP WITH TIME ZONE,
          fabric VARCHAR(255),
          color VARCHAR(255),
          size VARCHAR(100),
          weight VARCHAR(100),
          occasion VARCHAR(255),
          slug VARCHAR(255) UNIQUE,
          tags TEXT[] DEFAULT '{}',
          featured BOOLEAN DEFAULT false,
          "newArrival" BOOLEAN DEFAULT false,
          "categoryId" UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    });

    if (categoriesError || productsError) {
      console.log(
        "ℹ️  Tables might already exist, trying direct table creation..."
      );
    }

    // Insert sample categories
    console.log("📦 Adding sample categories...");
    const { error: insertCategoriesError } = await supabase
      .from("categories")
      .upsert(
        [
          {
            name: "Sarees",
            description:
              "Traditional Indian silk sarees with intricate designs",
          },
          {
            name: "Lehengas",
            description: "Elegant lehengas for special occasions",
          },
          {
            name: "Dress Materials",
            description: "Premium fabric sets for custom tailoring",
          },
          {
            name: "Accessories",
            description: "Traditional jewelry and accessories",
          },
        ],
        { onConflict: "name" }
      );

    if (insertCategoriesError) {
      console.log(
        "⚠️  Categories insert result:",
        insertCategoriesError.message
      );
    } else {
      console.log("✅ Categories created successfully!");
    }

    // Get category ID for sample products
    const { data: sareeCategory } = await supabase
      .from("categories")
      .select("id")
      .eq("name", "Sarees")
      .single();

    if (sareeCategory) {
      console.log("🧵 Adding sample products...");
      const { error: insertProductsError } = await supabase
        .from("products")
        .upsert(
          [
            {
              name: "Royal Banarasi Silk Saree",
              description:
                "Exquisite handwoven Banarasi silk saree with gold zari work. Perfect for weddings and special occasions.",
              price: 25000,
              images: [
                "https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg",
              ],
              fabric: "Pure Silk",
              color: "Deep Red",
              occasion: "Wedding",
              featured: true,
              newArrival: true,
              categoryId: sareeCategory.id,
              slug: "royal-banarasi-silk-saree",
            },
            {
              name: "Elegant Kanjivaram Silk",
              description:
                "Traditional Kanjivaram silk saree with temple border design and rich color combination.",
              price: 32000,
              images: [
                "https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg",
              ],
              fabric: "Kanjivaram Silk",
              color: "Golden Yellow",
              occasion: "Festival",
              featured: true,
              newArrival: true,
              categoryId: sareeCategory.id,
              slug: "elegant-kanjivaram-silk",
            },
          ],
          { onConflict: "slug" }
        );

      if (insertProductsError) {
        console.log("⚠️  Products insert result:", insertProductsError.message);
      } else {
        console.log("✅ Sample products created successfully!");
      }
    }

    // Test the final setup
    console.log("🧪 Testing final setup...");
    const { data: testData, error: testError } = await supabase
      .from("products")
      .select(
        `
        id, name, price,
        category:categories(name)
      `
      )
      .limit(2);

    if (testError) {
      console.error("❌ Final test failed:", testError.message);
      return false;
    }

    console.log("✅ Database setup complete!");
    console.log("📊 Sample data:", testData);
    console.log("\n🎉 Your Patta Silks database is ready!");
    console.log("🌐 You can now run: npm run dev");

    return true;
  } catch (error) {
    console.error("❌ Setup failed:", error);
    return false;
  }
}

// Run the setup
setupDatabase().then((success) => {
  process.exit(success ? 0 : 1);
});
