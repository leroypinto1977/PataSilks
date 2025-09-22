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

    if (!authUser.user.email_confirmed_at) {
      return NextResponse.json(
        { error: "User email is already unverified" },
        { status: 400 }
      );
    }

    // Send password reset email (this will require re-verification)
    const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: authUser.user.email!,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
      }
    });

    if (resetError) {
      console.error("Error sending reset email:", resetError);
      return NextResponse.json(
        { error: "Failed to send reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: "Password reset email sent successfully. User will need to verify their email again."
    });
  } catch (error) {
    console.error("Error in reset password API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
