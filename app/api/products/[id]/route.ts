import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

const supabase = createSupabaseAdminClient();

async function checkAdminAuth() {
  const supabaseAuth = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: authError,
  } = await supabaseAuth.auth.getUser();

  if (authError || !user) {
    return { authorized: false, user: null };
  }

  // Check if user has admin role
  const { data: profile } = await supabaseAuth
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return { authorized: false, user: null };
  }

  return { authorized: true, user };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select(
        `
        *,
        category:categories(name)
      `
      )
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized } = await checkAdminAuth();

  if (!authorized) {
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
      sold,
    } = body;

    // Generate slug from name if name is updated
    const updateData: Record<string, any> = {
      description,
      price,
      categoryId,
      images: images || [],
      active,
      fabric,
      color,
      size,
      weight,
      occasion,
      tags: tags || [],
      featured,
      newArrival,
      inStock,
      stockCount,
      sold,
      updatedAt: new Date().toISOString(),
    };

    if (name) {
      updateData.name = name;
      updateData.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    }

    // If marking as sold, set soldAt timestamp
    if (sold && !inStock) {
      updateData.soldAt = new Date().toISOString();
    }

    const { data: product, error } = await supabase
      .from("products")
      .update(updateData as any)
      .eq("id", params.id)
      .select(
        `
        *,
        category:categories(name)
      `
      )
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized } = await checkAdminAuth();

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    const { data: product, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", params.id)
      .select(
        `
        *,
        category:categories(name)
      `
      )
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authorized } = await checkAdminAuth();

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
