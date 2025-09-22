"use client";

import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Package } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  created_at: Date;
  status: string;
  category?: {
    name: string;
  };
}

interface RecentProductsProps {
  products: Product[];
}

export function RecentProducts({ products }: RecentProductsProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get the 5 most recent products
    const recent = products
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 5);
    setRecentProducts(recent);
  }, [products]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (recentProducts.length === 0) {
    return (
      <div className="bg-admin-light rounded-2xl shadow-lg p-8 border border-admin-medium">
        <h3 className="text-xl font-bold text-admin-white mb-6 flex items-center">
          <Package className="mr-2" size={24} />
          Recent Products
        </h3>
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-admin-light-text mb-4" />
          <p className="text-admin-light-text">No products found</p>
          <p className="text-sm text-admin-light-text mt-2">
            Add your first product to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-admin-light rounded-2xl shadow-lg p-6 border border-admin-medium">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-admin-white flex items-center">
          <Package className="mr-2" size={24} />
          Recent Products
        </h3>
        <Link
          href="/admin/products"
          className="text-admin-light-text hover:text-admin-white transition-colors text-sm font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center space-x-4 p-4 bg-admin-medium rounded-xl hover:bg-admin-medium/80 transition-colors"
          >
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={product.images[0] || "/placeholder-product.jpg"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg bg-admin-light"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-admin-white font-semibold truncate">
                {product.name}
              </h4>
              <p className="text-admin-light-text text-sm">
                {product.category?.name || "Uncategorized"}
              </p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-admin-white font-bold">
                  {formatPrice(product.price)}
                </span>
                <span className="text-admin-light-text text-xs">
                  {formatDate(product.created_at)}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Link href={`/products/${product.id}`}>
                <button className="p-2 text-admin-light-text hover:text-admin-white hover:bg-admin-light rounded-lg transition-colors">
                  <Eye size={16} />
                </button>
              </Link>
              <Link href={`/admin/products/${product.id}`}>
                <button className="p-2 text-admin-light-text hover:text-admin-white hover:bg-admin-light rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {recentProducts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-admin-medium">
          <Link
            href="/admin/products/new"
            className="w-full bg-admin-white text-admin-dark py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-center block"
          >
            Add New Product
          </Link>
        </div>
      )}
    </div>
  );
}
