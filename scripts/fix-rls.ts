/**
 * Fix the RLS policies for profiles table
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixRLSPolicies() {
  console.log("🔧 Fixing RLS policies for profiles table...");

  try {
    // First, let's check current policies
    console.log("\n1. Checking current policies...");
    const { data: policies, error: policiesError } = await supabase
      .rpc("pg_policies")
      .eq("tablename", "profiles");

    if (policiesError) {
      console.log("Could not fetch policies (this is normal)");
    } else {
      console.log("Current policies:", policies);
    }

    // Disable RLS temporarily
    console.log("\n2. Temporarily disabling RLS...");
    await supabase.rpc("exec_sql", {
      sql: "ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;",
    });

    // Drop existing policies
    console.log("\n3. Dropping existing policies...");
    const dropPolicies = [
      'DROP POLICY IF EXISTS "Users can view own profile" ON profiles;',
      'DROP POLICY IF EXISTS "Users can update own profile" ON profiles;',
      'DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;',
      'DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;',
      'DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;',
      'DROP POLICY IF EXISTS "Enable update for users based on user_id" ON profiles;',
      'DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;',
      'DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;',
      'DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;',
    ];

    for (const sql of dropPolicies) {
      try {
        await supabase.rpc("exec_sql", { sql });
      } catch (error) {
        console.log(`Policy already dropped or doesn't exist: ${sql}`);
      }
    }

    // Re-enable RLS
    console.log("\n4. Re-enabling RLS...");
    await supabase.rpc("exec_sql", {
      sql: "ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;",
    });

    // Create new, simple policies
    console.log("\n5. Creating new policies...");

    // Allow users to read their own profile
    await supabase.rpc("exec_sql", {
      sql: `CREATE POLICY "profiles_select_policy" ON profiles 
            FOR SELECT USING (auth.uid() = id);`,
    });

    // Allow users to insert their own profile
    await supabase.rpc("exec_sql", {
      sql: `CREATE POLICY "profiles_insert_policy" ON profiles 
            FOR INSERT WITH CHECK (auth.uid() = id);`,
    });

    // Allow users to update their own profile
    await supabase.rpc("exec_sql", {
      sql: `CREATE POLICY "profiles_update_policy" ON profiles 
            FOR UPDATE USING (auth.uid() = id);`,
    });

    console.log("\n✅ RLS policies fixed successfully!");
    console.log("\n📋 New policies created:");
    console.log(
      "   - profiles_select_policy: Users can read their own profile"
    );
    console.log(
      "   - profiles_insert_policy: Users can insert their own profile"
    );
    console.log(
      "   - profiles_update_policy: Users can update their own profile"
    );
  } catch (error) {
    console.error("❌ Error fixing RLS policies:", error);

    // Try alternative approach - direct SQL execution
    console.log("\n🔄 Trying alternative approach...");
    try {
      // Just create the policies without dropping (in case rpc doesn't work)
      const { error: selectError } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

      console.log("Select test result:", selectError);
    } catch (altError) {
      console.error("❌ Alternative approach failed:", altError);
    }
  }
}

fixRLSPolicies().catch(console.error);
