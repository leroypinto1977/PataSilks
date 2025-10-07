"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  DollarSign,
  Star,
  AlertTriangle,
  Calendar,
  Tag,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  salesThisMonth: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeProducts: number;
  outOfStock: number;
  featuredProducts: number;
  recentOrders: Array<{
    id: string;
    customer_name: string;
    total_amount: number;
    status: string;
    created_at: string;
  }>;
  recentProducts: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    featured: boolean;
    active: boolean;
    created_at: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("🔄 Fetching dashboard stats...");
        const response = await fetch("/api/admin/dashboard/stats");
        console.log("📡 Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Dashboard data received:", data);
          setStats(data);
        } else {
          const errorData = await response.json();
          console.error("❌ Failed to fetch dashboard stats:", errorData);
        }
      } catch (error) {
        console.error("❌ Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("🎯 Admin page component mounted successfully!");
    console.log("📊 Stats loaded:", stats);
  }, [stats]);

  console.log("🏗️ Admin page rendering...");

  if (loading) {
    return (
      <div className="container mx-auto px-0 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rich-brown mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Dashboard Error
          </h1>
          <p className="text-gray-600">
            Failed to load dashboard data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-muted text-muted-foreground";
      case "CONFIRMED":
        return "bg-muted text-muted-foreground";
      case "PROCESSING":
        return "bg-muted text-muted-foreground";
      case "SHIPPED":
        return "bg-muted text-muted-foreground";
      case "DELIVERED":
        return "bg-muted text-muted-foreground";
      case "CANCELLED":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your saree collection and track business performance
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/admin/products/new">
              <Button className="bg-background text-foreground border border-border hover:bg-muted">
                <Plus className="h-4 w-4 mr-2" />
                Add New Saree
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-10 w-10 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalProducts}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Active: {stats.activeProducts}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Tag className="h-10 w-10 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Categories
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalCategories}
                  </p>
                  <p className="text-xs text-muted-foreground">Saree types</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sales This Month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Sales This Month
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.salesThisMonth}
                  </p>
                  <p className="text-xs text-muted-foreground">Sarees sold</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-10 w-10 text-primary-brown-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Monthly Revenue
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatPrice(stats.monthlyRevenue)}
                  </p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-10 w-10 text-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatPrice(stats.totalRevenue)}
                  </p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-10 w-10 text-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Featured
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.featuredProducts}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Featured sarees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Out of Stock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-10 w-10 text-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Out of Stock
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.outOfStock}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Need restocking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-10 w-10 text-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Month
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {new Date().toLocaleDateString("en-IN", { month: "long" })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-8"
      >
        <Card className="bg-card border-border">
          <CardHeader className="">
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Link href="/admin/products/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 hover:bg-primary-brown-50  border-border"
                >
                  <Plus className="h-6 w-6 text-primary-brown-600" />
                  <span className="text-sm text-foreground font-medium hover:text-black">
                    Add Saree
                  </span>
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 hover:bg-muted hover:border-gray-400 border-border"
                >
                  <Package className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">
                    Manage Products
                  </span>
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 hover:bg-muted hover:border-gray-400 border-border"
                >
                  <Users className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">
                    User Management
                  </span>
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 hover:bg-muted hover:border-gray-400 border-border"
                >
                  <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">
                    Orders
                  </span>
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 hover:bg-muted hover:border-gray-400 border-border"
                >
                  <Tag className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">
                    Categories
                  </span>
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col space-y-2 hover:bg-muted hover:border-gray-400 border-border"
                >
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">
                    Analytics
                  </span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="">
              <CardTitle className="flex items-center justify-between text-foreground">
                Recent Orders
                <Link href="/admin/orders">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No recent orders
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {order.customer_name}
                        </p>
                        <p className="text-sm text-primary-brown-600 font-medium">
                          {formatPrice(order.total_amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-muted text-foreground hover:bg-gray-200">
                          {order.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-card border-border"
                          >
                            <DropdownMenuItem className="text-foreground hover:bg-muted">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground hover:bg-muted">
                              <Edit className="h-4 w-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="">
              <CardTitle className="flex items-center justify-between text-foreground">
                Recent Products
                <Link href="/admin/products">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentProducts.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No recent products
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentProducts.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted transition-colors"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">
                            {product.name}
                          </p>
                          {product.featured && (
                            <Star className="h-4 w-4 text-primary-brown-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                        <p className="text-sm font-medium text-primary-brown-600">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            product.active
                              ? "bg-muted text-foreground hover:bg-gray-200"
                              : "bg-gray-200 text-muted-foreground"
                          }
                        >
                          {product.active ? "Active" : "Inactive"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-card border-border"
                          >
                            <DropdownMenuItem className="text-foreground hover:bg-muted">
                              <Eye className="h-4 w-4 mr-2" />
                              View Product
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground hover:bg-muted">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
