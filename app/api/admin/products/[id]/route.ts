import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createSupabaseAdminClient();
    const productId = params.id;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    console.log("Deleting product:", productId);

    // Delete the product
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (deleteError) {
      console.error("Error deleting product:", deleteError);
      return NextResponse.json(
        { error: `Failed to delete product: ${deleteError.message}` },
        { status: 500 }
      );
    }

    console.log("Product deleted successfully:", productId);
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in delete product API:", error);
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
    const productId = params.id;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Get the product
    const { data: product, error: fetchError } = await supabase
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
      .eq("id", productId)
      .single();

    if (fetchError) {
      console.error("Error fetching product:", fetchError);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error in get product API:", error);
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
    const productId = params.id;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Updating product:", productId, body);

    // Update the product
    const { data: product, error: updateError } = await supabase
      .from("products")
      .update(body)
      .eq("id", productId)
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

    if (updateError) {
      console.error("Error updating product:", updateError);
      return NextResponse.json(
        { error: `Failed to update product: ${updateError.message}` },
        { status: 500 }
      );
    }

    console.log("Product updated successfully:", product);
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error in update product API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
