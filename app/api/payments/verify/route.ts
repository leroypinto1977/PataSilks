import { NextRequest, NextResponse } from "next/server";
import {
  verifyPaymentSignature,
  createOrder,
  updateOrderPayment,
} from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    console.log("Verifying payment...");
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = await request.json();

    console.log("Payment verification data:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature: razorpay_signature ? "present" : "missing",
      orderData: orderData ? "present" : "missing",
    });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("Missing payment details");
      return NextResponse.json(
        { error: "Missing payment details" },
        { status: 400 }
      );
    }

    if (!orderData) {
      console.error("Missing order data");
      return NextResponse.json(
        { error: "Missing order data" },
        { status: 400 }
      );
    }

    // Verify payment signature
    console.log("Verifying payment signature...");
    const isSignatureValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    console.log("Signature valid:", isSignatureValid);

    if (!isSignatureValid) {
      console.error("Invalid payment signature");
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Create order in database
    console.log("Creating order in database...");
    const order = await createOrder({
      email: orderData.customerDetails.email,
      customerName: orderData.customerDetails.name,
      customerPhone: orderData.customerDetails.phone,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.customerDetails.billingAddress,
      totalAmount: orderData.totalAmount,
      items: orderData.items,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    console.log("Order created successfully:", order);

    return NextResponse.json({
      success: true,
      order,
      message: "Payment verified and order created successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}

