"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon,
  Eye,
  Star,
  Tag,
  IndianRupee,
  MoreHorizontal,
  Search,
  Filter,
  Grid3X3,
  List,
  Camera,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Categories for sarees
const SAREE_CATEGORIES = [
  "Banarasi Silk",
  "Kanjivaram",
  "Tussar Silk",
  "Georgette",
  "Chiffon",
  "Cotton",
  "Linen",
  "Designer",
  "Bridal",
  "Party Wear",
  "Casual",
  "Office Wear",
  "Traditional",
  "Contemporary",
];

// Occasions
const OCCASIONS = [
  "Wedding",
  "Festival",
  "Party",
  "Office",
  "Casual",
  "Religious",
  "Anniversary",
  "Reception",
  "Engagement",
  "Sangeet",
];

interface SareeImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
}

interface Saree {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number; // For sale pricing
  images: SareeImage[];
  fabric: string;
  color: string;
  occasion: string;
  status: "active" | "draft" | "sold";
  featured: boolean;
  inStock: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Mock data - replace with actual API calls
const sampleSarees: Saree[] = [
  {
    id: "1",
    name: "Royal Banarasi Silk Saree",
    description:
      "Exquisite handwoven Banarasi silk saree with intricate gold zari work. Perfect for weddings and special occasions.",
    category: "Banarasi Silk",
    price: 15000,
    originalPrice: 18000,
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop",
        isPrimary: true,
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1583391733956-6c78376b9ed2?w=400&h=600&fit=crop",
        isPrimary: false,
      },
    ],
    fabric: "Pure Silk",
    color: "Red",
    occasion: "Wedding",
    status: "active",
    featured: true,
    inStock: true,
    tags: ["handwoven", "zari work", "traditional"],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Contemporary Georgette Saree",
    description:
      "Modern georgette saree with beautiful prints and contemporary design.",
    category: "Georgette",
    price: 8000,
    images: [
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
        isPrimary: true,
      },
    ],
    fabric: "Georgette",
    color: "Blue",
    occasion: "Party",
    status: "active",
    featured: false,
    inStock: true,
    tags: ["modern", "prints", "party wear"],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
];
export default function SareesPage() {
  const [sarees, setSarees] = useState<Saree[]>(sampleSarees);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  const filteredSarees = sarees.filter((saree) => {
    const matchesSearch =
      saree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saree.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saree.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      categoryFilter === "all" || saree.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || saree.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
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
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handleToggleFeatured = (sareeId: string) => {
    setSarees((prev) =>
      prev.map((saree) =>
        saree.id === sareeId ? { ...saree, featured: !saree.featured } : saree
      )
    );
    toast.success("Saree updated successfully");
  };

  const handleDelete = (sareeId: string) => {
    setSarees((prev) => prev.filter((saree) => saree.id !== sareeId));
    toast.success("Saree deleted successfully");
  };

  const handleStatusChange = (
    sareeId: string,
    newStatus: "active" | "draft" | "sold"
  ) => {
    setSarees((prev) =>
      prev.map((saree) =>
        saree.id === sareeId ? { ...saree, status: newStatus } : saree
      )
    );
    toast.success("Status updated successfully");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="h-8 w-8 mr-3 text-amber-600" />
              Saree Collection
            </h1>
            <p className="text-gray-600">
              Manage your beautiful saree inventory with detailed information
              and images
            </p>
          </div>

          <Link href="/admin/sarees/new">
            <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Saree
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-amber-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  Total Sarees
                </p>
                <p className="text-2xl font-bold">{sarees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {sarees.filter((s) => s.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold">
                  {sarees.filter((s) => s.featured).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <IndianRupee className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Avg Price</p>
                <p className="text-xl font-bold">
                  {formatPrice(
                    sarees.reduce((acc, s) => acc + s.price, 0) /
                      sarees.length || 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search sarees by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-56">
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {SAREE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sarees Display */}
      <AnimatePresence mode="wait">
        {filteredSarees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                ? "No matching sarees found"
                : "No sarees in your collection yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search criteria or filters"
                : "Start building your saree collection by adding your first saree"}
            </p>
            {!searchTerm &&
              categoryFilter === "all" &&
              statusFilter === "all" && (
                <Link href="/admin/sarees/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Saree
                  </Button>
                </Link>
              )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSarees.map((saree, index) => (
              <motion.div
                key={saree.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {saree.images.length > 0 ? (
                      <Image
                        src={
                          saree.images.find((img) => img.isPrimary)?.url ||
                          saree.images[0].url
                        }
                        alt={saree.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}

                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {saree.featured && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                      )}
                      <Badge className={getStatusColor(saree.status)}>
                        {saree.status.charAt(0).toUpperCase() +
                          saree.status.slice(1)}
                      </Badge>
                      {saree.originalPrice && (
                        <Badge className="bg-red-500 text-white">Sale</Badge>
                      )}
                    </div>

                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/80 hover:bg-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/sarees/${saree.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleFeatured(saree.id)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            {saree.featured ? "Unfeature" : "Feature"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(
                                saree.id,
                                saree.status === "active" ? "draft" : "active"
                              )
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {saree.status === "active"
                              ? "Mark as Draft"
                              : "Mark as Active"}
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Saree
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{saree.name}
                                  "? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(saree.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {saree.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {saree.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {saree.fabric}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {saree.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(saree.price)}
                        </span>
                        {saree.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(saree.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{saree.images.length} images</span>
                        <span>Added {formatDate(saree.createdAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredSarees.map((saree, index) => (
              <motion.div
                key={saree.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        {saree.images.length > 0 ? (
                          <Image
                            src={
                              saree.images.find((img) => img.isPrimary)?.url ||
                              saree.images[0].url
                            }
                            alt={saree.name}
                            width={120}
                            height={160}
                            className="w-20 h-28 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {saree.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              {saree.featured && (
                                <Badge className="bg-yellow-500 text-white">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Featured
                                </Badge>
                              )}
                              <Badge className={getStatusColor(saree.status)}>
                                {saree.status.charAt(0).toUpperCase() +
                                  saree.status.slice(1)}
                              </Badge>
                              <Badge variant="outline">{saree.category}</Badge>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/sarees/${saree.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleFeatured(saree.id)}
                              >
                                <Star className="h-4 w-4 mr-2" />
                                {saree.featured ? "Unfeature" : "Feature"}
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Saree
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {saree.name}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(saree.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {saree.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-green-600">
                                {formatPrice(saree.price)}
                              </span>
                              {saree.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(saree.originalPrice)}
                                </span>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {saree.fabric} • {saree.color}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {saree.occasion}
                            </Badge>
                          </div>

                          <div className="text-xs text-gray-500">
                            {saree.images.length} images • Added{" "}
                            {formatDate(saree.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
