import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabaseAdmin = createSupabaseAdminClient();

    // Get all orders with user profiles and order items
    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select(
        `
        *,
        profiles(id, email, full_name),
        order_items(
          id,
          quantity,
          price,
          products(id, name, images)
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 }
      );
    }

    // Calculate totals for each order
    const ordersWithTotals = orders?.map((order) => ({
      ...order,
      itemCount: order.order_items?.length || 0,
      totalAmount:
        order.order_items?.reduce(
          (sum: number, item: any) => sum + item.quantity * item.price,
          0
        ) || 0,
    }));

    return NextResponse.json({ orders: ordersWithTotals });
  } catch (error) {
    console.error("Error in orders API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const {
      user_id,
      total,
      status = "PENDING",
      shipping_address,
      billing_address,
      payment_method,
      payment_status = "PENDING",
      items,
    } = await request.json();

    if (!user_id || !total || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();

    // Create the order
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id,
        total,
        status,
        shipping_address,
        billing_address,
        payment_method,
        payment_status,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      // Try to clean up the order if items failed
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { error: "Failed to create order items" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error in order creation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
