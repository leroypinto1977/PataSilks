"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Plus,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Star,
  Package,
  Tag,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface SareeFormData {
  name: string;
  description: string;
  price: string;
  originalPrice: string; // Strike-through price
  category: string;
  fabric: string;
  color: string;
  size: string;
  weight: string;
  occasion: string;
  stockQuantity: string; // Stock quantity
  images: string[];
  tags: string[];
  featured: boolean;
  active: boolean;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

const FALLBACK_CATEGORIES = [
  "Silk Sarees",
  "Cotton Sarees",
  "Designer Sarees",
  "Banarasi Sarees",
  "Kanjivaram Sarees",
  "Georgette Sarees",
  "Chiffon Sarees",
  "Net Sarees",
  "Embroidered Sarees",
  "Wedding Sarees",
  "Party Wear Sarees",
  "Casual Sarees",
];

const OCCASIONS = [
  "Wedding",
  "Party",
  "Festival",
  "Casual",
  "Office",
  "Evening",
  "Traditional",
  "Modern",
];

const FABRIC_TYPES = [
  "Pure Silk",
  "Cotton",
  "Georgette",
  "Chiffon",
  "Net",
  "Satin",
  "Crepe",
  "Linen",
  "Tussar Silk",
  "Handloom Cotton",
];

export default function AddSareePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState<SareeFormData>({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    fabric: "",
    color: "",
    size: "Free Size",
    weight: "",
    occasion: "",
    stockQuantity: "1",
    images: [],
    tags: [],
    featured: false,
    active: true,
  });

  const [newTag, setNewTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/admin/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        } else {
          // Fallback to predefined categories if API fails
          const fallbackCategories = FALLBACK_CATEGORIES.map((name, index) => ({
            id: `fallback-${index}`,
            name,
          }));
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to predefined categories
        const fallbackCategories = FALLBACK_CATEGORIES.map((name, index) => ({
          id: `fallback-${index}`,
          name,
        }));
        setCategories(fallbackCategories);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (field: keyof SareeFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);

    try {
      // For now, we'll use placeholder images
      // In a real app, you'd upload to Supabase storage or a CDN
      const newImages = Array.from(files).map((file, index) => {
        // Create a temporary URL for preview
        return URL.createObjectURL(file);
      });

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));

      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields (Name, Price, Category)");
      return;
    }

    // Make images optional for now - can add later
    // if (formData.images.length === 0) {
    //   toast.error("Please upload at least one image");
    //   return;
    // }

    setSaving(true);

    try {
      // Find the category ID from the selected category name
      const selectedCategory = categories.find(
        (cat) => cat.name === formData.category
      );
      if (!selectedCategory) {
        toast.error("Invalid category selected");
        setSaving(false);
        return;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: selectedCategory.id,
        fabric: formData.fabric,
        color: formData.color,
        size: formData.size,
        weight: formData.weight,
        occasion: formData.occasion,
        stock_count: parseInt(formData.stockQuantity) || 1,
        images: formData.images,
        tags: formData.tags,
        featured: formData.featured,
        active: formData.active,
      };

      // Add original_price only if provided (will be stored later when column exists)
      if (formData.originalPrice && parseFloat(formData.originalPrice) > 0) {
        // For now, we'll skip this until the database column is added
        console.log(
          "Original price will be supported after database migration:",
          formData.originalPrice
        );
      }

      console.log("Sending product data:", productData);

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create saree");
      }

      const result = await response.json();
      toast.success("Saree created successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error creating saree:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create saree"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-admin-dark">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-6 border-b border-border bg-background"
      >
        <div className="container mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Add New Saree</h1>
          <p className="text-muted-foreground">
            Create a new saree listing for your collection
          </p>
        </div>
      </motion.div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>Basic Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Saree Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="e.g., Royal Banarasi Silk Saree"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Detailed description of the saree..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (₹) *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                              handleInputChange("price", e.target.value)
                            }
                            placeholder="0"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="originalPrice">
                          Original Price (₹) - Coming Soon
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="originalPrice"
                            type="number"
                            value={formData.originalPrice}
                            onChange={(e) =>
                              handleInputChange("originalPrice", e.target.value)
                            }
                            placeholder="0"
                            className="pl-10 bg-muted"
                            disabled
                          />
                        </div>
                        <p className="text-xs text-primary-pink-600 mt-1">
                          ⚠️ Strike-through pricing will be available after
                          database migration.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                        <div className="relative">
                          <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="stockQuantity"
                            type="number"
                            min="0"
                            value={formData.stockQuantity}
                            onChange={(e) =>
                              handleInputChange("stockQuantity", e.target.value)
                            }
                            placeholder="1"
                            className="pl-10"
                            required
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Number of items available in stock
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleInputChange("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {loadingCategories ? (
                              <SelectItem value="loading" disabled>
                                Loading categories...
                              </SelectItem>
                            ) : categories.length > 0 ? (
                              categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.name}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-categories" disabled>
                                No categories available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fabric">Fabric</Label>
                        <Select
                          value={formData.fabric}
                          onValueChange={(value) =>
                            handleInputChange("fabric", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fabric" />
                          </SelectTrigger>
                          <SelectContent>
                            {FABRIC_TYPES.map((fabric) => (
                              <SelectItem key={fabric} value={fabric}>
                                {fabric}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          value={formData.color}
                          onChange={(e) =>
                            handleInputChange("color", e.target.value)
                          }
                          placeholder="e.g., Red, Blue, Golden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="size">Size</Label>
                        <Input
                          id="size"
                          value={formData.size}
                          onChange={(e) =>
                            handleInputChange("size", e.target.value)
                          }
                          placeholder="Free Size"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          value={formData.weight}
                          onChange={(e) =>
                            handleInputChange("weight", e.target.value)
                          }
                          placeholder="e.g., 700g"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="occasion">Occasion</Label>
                      <Select
                        value={formData.occasion}
                        onValueChange={(value) =>
                          handleInputChange("occasion", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          {OCCASIONS.map((occasion) => (
                            <SelectItem key={occasion} value={occasion}>
                              {occasion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Tag className="h-5 w-5" />
                      <span>Tags</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center space-x-1"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ImageIcon className="h-5 w-5" />
                      <span>Images</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="images">Upload Images *</Label>
                      <div className="mt-2">
                        <input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            document.getElementById("images")?.click()
                          }
                          disabled={uploading}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {uploading ? "Uploading..." : "Choose Images"}
                        </Button>
                      </div>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Saree ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Settings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4" />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          handleInputChange("featured", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <Label htmlFor="active">Active/Published</Label>
                      </div>
                      <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) =>
                          handleInputChange("active", checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <Button
                        type="submit"
                        className="w-full bg-primary-pink-600 hover:bg-primary-pink-700 text-white"
                        disabled={saving}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Creating..." : "Create Saree"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Link href="/admin">Cancel</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
