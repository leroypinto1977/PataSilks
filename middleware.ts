import { createSupabaseMiddlewareClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create admin client for middleware profile checks
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function middleware(request: NextRequest) {
  console.log("🚀 Middleware triggered for path:", request.nextUrl.pathname);

  const supabase = createSupabaseMiddlewareClient(request);

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("🔐 Session check:", {
    hasSession: !!session,
    userId: session?.user?.id,
    userEmail: session?.user?.email,
  });

  // Check if the route requires authentication
  const protectedPaths = ["/admin", "/profile"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If accessing admin routes, check for admin role
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("🏛️ Admin route accessed:", request.nextUrl.pathname);

    if (!session) {
      console.log("❌ No session found, redirecting to signin");
      // Redirect to signin if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin";
      url.searchParams.set("redirectTo", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    console.log(
      "👤 Session found, checking admin role for user:",
      session.user.id
    );

    // Check if user is admin using admin client
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    console.log("🔍 Middleware admin check:", {
      userId: session.user.id,
      profile,
      profileError: profileError?.message || profileError,
      isAdmin: profile?.role === "ADMIN",
    });

    if (profileError || !profile || profile.role !== "ADMIN") {
      console.log("❌ Access denied - user is not admin or profile not found", {
        hasProfileError: !!profileError,
        profileErrorMessage: profileError?.message,
        hasProfile: !!profile,
        userRole: profile?.role,
      });
      // Redirect non-admin users to home
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    console.log("✅ Admin access granted - proceeding to admin page");
    return NextResponse.next();
  }

  // If accessing other protected paths, just check authentication
  if (isProtectedPath && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If accessing auth pages while already authenticated, redirect based on role
  if (request.nextUrl.pathname.startsWith("/auth/signin") && session) {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    const redirectTo = request.nextUrl.searchParams.get("redirectTo");
    const url = request.nextUrl.clone();

    // Redirect admin users to admin dashboard, regular users to redirectTo or home
    if (!profileError && profile && profile.role === "ADMIN") {
      url.pathname =
        redirectTo && redirectTo.startsWith("/admin") ? redirectTo : "/admin";
    } else {
      url.pathname = redirectTo || "/";
    }

    url.searchParams.delete("redirectTo");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
