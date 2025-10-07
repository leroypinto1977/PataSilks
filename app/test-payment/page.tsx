"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Package, User, MapPin } from "lucide-react";
import { toast } from "sonner";
import { EnvDebug } from "@/components/debug/env-debug";

export default function TestPaymentPage() {
  const [testOrder, setTestOrder] = useState({
    customerName: "Test Customer",
    email: "test@example.com",
    phone: "9876543210",
    address: "123 Test Street, Test City, Test State - 123456",
    items: [
      {
        id: "test-product-1",
        name: "Test Saree",
        quantity: 1,
        price: 5000,
      },
    ],
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalAmount = testOrder.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gstAmount = totalAmount * 0.18;
  const finalAmount = totalAmount + gstAmount;

  const handleTestPayment = async () => {
    setIsProcessing(true);

    try {
      // Check if Razorpay is configured
      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        toast.error(
          "Razorpay not configured. Please check environment variables."
        );
        return;
      }

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        // Create test order
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: Math.round(finalAmount * 100), // Convert to paise
          currency: "INR",
          name: "Patta Silks",
          description: "Test Order Payment",
          image: "/logo.png",
          order_id: "", // This will be set by the server
          prefill: {
            name: testOrder.customerName,
            email: testOrder.email,
            contact: testOrder.phone,
          },
          theme: {
            color: "#D4C4B0",
          },
          handler: function (response: any) {
            toast.success("Payment Successful!");
            console.log("Payment Response:", response);
            // Here you would typically verify the payment on your server
          },
          modal: {
            ondismiss: function () {
              toast.error("Payment cancelled");
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        toast.error("Failed to load Razorpay");
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Razorpay Payment Testing
          </h1>
          <p className="text-gray-600">
            Test the payment gateway integration with sandbox credentials
          </p>
        </div>

        {/* Environment Debug */}
        <div className="mb-8">
          <EnvDebug />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User size={20} />
                  <span>Customer Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={testOrder.customerName}
                    onChange={(e) =>
                      setTestOrder({
                        ...testOrder,
                        customerName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={testOrder.email}
                    onChange={(e) =>
                      setTestOrder({ ...testOrder, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={testOrder.phone}
                    onChange={(e) =>
                      setTestOrder({ ...testOrder, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={testOrder.address}
                    onChange={(e) =>
                      setTestOrder({ ...testOrder, address: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package size={20} />
                  <span>Order Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard size={20} />
                  <span>Payment Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>{formatPrice(gstAmount)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(finalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Test Mode Indicator */}
                {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes("test") ? (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Test Mode Active
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">
                    Live Mode - Use Real Cards
                  </Badge>
                )}

                <Button
                  onClick={handleTestPayment}
                  disabled={isProcessing}
                  className="w-full bg-rich-brown text-white hover:bg-rich-brown/90"
                >
                  {isProcessing ? "Processing..." : "Test Payment"}
                </Button>
              </CardContent>
            </Card>

            {/* Test Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Test Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="font-medium text-gray-900">Test Cards:</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p>
                      <strong>Success:</strong> 4111 1111 1111 1111
                    </p>
                    <p>
                      <strong>Failure:</strong> 4000 0000 0000 0002
                    </p>
                    <p className="text-gray-600">Expiry: Any future date</p>
                    <p className="text-gray-600">CVV: Any 3 digits</p>
                  </div>
                  <p className="font-medium text-gray-900 mt-4">
                    Test UPI IDs:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p>
                      <strong>Success:</strong> success@razorpay
                    </p>
                    <p>
                      <strong>Failure:</strong> failure@razorpay
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Status */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Razorpay Key:</span>
                    <span
                      className={
                        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
                        ? "✓ Configured"
                        : "✗ Missing"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span
                      className={
                        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes(
                          "test"
                        )
                          ? "text-yellow-600"
                          : "text-red-600"
                      }
                    >
                      {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes("test")
                        ? "Sandbox"
                        : "Live"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
