import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const supabaseAdmin = createSupabaseAdminClient();

    // Get user info
    const { data: authUser, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (getUserError) {
      console.error("Error getting user:", getUserError);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Block the user by setting them as banned
    const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      ban_duration: "876000h" // ~100 years (permanent ban)
    });

    if (banError) {
      console.error("Error banning user:", banError);
      return NextResponse.json(
        { error: "Failed to suspend user" },
        { status: 500 }
      );
    }

    // Update profile to mark as suspended
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ 
        suspended: true,
        suspended_at: new Date().toISOString()
      })
      .eq("id", userId);

    if (profileError) {
      console.error("Error updating profile suspension status:", profileError);
    }

    return NextResponse.json({ 
      message: "User suspended successfully",
      suspendedUser: authUser.user.email 
    });
  } catch (error) {
    console.error("Error in user suspension API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const supabaseAdmin = createSupabaseAdminClient();

    // Unban the user
    const { error: unbanError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      ban_duration: "none"
    });

    if (unbanError) {
      console.error("Error unbanning user:", unbanError);
      return NextResponse.json(
        { error: "Failed to reactivate user" },
        { status: 500 }
      );
    }

    // Update profile to remove suspension
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ 
        suspended: false,
        suspended_at: null
      })
      .eq("id", userId);

    if (profileError) {
      console.error("Error removing profile suspension:", profileError);
    }

    return NextResponse.json({ 
      message: "User reactivated successfully"
    });
  } catch (error) {
    console.error("Error in user reactivation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
