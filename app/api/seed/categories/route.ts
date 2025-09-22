import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST() {
  try {
    const supabase = createSupabaseAdminClient();

    // Test categories to seed (without color field for now)
    const categories = [
      {
        name: "Silk Sarees",
        description: "Premium silk sarees for special occasions",
      },
      {
        name: "Cotton Sarees",
        description: "Comfortable cotton sarees for daily wear",
      },
      { name: "Designer Sarees", description: "Contemporary designer sarees" },
      {
        name: "Banarasi Sarees",
        description: "Traditional Banarasi silk sarees",
      },
      {
        name: "Wedding Sarees",
        description: "Special wedding collection sarees",
      },
      {
        name: "Georgette Sarees",
        description: "Light and elegant georgette sarees",
      },
    ];

    const results = [];

    for (const category of categories) {
      // Check if category already exists
      const { data: existing } = await supabase
        .from("categories")
        .select("id")
        .eq("name", category.name)
        .single();

      if (!existing) {
        // Create new category
        const { data, error } = await supabase
          .from("categories")
          .insert(category)
          .select()
          .single();

        if (error) {
          console.error(`Error creating category ${category.name}:`, error);
          results.push({
            category: category.name,
            status: "error",
            error: error.message,
          });
        } else {
          results.push({ category: category.name, status: "created", data });
        }
      } else {
        results.push({ category: category.name, status: "exists" });
      }
    }

    return NextResponse.json({ message: "Categories seeded", results });
  } catch (error) {
    console.error("Error seeding categories:", error);
    return NextResponse.json(
      { error: "Failed to seed categories" },
      { status: 500 }
    );
  }
}
