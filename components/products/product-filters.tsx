"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  priceRange?: { min: number; max: number };
  currentFilters?: any;
}

export function ProductFilters({
  categories,
  priceRange: maxPriceRange,
  currentFilters,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMax = maxPriceRange?.max || 50000;

  const [selectedCategory, setSelectedCategory] = useState(
    currentFilters?.category || searchParams.get("category") || ""
  );
  const [priceRange, setPriceRange] = useState([
    parseInt(currentFilters?.minPrice || searchParams.get("minPrice") || "0"),
    parseInt(
      currentFilters?.maxPrice ||
        searchParams.get("maxPrice") ||
        defaultMax.toString()
    ),
  ]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const updateFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategory) params.set("category", selectedCategory);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < defaultMax)
      params.set("maxPrice", priceRange[1].toString());
    if (searchQuery) params.set("search", searchQuery);

    // Preserve other filters like featured and newArrivals
    if (currentFilters?.featured)
      params.set("featured", currentFilters.featured);
    if (currentFilters?.newArrivals)
      params.set("newArrivals", currentFilters.newArrivals);

    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, defaultMax]);
    setSearchQuery("");
    router.push("/products");
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-bold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X size={16} className="mr-1" />
          Clear
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label className="text-gray-900 font-medium">Search</Label>
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && updateFilters()}
          className="border-rich-beige/20 focus:border-rich-beige"
        />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <Label className="text-gray-900 font-medium">Category</Label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="accent-rich-beige focus:ring-rich-beige focus:ring-2"
            />
            <span className="text-gray-700">All Categories</span>
          </label>
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category.name.toLowerCase()}
                checked={selectedCategory === category.name.toLowerCase()}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="accent-rich-beige focus:ring-rich-beige focus:ring-2"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="text-gray-900 font-medium">Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={defaultMax}
            step={500}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <Button onClick={updateFilters} className="w-full luxury-button">
        Apply Filters
      </Button>
    </div>
  );
}
