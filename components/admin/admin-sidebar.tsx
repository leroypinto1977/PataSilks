"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Crown,
  BarChart3,
  FileText,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    // Handle sign out
    window.location.href = "/auth/signin";
  };

  return (
    <div className="w-64 bg-admin-black shadow-2xl flex flex-col border-r border-admin-light">
      {/* Header */}
      <div className="p-6 border-b border-admin-medium">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-admin-accent to-primary-pink-300 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-admin-white">
              Patta Silks
            </h2>
            <p className="text-sm text-admin-off-white">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-admin-medium">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-admin-light rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-admin-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-admin-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-admin-off-white truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                isActive
                  ? "bg-admin-medium text-admin-white border-l-4 border-admin-accent"
                  : "text-admin-off-white hover:bg-admin-medium hover:text-admin-white"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive
                    ? "text-admin-accent"
                    : "text-admin-lighter group-hover:text-admin-white"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-admin-medium">
        <Button
          variant="ghost"
          className="w-full justify-start text-admin-off-white hover:bg-admin-medium hover:text-admin-white"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
