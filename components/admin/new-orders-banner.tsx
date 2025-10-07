"use client";

import { useState, useEffect } from "react";
import { Bell, X, Package, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NewOrder {
  id: string;
  customer_name: string;
  total_amount: number;
  created_at: string;
  status: string;
}

export function NewOrdersBanner() {
  const [newOrders, setNewOrders] = useState<NewOrder[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const fetchNewOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders?limit=10");
      if (response.ok) {
        const data = await response.json();
        const orders = data.orders || [];

        // Filter orders created in the last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const recentOrders = orders.filter(
          (order: NewOrder) => new Date(order.created_at) > fiveMinutesAgo
        );

        // Only show orders newer than last checked
        const trulyNewOrders = lastChecked
          ? recentOrders.filter(
              (order: NewOrder) => new Date(order.created_at) > lastChecked
            )
          : recentOrders;

        if (trulyNewOrders.length > 0) {
          setNewOrders(trulyNewOrders);
          setIsVisible(true);
        }

        setLastChecked(new Date());
      }
    } catch (error) {
      console.error("Error fetching new orders:", error);
    }
  };

  useEffect(() => {
    // Check for new orders every 30 seconds
    const interval = setInterval(fetchNewOrders, 30000);

    // Initial fetch
    fetchNewOrders();

    return () => clearInterval(interval);
  }, [lastChecked]);

  const dismissBanner = () => {
    setIsVisible(false);
    // Clear orders after a delay to allow animation
    setTimeout(() => setNewOrders([]), 300);
  };

  if (!isVisible || newOrders.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200"
      >
        {/* Payment Mode Indicator */}
        {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes("test") && (
          <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-yellow-800">
                  Razorpay Test Mode Active
                </span>
              </div>
              <span className="text-xs text-yellow-700">
                Use test cards for payments
              </span>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bell className="w-6 h-6 text-rich-brown" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {newOrders.length} New Order
                    {newOrders.length > 1 ? "s" : ""}!
                  </h3>
                  <p className="text-sm text-gray-600">
                    New orders require your attention
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-3">
                {newOrders.slice(0, 3).map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <Package size={14} className="text-rich-brown" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">
                        {order.customer_name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      {order.status}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatTime(order.created_at)}
                    </span>
                  </motion.div>
                ))}

                {newOrders.length > 3 && (
                  <div className="text-sm text-gray-600">
                    +{newOrders.length - 3} more
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => (window.location.href = "/admin/orders")}
                className="flex items-center space-x-2"
              >
                <Eye size={14} />
                <span className="hidden sm:inline">View Orders</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={dismissBanner}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden mt-3 space-y-2">
            {newOrders.slice(0, 2).map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
              >
                <div className="flex items-center space-x-2">
                  <Package size={14} className="text-rich-brown" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatTime(order.created_at)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(order.total_amount)}
                  </p>
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    {order.status}
                  </Badge>
                </div>
              </motion.div>
            ))}

            {newOrders.length > 2 && (
              <div className="text-center text-sm text-gray-600 py-2">
                +{newOrders.length - 2} more orders
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
