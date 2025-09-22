import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const supabaseAdmin = createSupabaseAdminClient();

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select(
        `
        *,
        profiles(id, email, full_name),
        order_items(
          id,
          quantity,
          price,
          products(id, name, images, description)
        )
      `
      )
      .eq("id", orderId)
      .single();

    if (error) {
      console.error("Error fetching order:", error);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error in order fetch API:", error);
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
    const orderId = params.id;
    const updates = await request.json();

    // Validate status if provided
    if (
      updates.status &&
      ![
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ].includes(updates.status)
    ) {
      return NextResponse.json(
        { error: "Invalid status provided" },
        { status: 400 }
      );
    }

    // Validate payment_status if provided
    if (
      updates.payment_status &&
      !["PENDING", "PAID", "FAILED", "REFUNDED"].includes(
        updates.payment_status
      )
    ) {
      return NextResponse.json(
        { error: "Invalid payment status provided" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error("Error updating order:", error);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Order updated successfully",
      order: data,
    });
  } catch (error) {
    console.error("Error in order update API:", error);
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
    const orderId = params.id;
    const supabaseAdmin = createSupabaseAdminClient();

    // Delete order items first (if not using CASCADE)
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .delete()
      .eq("order_id", orderId);

    if (itemsError) {
      console.error("Error deleting order items:", itemsError);
      return NextResponse.json(
        { error: "Failed to delete order items" },
        { status: 500 }
      );
    }

    // Delete the order
    const { error: orderError } = await supabaseAdmin
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (orderError) {
      console.error("Error deleting order:", orderError);
      return NextResponse.json(
        { error: "Failed to delete order" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error in order deletion API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
