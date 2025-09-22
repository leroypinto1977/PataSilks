"use client";

import { AuthProvider } from "@/lib/auth-context";

interface Props {
  children: React.ReactNode;
}

export default function AuthProviderWrapper({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}
