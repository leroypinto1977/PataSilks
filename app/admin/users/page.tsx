"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  Shield,
  ShieldOff,
  MoreVertical,
  UserX,
  Crown,
  Mail,
  Calendar,
  Filter,
  Ban,
  RotateCcw,
  Key,
  Trash2,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: "USER" | "ADMIN";
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  suspended?: boolean;
  suspended_at?: string | null;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "USER" | "ADMIN">("ALL");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to load users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (
    userId: string,
    newRole: "USER" | "ADMIN"
  ) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error("Failed to update user role");

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update user role");
      console.error("Error updating user role:", error);
    }
  };

  const handleRevokeUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/revoke`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to revoke user");

      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User access revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke user access");
      console.error("Error revoking user:", error);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to suspend user");

      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                suspended: true,
                suspended_at: new Date().toISOString(),
              }
            : user
        )
      );
      toast.success("User suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend user");
      console.error("Error suspending user:", error);
    }
  };

  const handleReactivateUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to reactivate user");

      setUsers(
        users.map((user) =>
          user.id === userId
            ? { ...user, suspended: false, suspended_at: null }
            : user
        )
      );
      toast.success("User reactivated successfully");
    } catch (error) {
      toast.error("Failed to reactivate user");
      console.error("Error reactivating user:", error);
    }
  };

  const handleResetPassword = async (userId: string) => {
    try {
      const response = await fetch(
        `/api/admin/users/${userId}/reset-password`,
        {
          method: "POST",
        }
      );

      if (!response.ok) throw new Error("Failed to send reset email");

      toast.success("Password reset email sent successfully");
    } catch (error) {
      toast.error("Failed to send password reset email");
      console.error("Error sending reset email:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{filteredUsers.length} users</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-10 w-10 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {users.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Crown className="h-10 w-10 text-primary-brown-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Admins
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter((u) => u.role === "ADMIN").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-10 w-10 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Regular Users
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter((u) => u.role === "USER").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-10 w-10 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Verified
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter((u) => u.email_confirmed_at).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Ban className="h-10 w-10 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Suspended
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {users.filter((u) => u.suspended).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={roleFilter === "ALL" ? "default" : "outline"}
                  onClick={() => setRoleFilter("ALL")}
                  size="sm"
                >
                  All Users
                </Button>
                <Button
                  variant={roleFilter === "ADMIN" ? "default" : "outline"}
                  onClick={() => setRoleFilter("ADMIN")}
                  size="sm"
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Admins
                </Button>
                <Button
                  variant={roleFilter === "USER" ? "default" : "outline"}
                  onClick={() => setRoleFilter("USER")}
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Users
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-foreground">Users List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-brown-600"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Sign In</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-muted text-muted-foreground">
                              {user.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {user.full_name || "No name"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "ADMIN" ? "default" : "secondary"
                          }
                          className={
                            user.role === "ADMIN"
                              ? "bg-primary-brown-100 text-primary-brown-800 hover:bg-primary-brown-200"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }
                        >
                          {user.role === "ADMIN" ? (
                            <>
                              <Crown className="h-3 w-3 mr-1" />
                              Admin
                            </>
                          ) : (
                            <>
                              <Shield className="h-3 w-3 mr-1" />
                              User
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              user.email_confirmed_at
                                ? "default"
                                : "destructive"
                            }
                            className={
                              user.email_confirmed_at
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {user.email_confirmed_at
                              ? "Verified"
                              : "Unverified"}
                          </Badge>
                          {user.suspended && (
                            <Badge
                              variant="destructive"
                              className="bg-orange-100 text-orange-800"
                            >
                              Suspended
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(user.created_at)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(user.last_sign_in_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {/* Role Management */}
                            {user.role === "USER" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "ADMIN")
                                }
                                className="text-purple-600 hover:text-purple-700"
                              >
                                <Crown className="h-4 w-4 mr-2" />
                                Make Admin
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "USER")
                                }
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <ShieldOff className="h-4 w-4 mr-2" />
                                Remove Admin
                              </DropdownMenuItem>
                            )}

                            {/* Account Management */}
                            <DropdownMenuItem
                              onClick={() => handleResetPassword(user.id)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <Key className="h-4 w-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>

                            {/* Suspension Management */}
                            {user.suspended ? (
                              <DropdownMenuItem
                                onClick={() => handleReactivateUser(user.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <UserCheck className="h-4 w-4 mr-2" />
                                Reactivate User
                              </DropdownMenuItem>
                            ) : (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-yellow-600 hover:text-yellow-700"
                                  >
                                    <Ban className="h-4 w-4 mr-2" />
                                    Suspend User
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Suspend User Account
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to suspend{" "}
                                      {user.email}? This will prevent them from
                                      signing in, but their account and data
                                      will remain intact. You can reactivate
                                      them later.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleSuspendUser(user.id)}
                                      className="bg-yellow-600 hover:bg-yellow-700"
                                    >
                                      Suspend User
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}

                            {/* Permanent Actions */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Revoke Access
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Revoke User Access
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to permanently revoke
                                    access for {user.email}? This action cannot
                                    be undone and will permanently delete their
                                    account and all associated data including
                                    orders and profile information.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRevokeUser(user.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Permanently Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
