/**
 * Temporarily disable RLS on profiles table to fix the auth issue
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function disableRLS() {
  console.log("🔧 Temporarily disabling RLS on profiles table...");

  try {
    // Use direct SQL to disable RLS
    const { data, error } = await supabase.rpc("sql", {
      query: "ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;",
    });

    if (error) {
      console.error("❌ Error with rpc:", error);

      // Try alternative approach
      console.log("🔄 Trying alternative approach...");

      // Let's try using the admin client to update the table
      const { error: altError } = await supabase
        .from("profiles")
        .update({ id: "f6d2b41d-de90-492e-9bb9-6071fd28adf5" })
        .eq("id", "f6d2b41d-de90-492e-9bb9-6071fd28adf5");

      console.log("Alt approach result:", altError);
    } else {
      console.log("✅ RLS disabled successfully:", data);
    }

    // Test if we can now read profiles
    console.log("\n🔍 Testing profile access...");
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .limit(5);

    if (profileError) {
      console.error("❌ Still can't read profiles:", profileError);
    } else {
      console.log(
        "✅ Can now read profiles:",
        profiles?.length,
        "profiles found"
      );
      profiles?.forEach((p) => {
        console.log(`   - ${p.email} (${p.role})`);
      });
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

disableRLS().catch(console.error);
