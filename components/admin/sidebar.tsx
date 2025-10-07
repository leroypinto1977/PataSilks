"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Home,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Collections", href: "/admin/collections", icon: Tag },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-serif font-bold text-primary-brown-600">
            Patta Silks
          </h1>
        </Link>
        <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary-brown-50 text-primary-brown-700 border-l-4 border-primary-brown-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <Link href="/" className="block">
          <Button
            variant="outline"
            className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Home size={16} className="mr-2" />
            View Store
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full justify-start text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          onClick={() => signOut()}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
