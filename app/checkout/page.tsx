"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Truck, Shield } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder - in a real app, you'd process the payment
    alert(
      "This is a demo checkout. In a real application, payment processing would happen here."
    );
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-brown-900 mb-4">
            No items in cart
          </h1>
          <p className="text-brown-700">Add some products to checkout</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-brown-900 mb-2">
            Checkout
          </h1>
          <p className="text-brown-700">Complete your order</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-serif font-bold text-brown-900 mb-6 flex items-center">
                  <Truck size={20} className="mr-2 text-amber-600" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      className="border-amber-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      className="border-amber-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="border-amber-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className="border-amber-200" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="border-amber-200" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input id="pincode" required className="border-amber-200" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required className="border-amber-200" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      className="border-amber-200"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-serif font-bold text-brown-900 mb-6 flex items-center">
                  <CreditCard size={20} className="mr-2 text-amber-600" />
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="border-amber-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        required
                        className="border-amber-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        className="border-amber-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      required
                      className="border-amber-200"
                    />
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-serif font-bold text-brown-900 mb-4">
                  Special Instructions
                </h2>
                <Textarea
                  placeholder="Any special delivery instructions..."
                  className="border-amber-200"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 sticky top-8">
                <h2 className="text-xl font-serif font-bold text-brown-900">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-cream-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-amber-100 rounded-lg"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-brown-900 text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-amber-600 text-sm">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3 border-t border-amber-100 pt-4">
                  <div className="flex justify-between text-brown-700">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-brown-700">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-brown-700">
                    <span>GST (18%)</span>
                    <span>{formatPrice(getTotalPrice() * 0.18)}</span>
                  </div>
                  <div className="border-t border-amber-100 pt-3">
                    <div className="flex justify-between text-lg font-bold text-brown-900">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice() * 1.18)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="flex items-center space-x-2 text-sm text-brown-600 bg-cream-50 p-3 rounded-xl">
                  <Shield size={16} className="text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Place Order Button */}
                <Button type="submit" className="w-full luxury-button">
                  Place Order - {formatPrice(getTotalPrice() * 1.18)}
                </Button>

                <div className="text-center text-xs text-brown-600">
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
