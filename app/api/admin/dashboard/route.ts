import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseAdmin = createSupabaseAdminClient();

    // Get total users count
    const { data: authUsers, error: usersError } =
      await supabaseAdmin.auth.admin.listUsers();
    const totalUsers = authUsers?.users?.length || 0;

    // Get admin users count
    const { data: adminProfiles, error: adminError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("role", "admin");
    const adminUsers = adminProfiles?.length || 0;

    // Get total orders count and revenue
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("id, total, status, payment_status, created_at");

    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 }
      );
    }

    const totalOrders = orders?.length || 0;
    const totalRevenue =
      orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

    // Calculate pending orders
    const pendingOrders =
      orders?.filter((order) => order.status === "PENDING").length || 0;

    // Calculate paid orders
    const paidOrders =
      orders?.filter((order) => order.payment_status === "PAID").length || 0;

    // Get total products count
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, active, in_stock, sold, created_at");

    if (productsError) {
      console.error("Error fetching products:", productsError);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    const totalProducts = products?.length || 0;
    const activeProducts =
      products?.filter((product) => product.active).length || 0;
    const inStockProducts =
      products?.filter((product) => product.in_stock).length || 0;
    const soldProducts =
      products?.filter((product) => product.sold).length || 0;

    // Get total categories count
    const { data: categories, error: categoriesError } = await supabaseAdmin
      .from("categories")
      .select("id");

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: 500 }
      );
    }

    const totalCategories = categories?.length || 0;

    // Calculate recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();

    const recentOrders =
      orders?.filter((order) => new Date(order.created_at) > thirtyDaysAgo)
        .length || 0;

    const recentProducts =
      products?.filter(
        (product) => new Date(product.created_at) > thirtyDaysAgo
      ).length || 0;

    // Calculate conversion metrics
    const conversionRate = totalUsers > 0 ? (paidOrders / totalUsers) * 100 : 0;

    return NextResponse.json({
      stats: {
        users: {
          total: totalUsers,
          admins: adminUsers,
          regular: totalUsers - adminUsers,
        },
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          paid: paidOrders,
          recent: recentOrders,
        },
        products: {
          total: totalProducts,
          active: activeProducts,
          inStock: inStockProducts,
          sold: soldProducts,
          recent: recentProducts,
        },
        categories: {
          total: totalCategories,
        },
        revenue: {
          total: totalRevenue,
          avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        },
        metrics: {
          conversionRate: Math.round(conversionRate * 100) / 100,
        },
      },
    });
  } catch (error) {
    console.error("Error in dashboard stats API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
