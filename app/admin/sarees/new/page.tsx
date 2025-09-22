"use client";

import { useState, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Upload,
  X,
  Camera,
  Star,
  Save,
  Eye,
  ImageIcon,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
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

// Fabric types
const FABRIC_TYPES = [
  "Pure Silk",
  "Art Silk",
  "Cotton Silk",
  "Georgette",
  "Chiffon",
  "Cotton",
  "Linen",
  "Crepe",
  "Net",
  "Organza",
  "Satin",
  "Velvet",
];

// Colors
const COLORS = [
  "Red",
  "Maroon",
  "Pink",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Navy Blue",
  "Purple",
  "Black",
  "White",
  "Cream",
  "Gold",
  "Silver",
  "Multi-Color",
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
  "Mehendi",
];

interface SareeImage {
  id: string;
  file?: File;
  url: string;
  alt?: string;
  isPrimary: boolean;
}

interface SareeFormData {
  name: string;
  description: string;
  category: string;
  fabric: string;
  color: string;
  occasion: string;
  price: number;
  originalPrice?: number;
  images: SareeImage[];
  featured: boolean;
  inStock: boolean;
  status: "active" | "draft";
  tags: string[];
  additionalDetails: {
    blousePiece: boolean;
    work: string;
    pattern: string;
    transparency: string;
    care: string;
  };
}

export default function NewSareePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState<SareeFormData>({
    name: "",
    description: "",
    category: "",
    fabric: "",
    color: "",
    occasion: "",
    price: 0,
    originalPrice: undefined,
    images: [],
    featured: false,
    inStock: true,
    status: "active",
    tags: [],
    additionalDetails: {
      blousePiece: true,
      work: "",
      pattern: "",
      transparency: "",
      care: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof SareeFormData | string,
    value: any
  ) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (files: File[]) => {
    const newImages: SareeImage[] = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
      isPrimary: formData.images.length === 0 && index === 0,
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      handleImageUpload(files);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);

    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      handleImageUpload(files);
    }
  };

  const removeImage = (imageId: string) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((img) => img.id !== imageId);

      // If we removed the primary image, make the first remaining image primary
      if (
        updatedImages.length > 0 &&
        !updatedImages.some((img) => img.isPrimary)
      ) {
        updatedImages[0].isPrimary = true;
      }

      return { ...prev, images: updatedImages };
    });
  };

  const setPrimaryImage = (imageId: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img) => ({
        ...img,
        isPrimary: img.id === imageId,
      })),
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Saree name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.fabric) newErrors.fabric = "Fabric type is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.occasion) newErrors.occasion = "Occasion is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.originalPrice && formData.originalPrice <= formData.price) {
      newErrors.originalPrice =
        "Original price should be higher than sale price";
    }
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (asDraft: boolean = false) => {
    const statusToSave = asDraft ? "draft" : formData.status;
    setFormData((prev) => ({ ...prev, status: statusToSave }));

    if (!asDraft && !validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would:
      // 1. Upload images to cloud storage (AWS S3, Cloudinary, etc.)
      // 2. Create saree record in database
      // 3. Handle errors appropriately

      console.log("Saving saree:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        `Saree ${asDraft ? "saved as draft" : "created"} successfully!`
      );
      router.push("/admin/sarees");
    } catch (error) {
      console.error("Error saving saree:", error);
      toast.error("Failed to save saree. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ImageUploadArea = () => (
    <Card className="border-2 border-dashed border-gray-300 hover:border-amber-400 transition-colors">
      <CardContent className="p-8">
        <div
          className={`text-center ${
            dragOver ? "bg-amber-50" : ""
          } p-4 rounded-lg transition-colors`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload Saree Images
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop images here, or click to select files
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Images
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: JPG, PNG, WEBP. Max size: 5MB per image.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/admin/sarees">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sarees
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Saree</h1>
            <p className="text-gray-600">
              Add a beautiful saree to your collection with detailed information
              and images
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Saree Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Royal Banarasi Silk Saree"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {SAREE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the saree's beauty, craftsmanship, and special features..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fabric">Fabric *</Label>
                <Select
                  value={formData.fabric}
                  onValueChange={(value) => handleInputChange("fabric", value)}
                >
                  <SelectTrigger
                    className={errors.fabric ? "border-red-500" : ""}
                  >
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
                {errors.fabric && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.fabric}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color *</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => handleInputChange("color", value)}
                >
                  <SelectTrigger
                    className={errors.color ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.color && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.color}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion *</Label>
                <Select
                  value={formData.occasion}
                  onValueChange={(value) =>
                    handleInputChange("occasion", value)
                  }
                >
                  <SelectTrigger
                    className={errors.occasion ? "border-red-500" : ""}
                  >
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
                {errors.occasion && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.occasion}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Current Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) =>
                    handleInputChange("price", parseInt(e.target.value) || 0)
                  }
                  placeholder="15000"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">
                  Original Price (₹) - For Sales
                </Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "originalPrice",
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  placeholder="18000"
                  className={errors.originalPrice ? "border-red-500" : ""}
                />
                <p className="text-xs text-gray-500">
                  Enter original price if this saree is on sale
                </p>
                {errors.originalPrice && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.originalPrice}
                  </p>
                )}
              </div>
            </div>

            {formData.originalPrice &&
              formData.originalPrice > formData.price && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Sale discount:{" "}
                    {Math.round(
                      ((formData.originalPrice - formData.price) /
                        formData.originalPrice) *
                        100
                    )}
                    % off
                  </AlertDescription>
                </Alert>
              )}
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Saree Images *</span>
              <Badge variant="outline">
                {formData.images.length} image
                {formData.images.length !== 1 ? "s" : ""}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.images.length === 0 && <ImageUploadArea />}

            {errors.images && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.images}</AlertDescription>
              </Alert>
            )}

            {formData.images.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((image) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group"
                    >
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-gray-200 hover:border-amber-400 transition-colors">
                        <Image
                          src={image.url}
                          alt="Saree"
                          fill
                          className="object-cover"
                        />

                        {image.isPrimary && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-green-600 text-white">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Primary
                            </Badge>
                          </div>
                        )}

                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        {!image.isPrimary && (
                          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => setPrimaryImage(image.id)}
                            >
                              <Star className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Add more images */}
                  <div
                    className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Add More</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Click the star icon to set an image as primary. The primary
                  image will be shown first in listings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="work">Work/Embellishment</Label>
                <Input
                  id="work"
                  value={formData.additionalDetails.work}
                  onChange={(e) =>
                    handleInputChange("additionalDetails.work", e.target.value)
                  }
                  placeholder="e.g., Zari work, Embroidery, Handloom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pattern">Pattern</Label>
                <Input
                  id="pattern"
                  value={formData.additionalDetails.pattern}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalDetails.pattern",
                      e.target.value
                    )
                  }
                  placeholder="e.g., Floral, Geometric, Abstract"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="transparency">Transparency</Label>
                <Select
                  value={formData.additionalDetails.transparency}
                  onValueChange={(value) =>
                    handleInputChange("additionalDetails.transparency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transparency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opaque">Opaque</SelectItem>
                    <SelectItem value="semi-transparent">
                      Semi-Transparent
                    </SelectItem>
                    <SelectItem value="transparent">Transparent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="care">Care Instructions</Label>
                <Input
                  id="care"
                  value={formData.additionalDetails.care}
                  onChange={(e) =>
                    handleInputChange("additionalDetails.care", e.target.value)
                  }
                  placeholder="e.g., Dry clean only, Hand wash"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="blousePiece"
                checked={formData.additionalDetails.blousePiece}
                onCheckedChange={(checked) =>
                  handleInputChange("additionalDetails.blousePiece", checked)
                }
              />
              <Label htmlFor="blousePiece">Includes blouse piece</Label>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags & Keywords</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tags (e.g., handwoven, traditional, zari)"
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
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-2"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Saree Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleInputChange("featured", checked)
                  }
                />
                <Label htmlFor="featured" className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Featured saree
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    handleInputChange("inStock", checked)
                  }
                />
                <Label htmlFor="inStock">In stock</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Publication Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "draft") =>
                  handleInputChange("status", value)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Active (Visible to customers)
                    </div>
                  </SelectItem>
                  <SelectItem value="draft">
                    <div className="flex items-center">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Draft (Hidden from customers)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/sarees")}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>

              <Button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isLoading}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                {isLoading ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Add Saree
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
