/**
 * Script to check a specific user's profile
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSpecificUser() {
  const userId = "f6d2b41d-de90-492e-9bb9-6071fd28adf5"; // Your user ID from the debug page
  const userEmail = "leroypinto1977@gmail.com";

  console.log(`🔍 Checking user: ${userEmail}`);
  console.log(`📋 User ID: ${userId}\n`);

  // Check auth user
  console.log("1. Checking auth.users table...");
  const { data: authUser, error: authError } =
    await supabase.auth.admin.getUserById(userId);

  if (authError) {
    console.error("❌ Auth user error:", authError);
  } else {
    console.log("✅ Auth user found:", {
      id: authUser.user?.id,
      email: authUser.user?.email,
      created_at: authUser.user?.created_at,
    });
  }

  // Check profile
  console.log("\n2. Checking profiles table...");
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("❌ Profile error:", profileError);

    // Try to find by email instead
    console.log("\n3. Trying to find by email...");
    const { data: profileByEmail, error: emailError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (emailError) {
      console.error("❌ Profile by email error:", emailError);
      console.log("\n🚨 PROFILE NOT FOUND! This is the issue.");
      console.log("   The user exists in auth but has no profile row.");
    } else {
      console.log("✅ Profile found by email:", profileByEmail);
    }
  } else {
    console.log("✅ Profile found:", profile);
    console.log(`   Role: ${profile.role}`);
    console.log(`   Is Admin: ${profile.role === "ADMIN"}`);
  }

  // Check all profiles to see what we have
  console.log("\n4. All profiles in table:");
  const { data: allProfiles, error: allError } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false });

  if (allError) {
    console.error("❌ Error fetching all profiles:", allError);
  } else {
    console.log("📊 Found profiles:", allProfiles?.length || 0);
    allProfiles?.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.email} (${p.role}) - ID: ${p.id}`);
    });
  }
}

checkSpecificUser().catch(console.error);
