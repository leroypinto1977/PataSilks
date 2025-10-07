"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-rich-brown/10 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-bold text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-rich-brown font-bold">{formatPrice(item.price)}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-rich-brown/20"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus size={14} />
          </Button>
          <span className="w-8 text-center font-medium text-gray-900">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-rich-brown/20"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={14} />
          </Button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <p className="font-bold text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => removeItem(item.id)}
        >
          <X size={20} />
        </Button>
      </div>
    </div>
  );
}
