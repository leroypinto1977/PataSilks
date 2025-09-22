import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const supabaseAdmin = createSupabaseAdminClient();

    // First, get user info for logging
    const { data: authUser, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (getUserError) {
      console.error("Error getting user:", getUserError);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete all user-related data first
    const { error: ordersError } = await supabaseAdmin
      .from("orders")
      .delete()
      .eq("user_id", userId);

    if (ordersError) {
      console.error("Error deleting user orders:", ordersError);
    }

    const { error: cartError } = await supabaseAdmin
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (cartError) {
      console.error("Error deleting user cart:", cartError);
    }

    // Delete the user's profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.error("Error deleting user profile:", profileError);
    }

    // Finally, delete the user from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authError) {
      console.error("Error deleting user from auth:", authError);
      return NextResponse.json(
        { error: "Failed to revoke user access" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: "User access revoked successfully",
      deletedUser: authUser.user.email 
    });
  } catch (error) {
    console.error("Error in user revocation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
