import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    console.log("Creating payment order...");
    const { items, shippingAddress, customerDetails } = await request.json();

    console.log("Request data:", { items, shippingAddress, customerDetails });

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("No items provided");
      return NextResponse.json(
        { error: "Items are required" },
        { status: 400 }
      );
    }

    if (!shippingAddress || !customerDetails) {
      console.error("Missing shipping address or customer details");
      return NextResponse.json(
        { error: "Shipping address and customer details are required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    // Calculate total amount
    let totalAmount = 0;
    const productDetails = [];

    for (const item of items) {
      const { data: product, error } = await supabase
        .from("products")
        .select("id, name, price, slug, stock_count, active")
        .eq("id", item.id)
        .single();

      if (error || !product || !(product as any).active) {
        return NextResponse.json(
          { error: `Product ${item.id} not found or inactive` },
          { status: 400 }
        );
      }

      const productData = product as any;

      if (productData.stock_count < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${productData.name}` },
          { status: 400 }
        );
      }

      const itemTotal = productData.price * item.quantity;
      totalAmount += itemTotal;

      productDetails.push({
        productId: productData.id,
        productName: productData.name,
        productSlug: productData.slug,
        quantity: item.quantity,
        price: productData.price,
        total: itemTotal,
      });
    }

    console.log("Creating Razorpay order with amount:", totalAmount);

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(totalAmount);
    console.log("Razorpay order created:", razorpayOrder);

    // Store order data in session for later use
    const orderData = {
      razorpayOrderId: razorpayOrder.id,
      totalAmount,
      items: productDetails,
      shippingAddress,
      customerDetails,
    };

    console.log("Order data prepared:", orderData);

    return NextResponse.json({
      success: true,
      order: razorpayOrder,
      orderData,
    });
  } catch (error) {
    console.error("Error creating payment order:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
