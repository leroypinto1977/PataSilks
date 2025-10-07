"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Truck, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  billingAddress: string;
  billingSameAsShipping: boolean;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    billingAddress: "",
    billingSameAsShipping: true,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(checked && { billingAddress: prev.shippingAddress }),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "shippingAddress" &&
          prev.billingSameAsShipping && {
            billingAddress: value,
          }),
      }));
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validate form
      if (
        !formData.customerName ||
        !formData.email ||
        !formData.phone ||
        !formData.shippingAddress
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast.error("Failed to load payment gateway");
        return;
      }

      // Create order with Razorpay
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          shippingAddress: formData.shippingAddress,
          customerDetails: {
            name: formData.customerName,
            email: formData.email,
            phone: formData.phone,
            billingAddress: formData.billingSameAsShipping
              ? formData.shippingAddress
              : formData.billingAddress,
          },
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        toast.error(orderResult.error || "Failed to create order");
        return;
      }

      // Check if Razorpay key is available
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        toast.error("Payment gateway not configured. Please contact support.");
        return;
      }

      console.log("Creating Razorpay order with:", {
        key: razorpayKey,
        amount: orderResult.order.amount,
        orderId: orderResult.order.id,
        items: items.length,
      });

      // Initialize Razorpay
      const options = {
        key: razorpayKey,
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: "Patta Silks",
        description: `Order for ${items.length} item(s)`,
        order_id: orderResult.order.id,
        prefill: {
          name: formData.customerName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#D4C4B0", // rich-brown
        },
        handler: async function (response: any) {
          try {
            console.log("Payment successful, verifying:", response);

            // Verify payment
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: orderResult.orderData,
              }),
            });

            const verifyResult = await verifyResponse.json();
            console.log("Verification result:", verifyResult);

            if (verifyResult.success) {
              toast.success("Payment successful! Order placed.");
              clearCart();
              router.push(`/order-success?orderId=${verifyResult.order.id}`);
            } else {
              console.error("Payment verification failed:", verifyResult.error);
              toast.error(`Payment verification failed: ${verifyResult.error}`);
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            No items in cart
          </h1>
          <p className="text-gray-700">Add some products to checkout</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-700">Complete your order</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                  <Truck size={20} className="mr-2 text-rich-brown" />
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="border-rich-brown/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-rich-brown/20"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-rich-brown/20"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shippingAddress">Shipping Address *</Label>
                    <Textarea
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      required
                      className="border-rich-brown/20"
                      placeholder="Enter your complete shipping address including city, state, and PIN code"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="billingSameAsShipping"
                      name="billingSameAsShipping"
                      checked={formData.billingSameAsShipping}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-rich-brown border-gray-300 rounded focus:ring-rich-brown"
                    />
                    <Label htmlFor="billingSameAsShipping" className="text-sm">
                      Billing address same as shipping address
                    </Label>
                  </div>
                  {!formData.billingSameAsShipping && (
                    <div>
                      <Label htmlFor="billingAddress">Billing Address *</Label>
                      <Textarea
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required
                        className="border-rich-brown/20"
                        placeholder="Enter your billing address"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard size={20} className="mr-2 text-rich-brown" />
                  Payment Information
                </h2>

                <div className="space-y-4">
                  {/* Test Mode Banner */}
                  {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes(
                    "test"
                  ) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-yellow-800">
                          Test Mode Active
                        </p>
                      </div>
                      <p className="text-xs text-yellow-700 mt-1">
                        Use test card: 4111 1111 1111 1111 (any expiry, any CVV)
                      </p>
                    </div>
                  )}

                  <div className="bg-rich-brown/10 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard size={24} className="text-rich-brown" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Secure Payment
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay securely with Razorpay. We support all major
                          cards, UPI, Net Banking, and Wallets.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">
                        256-bit SSL encryption
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">
                        PCI DSS compliant
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">
                        Instant payment confirmation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
                  Special Instructions
                </h2>
                <Textarea
                  placeholder="Any special delivery instructions..."
                  className="border-rich-brown/20"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 sticky top-8">
                <h2 className="text-xl font-serif font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-rich-brown/5 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-rich-brown/10 rounded-lg"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-rich-brown text-sm">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3 border-t border-rich-brown/20 pt-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>GST (18%)</span>
                    <span>{formatPrice(getTotalPrice() * 0.18)}</span>
                  </div>
                  <div className="border-t border-rich-brown/20 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice() * 1.18)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-rich-brown/5 p-3 rounded-xl">
                  <Shield size={16} className="text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-primary"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    `Place Order - ${formatPrice(getTotalPrice() * 1.18)}`
                  )}
                </Button>

                <div className="text-center text-xs text-gray-600">
                  By placing this order, you agree to our Terms of Service and
                  Privacy Policy
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
