import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Profile } from "@/types/database";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const supabaseAdmin = createSupabaseAdminClient();

  // Check authentication and admin role
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/signin?redirectTo=/admin");
  }

  // Check if user is admin using admin client to bypass RLS
  const { data: profile, error } = (await supabaseAdmin
    .from("profiles")
    .select("role, full_name")
    .eq("id", session.user.id)
    .single()) as {
    data: { role: "USER" | "ADMIN"; full_name: string | null } | null;
    error: any;
  };

  console.log("🏛️ Admin layout check:", {
    profile,
    error,
    userId: session.user.id,
  });

  if (error || !profile || profile.role !== "ADMIN") {
    console.log("❌ Admin layout redirecting to home - not admin role");
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-admin-dark admin-layout">
      <AdminSidebar
        user={{
          name: profile.full_name || session.user.email || "Admin",
          email: session.user.email || "",
          role: profile.role.toLowerCase() as "user" | "admin",
        }}
      />
      <main className="flex-1 bg-admin-dark">{children}</main>
    </div>
  );
}
