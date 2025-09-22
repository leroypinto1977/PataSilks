import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

const supabase = createSupabaseAdminClient();

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
        *,
        category:categories(name)
      `
      )
      .eq("active", true)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(products || []);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabaseAuth = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: authError,
  } = await supabaseAuth.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has admin role
  const { data: profile } = await supabaseAuth
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      categoryId,
      images,
      active,
      fabric,
      color,
      size,
      weight,
      occasion,
      tags,
      featured,
      newArrival,
      inStock,
      stockCount,
    } = body;

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    const { data: product, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          categoryId,
          images: images || [],
          active: active ?? true,
          fabric,
          color,
          size,
          weight,
          occasion,
          tags: tags || [],
          featured: featured ?? false,
          newArrival: newArrival ?? true,
          inStock: inStock ?? true,
          stockCount: stockCount ?? 1,
          slug,
        },
      ])
      .select(
        `
        *,
        category:categories(name)
      `
      )
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
