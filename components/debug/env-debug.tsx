"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

export function EnvDebug() {
  const [showSecrets, setShowSecrets] = useState(false);

  const envVars = {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID
      ? "Set (server-side)"
      : "Not set",
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET
      ? "Set (server-side)"
      : "Not set",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "Set"
      : "Not set",
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  };

  const isTestMode = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes("test");

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Environment Variables Debug</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSecrets(!showSecrets)}
            >
              {showSecrets ? <EyeOff size={16} /> : <Eye size={16} />}
              {showSecrets ? "Hide" : "Show"} Secrets
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <span>Mode:</span>
          <Badge
            className={
              isTestMode
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }
          >
            {isTestMode ? "Test Mode" : "Live Mode"}
          </Badge>
        </div>

        <div className="space-y-3">
          {Object.entries(envVars).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-mono text-sm font-medium">{key}</span>
              <div className="flex items-center space-x-2">
                {value ? (
                  <Badge className="bg-green-100 text-green-800">✓ Set</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">✗ Missing</Badge>
                )}
                {showSecrets && value && (
                  <span className="font-mono text-xs bg-white px-2 py-1 rounded border">
                    {typeof value === "string" && value.length > 20
                      ? `${value.substring(0, 20)}...`
                      : value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Debug Steps:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Check if all required variables are set</li>
            <li>2. Ensure Razorpay key starts with "rzp_test_" for testing</li>
            <li>3. Restart the development server after changing .env.local</li>
            <li>4. Check browser console for errors</li>
            <li>5. Check server logs for API errors</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
