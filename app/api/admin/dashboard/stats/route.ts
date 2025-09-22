import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    // Get the current user session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profileError || !profile || (profile as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

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

    // For now, return mock data since we might not have the tables set up yet
    // You can replace this with actual database queries once your Supabase tables are configured

    const stats = {
      totalProducts: 25,
      totalCategories: 6,
      salesThisMonth: 12,
      totalRevenue: 1250000, // in paise (₹12,500)
      monthlyRevenue: 450000, // in paise (₹4,500)
      activeProducts: 23,
      outOfStock: 2,
      featuredProducts: 8,
      recentOrders: [
        {
          id: "1",
          customer_name: "Priya Sharma",
          total_amount: 159900, // in paise
          status: "CONFIRMED",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          customer_name: "Anita Reddy",
          total_amount: 259900,
          status: "PROCESSING",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          customer_name: "Meera Patel",
          total_amount: 189900,
          status: "SHIPPED",
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ],
      recentProducts: [
        {
          id: "1",
          name: "Royal Banarasi Silk Saree",
          price: 159900,
          active: true,
          featured: true,
          created_at: new Date().toISOString(),
          category: "Silk Sarees",
        },
        {
          id: "2",
          name: "Designer Kanjivaram",
          price: 259900,
          active: true,
          featured: false,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          category: "Traditional",
        },
        {
          id: "3",
          name: "Handwoven Cotton Saree",
          price: 89900,
          active: true,
          featured: true,
          created_at: new Date(Date.now() - 172800000).toISOString(),
          category: "Cotton Sarees",
        },
      ],
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
