import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabaseAdmin = createSupabaseAdminClient();

    // Get all categories with product count
    const { data: categories, error } = await supabaseAdmin
      .from("categories")
      .select(
        `
        *,
        products(count)
      `
      )
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: 500 }
      );
    }

    // Transform the data to include product count
    const categoriesWithCount = categories?.map((category) => ({
      ...category,
      productCount: category.products?.[0]?.count || 0,
    }));

    return NextResponse.json({ categories: categoriesWithCount });
  } catch (error) {
    console.error("Error in categories API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();

    // Check if category with this name already exists
    const { data: existing, error: checkError } = await supabaseAdmin
      .from("categories")
      .select("id")
      .eq("name", name)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "not found" error
      console.error("Error checking existing category:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing category" },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        { error: "Category with this name already exists" },
        { status: 409 }
      );
    }

    // Create the category
    const { data: category, error } = await supabaseAdmin
      .from("categories")
      .insert({
        name,
        description,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      return NextResponse.json(
        { error: "Failed to create category" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error in category creation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
