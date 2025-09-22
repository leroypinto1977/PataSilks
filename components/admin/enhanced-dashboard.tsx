"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { createSupabaseBrowserClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Upload,
  X,
  Eye,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  Users,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[];
  active: boolean;
  inStock: boolean;
  stockCount: number;
  sold: boolean;
  fabric: string | null;
  color: string | null;
  size: string | null;
  weight: string | null;
  occasion: string | null;
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  categoryId: string;
  category?: { name: string };
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface DashboardStats {
  totalProducts: number;
  inStockProducts: number;
  soldProducts: number;
  totalRevenue: number;
  newArrivals: number;
  featuredProducts: number;
}

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Form state for new/edit product
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    images: [] as string[],
    categoryId: "",
    fabric: "",
    color: "",
    size: "",
    weight: "",
    occasion: "",
    tags: "",
    featured: false,
    newArrival: true,
    active: true,
    inStock: true,
    stockCount: 1,
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (isLoading) return;
    if (!user || !isAdmin) {
      router.push("/auth/signin");
      return;
    }

    fetchData();
  }, [user, isAdmin, isLoading, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchStats()]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        category:categories(name)
      `
      )
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return;
    }

    setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    setCategories(data || []);
  };

  const fetchStats = async () => {
    const { data: products, error } = await supabase
      .from("products")
      .select("price, sold, inStock, featured, newArrival");

    if (error) {
      console.error("Error fetching stats:", error);
      return;
    }

    if (products) {
      const stats: DashboardStats = {
        totalProducts: products.length,
        inStockProducts: products.filter((p) => p.inStock).length,
        soldProducts: products.filter((p) => p.sold).length,
        totalRevenue: products
          .filter((p) => p.sold)
          .reduce((sum, p) => sum + p.price, 0),
        newArrivals: products.filter((p) => p.newArrival).length,
        featuredProducts: products.filter((p) => p.featured).length,
      };
      setStats(stats);
    }
  };

  const handleAddImage = () => {
    if (newImageUrl && !imageUrls.includes(newImageUrl)) {
      setImageUrls([...imageUrls, newImageUrl]);
      setFormData({ ...formData, images: [...imageUrls, newImageUrl] });
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.categoryId || formData.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const productData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        images: imageUrls,
      };

      let result;
      if (selectedProduct) {
        // Update existing product
        result = await supabase
          .from("products")
          .update(productData)
          .eq("id", selectedProduct.id);
      } else {
        // Create new product
        result = await supabase.from("products").insert([productData]);
      }

      if (result.error) {
        throw result.error;
      }

      toast.success(
        selectedProduct
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        images: [],
        categoryId: "",
        fabric: "",
        color: "",
        size: "",
        weight: "",
        occasion: "",
        tags: "",
        featured: false,
        newArrival: true,
        active: true,
        inStock: true,
        stockCount: 1,
      });
      setImageUrls([]);
      setSelectedProduct(null);
      setIsAddingProduct(false);

      // Refresh data
      await fetchData();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      images: product.images,
      categoryId: product.categoryId,
      fabric: product.fabric || "",
      color: product.color || "",
      size: product.size || "",
      weight: product.weight || "",
      occasion: product.occasion || "",
      tags: product.tags.join(", "),
      featured: product.featured,
      newArrival: product.newArrival,
      active: product.active,
      inStock: product.inStock,
      stockCount: product.stockCount,
    });
    setImageUrls(product.images);
    setIsAddingProduct(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        throw error;
      }

      toast.success("Product deleted successfully!");
      await fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleToggleStock = async (product: Product) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          inStock: !product.inStock,
          sold: !product.inStock ? false : product.sold,
        })
        .eq("id", product.id);

      if (error) {
        throw error;
      }

      toast.success(
        `Product ${!product.inStock ? "restocked" : "marked as out of stock"}`
      );
      await fetchData();
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Failed to update stock status");
    }
  };

  const handleMarkAsSold = async (product: Product) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          sold: true,
          inStock: false,
          soldAt: new Date().toISOString(),
        })
        .eq("id", product.id);

      if (error) {
        throw error;
      }

      toast.success("Product marked as sold!");
      await fetchData();
    } catch (error) {
      console.error("Error marking product as sold:", error);
      toast.error("Failed to mark product as sold");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-brown-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-brown-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-brown-700">
            Manage your Patta Silks inventory and orders
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.inStockProducts}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sold</CardTitle>
                <ShoppingCart className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  {stats.soldProducts}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{stats.totalRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Arrivals
                </CardTitle>
                <Star className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.newArrivals}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured</CardTitle>
                <Star className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.featuredProducts}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Products */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>
                  Latest additions to your inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      {product.images.length > 0 && (
                        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-medium text-brown-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-brown-600 mb-2">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={product.inStock ? "default" : "secondary"}
                        >
                          {product.sold
                            ? "Sold"
                            : product.inStock
                            ? "In Stock"
                            : "Out of Stock"}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        {product.images.length > 0 && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-brown-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-brown-600">
                            ₹{product.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                product.inStock ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {product.sold
                                ? "Sold"
                                : product.inStock
                                ? "In Stock"
                                : "Out of Stock"}
                            </Badge>
                            {product.featured && (
                              <Badge variant="outline" className="text-xs">
                                Featured
                              </Badge>
                            )}
                            {product.newArrival && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-blue-50"
                              >
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        {!product.sold && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleToggleStock(product)}
                            >
                              {product.inStock
                                ? "Mark Out of Stock"
                                : "Mark In Stock"}
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleMarkAsSold(product)}
                              className="text-green-600 hover:text-green-700"
                            >
                              Mark as Sold
                            </Button>
                          </>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Product
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.name}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </CardTitle>
                <CardDescription>
                  {selectedProduct
                    ? "Update product details"
                    : "Add a new saree to your inventory"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Royal Kanjivaram Saree"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="price">Price (₹) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: Number(e.target.value),
                            })
                          }
                          placeholder="15999"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.categoryId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, categoryId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fabric">Fabric</Label>
                        <Input
                          id="fabric"
                          value={formData.fabric}
                          onChange={(e) =>
                            setFormData({ ...formData, fabric: e.target.value })
                          }
                          placeholder="Silk, Cotton, etc."
                        />
                      </div>

                      <div>
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          value={formData.color}
                          onChange={(e) =>
                            setFormData({ ...formData, color: e.target.value })
                          }
                          placeholder="Red, Blue, Golden, etc."
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="size">Size</Label>
                        <Input
                          id="size"
                          value={formData.size}
                          onChange={(e) =>
                            setFormData({ ...formData, size: e.target.value })
                          }
                          placeholder="Free Size, S, M, L, XL"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          value={formData.weight}
                          onChange={(e) =>
                            setFormData({ ...formData, weight: e.target.value })
                          }
                          placeholder="500g, 1kg, etc."
                        />
                      </div>

                      <div>
                        <Label htmlFor="occasion">Occasion</Label>
                        <Input
                          id="occasion"
                          value={formData.occasion}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              occasion: e.target.value,
                            })
                          }
                          placeholder="Wedding, Festival, Party, etc."
                        />
                      </div>

                      <div>
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                          placeholder="traditional, handwoven, silk"
                        />
                      </div>

                      <div>
                        <Label htmlFor="stockCount">Stock Count</Label>
                        <Input
                          id="stockCount"
                          type="number"
                          value={formData.stockCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stockCount: Number(e.target.value),
                            })
                          }
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Detailed description of the saree..."
                      rows={4}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label>Product Images</Label>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Enter image URL"
                        />
                        <Button type="button" onClick={handleAddImage}>
                          <Upload className="h-4 w-4 mr-2" />
                          Add Image
                        </Button>
                      </div>

                      {imageUrls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imageUrls.map((url, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-lg overflow-hidden border"
                            >
                              <Image
                                src={url}
                                alt={`Product image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, featured: checked })
                        }
                      />
                      <Label htmlFor="featured">Featured</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="newArrival"
                        checked={formData.newArrival}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, newArrival: checked })
                        }
                      />
                      <Label htmlFor="newArrival">New Arrival</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, active: checked })
                        }
                      />
                      <Label htmlFor="active">Active</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="inStock"
                        checked={formData.inStock}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, inStock: checked })
                        }
                      />
                      <Label htmlFor="inStock">In Stock</Label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="luxury-button">
                      {selectedProduct ? "Update Product" : "Add Product"}
                    </Button>

                    {selectedProduct && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedProduct(null);
                          setFormData({
                            name: "",
                            description: "",
                            price: 0,
                            images: [],
                            categoryId: "",
                            fabric: "",
                            color: "",
                            size: "",
                            weight: "",
                            occasion: "",
                            tags: "",
                            featured: false,
                            newArrival: true,
                            active: true,
                            inStock: true,
                            stockCount: 1,
                          });
                          setImageUrls([]);
                        }}
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
