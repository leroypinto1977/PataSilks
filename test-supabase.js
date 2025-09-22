// Test Supabase connection using direct API calls
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

async function testSupabaseConnection() {
  console.log("🔍 Testing Supabase connection...");
  console.log("🌐 Supabase URL:", supabaseUrl);
  console.log("🔑 Anon Key present:", !!supabaseAnonKey);
  console.log("🔐 Secret/Service Key present:", !!supabaseSecretKey);

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing basic Supabase configuration!");
    console.log("Please check your .env file has:");
    console.log("NEXT_PUBLIC_SUPABASE_URL=...");
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=...");
    return false;
  }

  try {
    // Test with anon key first
    console.log("\n📡 Testing with anon key...");
    const anonClient = createClient(supabaseUrl, supabaseAnonKey);

    const { data: pingData, error: pingError } = await anonClient
      .from("categories")
      .select("count(*)")
      .limit(1);

    if (pingError) {
      console.log("⚠️  Anon key test result:", pingError.message);
    } else {
      console.log("✅ Anon key works!");
    }

    // Test with secret/service key if available
    if (supabaseSecretKey) {
      console.log("\n� Testing with secret/service key...");
      const adminClient = createClient(supabaseUrl, supabaseSecretKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { data: adminData, error: adminError } = await adminClient
        .from("categories")
        .select("count(*)")
        .limit(1);

      if (adminError) {
        console.error("❌ Admin client failed:", adminError.message);
        console.log("\n🔧 To fix this, you need a proper secret key:");
        console.log(
          "1. Go to: https://supabase.com/dashboard/project/hpqxfoqlznwpmfysatig/settings/api"
        );
        console.log(
          '2. Look for "Secret keys" section (new format starts with "sb_secret_")'
        );
        console.log(
          '3. If not available, copy the "service_role" JWT key instead'
        );
        console.log(
          "4. Add to .env: SUPABASE_SECRET_KEY=sb_secret_... or SUPABASE_SERVICE_ROLE_KEY=eyJ..."
        );
        return false;
      } else {
        console.log("✅ Admin access works!");
        console.log("📊 Admin test result:", adminData);
        return true;
      }
    } else {
      console.log("\n⚠️  No secret/service key found in environment");
      console.log("🔧 Add one of these to your .env file:");
      console.log("SUPABASE_SECRET_KEY=sb_secret_... (modern, recommended)");
      console.log("SUPABASE_SERVICE_ROLE_KEY=eyJ... (legacy JWT)");
      return false;
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return false;
  }
}

// Run the test
testSupabaseConnection().then((success) => {
  if (success) {
    console.log("\n🎉 All tests passed! Your Supabase setup is ready.");
  } else {
    console.log("\n🚨 Setup incomplete. Please follow the instructions above.");
  }
  process.exit(success ? 0 : 1);
});
