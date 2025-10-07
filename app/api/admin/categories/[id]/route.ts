import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseAdminClient();
    const categoryId = params.id;

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    console.log("Deleting category:", categoryId);

    // Check if category has associated products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id")
      .eq("category_id", categoryId)
      .limit(1);

    if (productsError) {
      console.error("Error checking products:", productsError);
      return NextResponse.json(
        { error: "Failed to check associated products" },
        { status: 500 }
      );
    }

    if (products && products.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with associated products" },
        { status: 400 }
      );
    }

    // Delete the category
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (deleteError) {
      console.error("Error deleting category:", deleteError);
      return NextResponse.json(
        { error: `Failed to delete category: ${deleteError.message}` },
        { status: 500 }
      );
    }

    console.log("Category deleted successfully:", categoryId);
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in delete category API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseAdminClient();
    const categoryId = params.id;

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Get the category
    const { data: category, error: fetchError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (fetchError) {
      console.error("Error fetching category:", fetchError);
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("Error in get category API:", error);
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
  try {
    const supabase = createSupabaseAdminClient();
    const categoryId = params.id;

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Updating category:", categoryId, body);

    // Update the category
    const { data: category, error: updateError } = await supabase
      .from("categories")
      .update(body)
      .eq("id", categoryId)
      .select("*")
      .single();

    if (updateError) {
      console.error("Error updating category:", updateError);
      return NextResponse.json(
        { error: `Failed to update category: ${updateError.message}` },
        { status: 500 }
      );
    }

    console.log("Category updated successfully:", category);
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("Error in update category API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
