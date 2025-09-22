"use client";

import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DebugAuthPage() {
  const { user, session, isLoading, isAdmin, userProfile, refreshProfile } =
    useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-6">
            <p>Loading authentication data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Authentication Debug</h1>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>User:</strong> {user ? "Logged in" : "Not logged in"}
          </div>

          {user && (
            <>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>User ID:</strong> {user.id}
              </div>
              <div>
                <strong>Is Admin:</strong>{" "}
                <Badge variant={isAdmin ? "default" : "secondary"}>
                  {isAdmin ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <strong>Session:</strong> {session ? "Active" : "No session"}
              </div>
            </>
          )}

          {!user && (
            <div>
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap">
                <Link href="/admin">
                  <Button>Try Admin Dashboard</Button>
                </Link>
                <Link href="/admin/collections">
                  <Button>Try Collections</Button>
                </Link>
                <Button onClick={refreshProfile} variant="outline">
                  🔄 Refresh Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raw Data (for debugging)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(
              {
                user: user
                  ? {
                      id: user.id,
                      email: user.email,
                      created_at: user.created_at,
                    }
                  : null,
                session: session
                  ? {
                      access_token: session.access_token
                        ? "Present"
                        : "Missing",
                      refresh_token: session.refresh_token
                        ? "Present"
                        : "Missing",
                      expires_at: session.expires_at,
                    }
                  : null,
                isAdmin,
                isLoading,
                userProfile: userProfile || "No profile loaded",
                // Debug the isAdmin calculation
                debugIsAdmin: {
                  userProfileExists: !!userProfile,
                  userProfileRole: userProfile?.role || "No role",
                  roleCheck: `"${userProfile?.role}" === "ADMIN"`,
                  result: userProfile?.role === "ADMIN",
                },
              },
              null,
              2
            )}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
