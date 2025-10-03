"use client";

import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, getTotalItems, getTotalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white flex items-center justify-center py-20">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-rich-beige mb-4" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-700 mb-6">
            Start shopping to add beautiful sarees to your cart
          </p>
          <Link href="/products">
            <Button className="btn-primary">
              Browse Products
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-700">
            {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your
            cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 sticky top-8">
              <h2 className="text-xl font-serif font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-3 border-t border-rich-beige/20 pt-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>{formatPrice(getTotalPrice() * 0.18)}</span>
                </div>
                <div className="border-t border-rich-beige/20 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(getTotalPrice() * 1.18)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button className="w-full btn-primary">
                  Proceed to Checkout
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>

              <Link href="/products" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full border-rich-beige/20 hover:bg-rich-beige/5"
                >
                  Continue Shopping
                </Button>
              </Link>

              <div className="text-center text-sm text-gray-600 space-y-1">
                <p>✓ Free shipping on orders above ₹5,000</p>
                <p>✓ 7-day easy returns</p>
                <p>✓ Authenticity guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
