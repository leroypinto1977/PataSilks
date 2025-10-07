import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();

    // For now, we'll bypass authentication to test the data flow
    // In production, you should implement proper authentication

    // TODO: Implement proper authentication
    // const {
    //   data: { session },
    //   error: sessionError,
    // } = await supabase.auth.getSession();

    // if (sessionError || !session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // // Check if user is admin
    // const { data: profile, error: profileError } = await supabase
    //   .from("profiles")
    //   .select("role")
    //   .eq("id", session.user.id)
    //   .single();

    // if (profileError || !profile || (profile as any).role !== "ADMIN") {
    //   return NextResponse.json(
    //     { error: "Admin access required" },
    //     { status: 403 }
    //   );
    // }

    // Get dashboard statistics
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const startOfMonth = new Date(
      currentYear,
      currentMonth - 1,
      1
    ).toISOString();
    const endOfMonth = new Date(
      currentYear,
      currentMonth,
      0,
      23,
      59,
      59
    ).toISOString();

    // Get real data from database
    const [
      productsResult,
      categoriesResult,
      ordersResult,
      recentProductsResult,
    ] = await Promise.all([
      // Get products count and stats
      supabase
        .from("products")
        .select("id, active, featured, in_stock, price, created_at"),

      // Get categories count
      supabase.from("categories").select("id"),

      // Get orders (if orders table exists)
      supabase
        .from("orders")
        .select("id, total_amount, status, created_at, customer_name")
        .gte("created_at", startOfMonth)
        .lte("created_at", endOfMonth),

      // Get recent products
      supabase
        .from("products")
        .select(
          `
          id,
          name,
          price,
          active,
          featured,
          created_at,
          category:categories(name)
        `
        )
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    const products = productsResult.data || [];
    const categories = categoriesResult.data || [];
    const orders = ordersResult.data || [];
    const recentProducts = recentProductsResult.data || [];

    // Calculate statistics
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const activeProducts = products.filter((p) => p.active).length;
    const outOfStock = products.filter((p) => !p.in_stock).length;
    const featuredProducts = products.filter((p) => p.featured).length;

    // Calculate revenue
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.total_amount || 0),
      0
    );
    const monthlyRevenue = orders.reduce(
      (sum, order) => sum + (order.total_amount || 0),
      0
    );

    // Get recent orders (last 5)
    const recentOrders = orders
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 5);

    const stats = {
      totalProducts,
      totalCategories,
      salesThisMonth: orders.length,
      totalRevenue,
      monthlyRevenue,
      activeProducts,
      outOfStock,
      featuredProducts,
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        customer_name: order.customer_name || "Unknown Customer",
        total_amount: order.total_amount || 0,
        status: order.status || "PENDING",
        created_at: order.created_at,
      })),
      recentProducts: recentProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        active: product.active,
        featured: product.featured,
        created_at: product.created_at,
        category: product.category?.name || "Unknown",
      })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
