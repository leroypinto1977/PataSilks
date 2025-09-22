import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { Database } from "@/types/database";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function GET() {
  try {
    const supabaseAdmin = createSupabaseAdminClient();

    // Get all users from auth.users table
    const { data: authUsers, error: authError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (authError) {
      console.error("Error fetching auth users:", authError);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }

    // Get profiles for additional info
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("*");

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      return NextResponse.json(
        { error: "Failed to fetch user profiles" },
        { status: 500 }
      );
    }

    // Combine auth users with profile data
    const users = authUsers.users.map((authUser) => {
      const profile = profiles?.find((p: Profile) => p.id === authUser.id);
      return {
        id: authUser.id,
        email: authUser.email,
        full_name: profile?.full_name || null,
        role: profile?.role || "user",
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at,
        email_confirmed_at: authUser.email_confirmed_at,
        avatar_url: profile?.avatar_url || null,
      };
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error in users API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
