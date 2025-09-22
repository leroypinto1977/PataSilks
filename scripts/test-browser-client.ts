/**
 * Test if the browser client can read from profiles table
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Use the same client as the browser
const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);

async function testBrowserClient() {
  const userId = "f6d2b41d-de90-492e-9bb9-6071fd28adf5";

  console.log("🔍 Testing browser client access to profiles table...");
  console.log("🔑 Using anon key (same as browser)");

  // Test 1: Try to read all profiles (should fail due to RLS)
  console.log("\n1. Testing read all profiles (should fail due to RLS):");
  const { data: allProfiles, error: allError } = await supabaseBrowser
    .from("profiles")
    .select("*");

  console.log("Result:", { allProfiles, allError });

  // Test 2: Try to read specific user profile (should also fail without auth)
  console.log("\n2. Testing read specific profile (should fail - no auth):");
  const { data: specificProfile, error: specificError } = await supabaseBrowser
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  console.log("Result:", { specificProfile, specificError });

  // Test 3: Check if we can authenticate
  console.log("\n3. Testing authentication with browser client:");
  const { data: sessionData, error: sessionError } =
    await supabaseBrowser.auth.getSession();
  console.log("Session:", { sessionData, sessionError });

  if (sessionData.session) {
    console.log("\n4. Testing profile access with authenticated session:");
    const { data: authProfile, error: authError } = await supabaseBrowser
      .from("profiles")
      .select("*")
      .eq("id", sessionData.session.user.id)
      .single();

    console.log("Auth profile result:", { authProfile, authError });
  } else {
    console.log("\n4. No session found - this is likely the issue!");
    console.log(
      "   The browser client needs to be authenticated to read profiles."
    );
  }
}

testBrowserClient().catch(console.error);
