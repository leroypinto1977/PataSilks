import { Package, ShoppingCart, Eye, EyeOff } from "lucide-react";

interface DashboardStatsProps {
  data: {
    productCount: number;
    categoryCount: number;
    activeProducts: number;
    inactiveProducts: number;
  };
}

export function DashboardStats({ data }: DashboardStatsProps) {
  const stats = [
    {
      name: "Total Products",
      value: data.productCount,
      icon: Package,
      color: "bg-white text-gray-900",
    },
    {
      name: "Active Products",
      value: data.activeProducts,
      icon: Eye,
      color: "bg-white text-gray-900",
    },
    {
      name: "Inactive Products",
      value: data.inactiveProducts,
      icon: EyeOff,
      color: "bg-white text-gray-900",
    },
    {
      name: "Categories",
      value: data.categoryCount,
      icon: ShoppingCart,
      color: "bg-white text-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center">
            <div
              className={`p-3 rounded-lg ${stat.color} border border-gray-200`}
            >
              <stat.icon size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
