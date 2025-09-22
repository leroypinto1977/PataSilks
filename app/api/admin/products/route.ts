import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();

    // Get all products with pagination (admin access, no auth needed)
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name
        )
      `
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (productsError) {
      console.error("Error fetching products:", productsError);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    // Get total count for pagination
    const { count, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Error counting products:", countError);
    }

    return NextResponse.json({
      products: products || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseAdminClient();

    const body = await request.json();
    console.log("Received product data:", body);

    const {
      name,
      description,
      price,
      images,
      category_id,
      fabric,
      color,
      size,
      weight,
      occasion,
      stock_count,
      tags,
      featured,
      active,
    } = body;

    // Validate required fields
    if (!name || !price || !category_id) {
      console.log("Validation failed:", { name, price, category_id });
      return NextResponse.json(
        {
          error: "Missing required fields: name, price, category_id",
        },
        { status: 400 }
      );
    }

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const insertData = {
      name,
      description,
      price: parseFloat(price),
      images: images || [],
      category_id,
      fabric,
      color,
      size,
      weight,
      occasion,
      stock_count: stock_count ? parseInt(stock_count) : 1,
      tags: tags || [],
      featured: featured || false,
      active: active !== false, // Default to true
      slug,
      in_stock: true, // Default to in stock
    };

    console.log("Inserting product:", insertData);

    // Insert product
    const { data: product, error: insertError } = await supabase
      .from("products")
      .insert(insertData)
      .select(
        `
        *,
        categories (
          id,
          name
        )
      `
      )
      .single();

    if (insertError) {
      console.error("Error creating product:", insertError);
      return NextResponse.json(
        { error: `Failed to create product: ${insertError.message}` },
        { status: 500 }
      );
    }

    console.log("Product created successfully:", product);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error in create product API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
