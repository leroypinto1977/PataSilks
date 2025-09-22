import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = params.id;
    const supabaseAdmin = createSupabaseAdminClient();

    const { data: category, error } = await supabaseAdmin
      .from("categories")
      .select(
        `
        *,
        products(
          id,
          name,
          price,
          images,
          active,
          in_stock,
          featured,
          created_at
        )
      `
      )
      .eq("id", categoryId)
      .single();

    if (error) {
      console.error("Error fetching category:", error);
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error in category fetch API:", error);
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
  try {
    const categoryId = params.id;
    const updates = await request.json();

    const supabaseAdmin = createSupabaseAdminClient();

    // If name is being updated, check for duplicates
    if (updates.name) {
      const { data: existing, error: checkError } = await supabaseAdmin
        .from("categories")
        .select("id")
        .eq("name", updates.name)
        .neq("id", categoryId)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
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
    }

    const { data, error } = await supabaseAdmin
      .from("categories")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", categoryId)
      .select()
      .single();

    if (error) {
      console.error("Error updating category:", error);
      return NextResponse.json(
        { error: "Failed to update category" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Category updated successfully",
      category: data,
    });
  } catch (error) {
    console.error("Error in category update API:", error);
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
  try {
    const categoryId = params.id;
    const supabaseAdmin = createSupabaseAdminClient();

    // Check if category has products
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id")
      .eq("category_id", categoryId)
      .limit(1);

    if (productsError) {
      console.error("Error checking category products:", productsError);
      return NextResponse.json(
        { error: "Failed to check category products" },
        { status: 500 }
      );
    }

    if (products && products.length > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete category with existing products. Please move or delete the products first.",
        },
        { status: 409 }
      );
    }

    // Delete the category
    const { error } = await supabaseAdmin
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (error) {
      console.error("Error deleting category:", error);
      return NextResponse.json(
        { error: "Failed to delete category" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in category deletion API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
