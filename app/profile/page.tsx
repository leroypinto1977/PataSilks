"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Calendar, Shield, Edit3, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, userProfile, refreshProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.full_name || "",
        email: userProfile.email || "",
      });
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          fullName: formData.fullName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Profile updated successfully!");
        await refreshProfile();
        setIsEditing(false);
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (error) {
      setError("An error occurred while updating your profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: userProfile?.full_name || "",
      email: userProfile?.email || "",
    });
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-premium-beige flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rich-beige"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-premium-beige flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Please Sign In
            </h2>
            <p className="text-gray-600 mb-4">
              You need to be signed in to view your profile.
            </p>
            <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              My Profile
            </h1>
            <p className="text-lg text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Card */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-rich-beige" />
                  <span>Profile Information</span>
                </CardTitle>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="border-rich-beige/20 hover:bg-rich-beige/5"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* User Role */}
              <div className="flex items-center space-x-2 p-3 bg-rich-beige/10 rounded-lg">
                <Shield className="h-4 w-4 text-rich-beige" />
                <span className="text-sm font-medium text-gray-700">
                  Role:{" "}
                  {userProfile?.role === "admin" ? "Administrator" : "Customer"}
                </span>
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-gray-50"}
                  />
                </div>
              </div>

              {/* Account Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Member Since
                    </p>
                    <p className="text-sm text-gray-600">
                      {userProfile?.created_at
                        ? new Date(userProfile.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Account Status
                    </p>
                    <p className="text-sm text-green-600">Active</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-rich-beige hover:bg-rich-beige/90 text-white"
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="border-rich-beige/20 hover:bg-rich-beige/5"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/wishlist")}
                    className="border-rich-beige/20 hover:bg-rich-beige/5"
                  >
                    View Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/cart")}
                    className="border-rich-beige/20 hover:bg-rich-beige/5"
                  >
                    View Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
