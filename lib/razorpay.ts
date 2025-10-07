import Razorpay from "razorpay";
import { createSupabaseServerClient } from "./supabase-server";

// Initialize Razorpay instance
console.log("Initializing Razorpay with key:", process.env.RAZORPAY_KEY_ID);

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("Razorpay credentials not found in environment variables");
  console.error(
    "RAZORPAY_KEY_ID:",
    process.env.RAZORPAY_KEY_ID ? "present" : "missing"
  );
  console.error(
    "RAZORPAY_KEY_SECRET:",
    process.env.RAZORPAY_KEY_SECRET ? "present" : "missing"
  );
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Create Razorpay order
export async function createRazorpayOrder(
  amount: number,
  currency: string = "INR"
) {
  try {
    console.log("Creating Razorpay order with amount:", amount);
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    console.log("Razorpay options:", options);
    const order = await razorpay.orders.create(options);
    console.log("Razorpay order created successfully:", order);
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create payment order");
  }
}

// Verify payment signature
export function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean {
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return expectedSignature === razorpaySignature;
}

// Create order in database
export async function createOrder(orderData: {
  email: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  billingAddress?: string;
  totalAmount: number;
  items: Array<{
    productId: string;
    productName: string;
    productSlug: string;
    quantity: number;
    price: number;
  }>;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
}) {
  const supabase = createSupabaseServerClient();

  try {
    console.log("Creating order in database with data:", orderData);

    // Start transaction-like operation
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        email: orderData.email,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        shipping_address: orderData.shippingAddress,
        billing_address: orderData.billingAddress || orderData.shippingAddress,
        total_amount: orderData.totalAmount,
        payment_method: "razorpay",
        payment_status: orderData.razorpayPaymentId ? "PAID" : "PENDING",
        payment_id: orderData.razorpayPaymentId,
        status: orderData.razorpayPaymentId ? "CONFIRMED" : "PENDING",
      } as any)
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw new Error("Failed to create order");
    }

    console.log("Order created successfully:", order);

    // Insert order items
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_slug: item.productSlug,
      quantity: item.quantity,
      price: item.price,
    }));

    console.log("Creating order items:", orderItems);

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems as any);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      throw new Error("Failed to create order items");
    }

    console.log("Order items created successfully");

    // Update product stock
    console.log("Updating product stock for items:", orderData.items);
    for (const item of orderData.items) {
      console.log(
        `Updating stock for product ${item.productId}, quantity: ${item.quantity}`
      );

      // Get current stock first
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("stock_count")
        .eq("id", item.productId)
        .single();

      if (!fetchError && product) {
        const newStock = Math.max(0, product.stock_count - item.quantity);
        console.log(
          `Product ${item.productId}: ${product.stock_count} -> ${newStock}`
        );

        const { error: stockError } = await supabase
          .from("products")
          .update({
            stock_count: newStock,
          } as any)
          .eq("id", item.productId);

        if (stockError) {
          console.error("Error updating stock:", stockError);
          // Continue with other items even if one fails
        } else {
          console.log(
            `Stock updated successfully for product ${item.productId}`
          );
        }
      } else {
        console.error(`Failed to fetch product ${item.productId}:`, fetchError);
      }
    }

    return order;
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
}

// Update order payment status
export async function updateOrderPayment(
  orderId: string,
  paymentId: string,
  paymentStatus: "PAID" | "FAILED" | "REFUNDED"
) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("orders")
    .update({
      payment_id: paymentId,
      payment_status: paymentStatus,
      status: paymentStatus === "PAID" ? "CONFIRMED" : "PENDING",
    } as any)
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order payment:", error);
    throw new Error("Failed to update order payment status");
  }
}

// Get order by ID
export async function getOrder(orderId: string) {
  const supabase = createSupabaseServerClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        quantity,
        price,
        product_id,
        product_name,
        product_slug
      )
    `
    )
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    throw new Error("Order not found");
  }

  return order;
}

// Get all orders for admin
export async function getAllOrders() {
  const supabase = createSupabaseServerClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        quantity,
        price,
        product_id,
        product_name,
        product_slug
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }

  return orders;
}
