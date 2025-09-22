/**
 * Script to check profiles in the database
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

async function checkProfiles() {
  try {
    console.log("🔍 Checking profiles table...");

    // Get all profiles
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching profiles:", error.message);
      return;
    }

    console.log(`\n📊 Found ${profiles.length} profiles:`);
    console.log("================================");

    if (profiles.length === 0) {
      console.log("No profiles found.");
      console.log(
        "\n💡 This means users who signed up didn't get their profiles created."
      );
      console.log("📋 Solution:");
      console.log("1. Sign up for a new account on the website");
      console.log(
        "2. The improved auth context will create the profile automatically"
      );
      console.log("3. Then run: npm run admin:create");
    } else {
      profiles.forEach((profile, index) => {
        console.log(`${index + 1}. ${profile.email}`);
        console.log(`   ID: ${profile.id}`);
        console.log(`   Name: ${profile.full_name || "Not set"}`);
        console.log(`   Role: ${profile.role}`);
        console.log(
          `   Created: ${new Date(profile.created_at).toLocaleDateString()}`
        );
        console.log("");
      });
    }

    // Also check auth.users table to see if there are users without profiles
    console.log("\n🔍 Checking auth users...");
    const { data: authUsers, error: authError } =
      await supabase.auth.admin.listUsers();

    if (authError) {
      console.error("❌ Error fetching auth users:", authError.message);
      return;
    }

    console.log(`\n📊 Found ${authUsers.users.length} auth users:`);
    console.log("===================================");

    if (authUsers.users.length === 0) {
      console.log("No auth users found. You need to sign up first!");
    } else {
      authUsers.users.forEach((user, index) => {
        const hasProfile = profiles.some((p) => p.id === user.id);
        console.log(`${index + 1}. ${user.email}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Has Profile: ${hasProfile ? "✅" : "❌"}`);
        console.log(
          `   Created: ${new Date(user.created_at).toLocaleDateString()}`
        );
        console.log("");
      });

      // Find users without profiles
      const usersWithoutProfiles = authUsers.users.filter(
        (user) => !profiles.some((p) => p.id === user.id)
      );

      if (usersWithoutProfiles.length > 0) {
        console.log(
          `\n⚠️  Found ${usersWithoutProfiles.length} users without profiles:`
        );
        usersWithoutProfiles.forEach((user) => {
          console.log(`- ${user.email} (${user.id})`);
        });

        console.log("\n🔧 Creating missing profiles...");
        for (const user of usersWithoutProfiles) {
          try {
            // Use 'user' instead of 'user' to match the constraint
            const { error: insertError } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                email: user.email!,
                full_name: user.user_metadata?.full_name || null,
                role: "user", // This should match the check constraint
              });

            if (insertError) {
              console.error(
                `❌ Error creating profile for ${user.email}:`,
                insertError.message
              );
              console.error("Full error:", insertError);
            } else {
              console.log(`✅ Created profile for ${user.email}`);
            }
          } catch (error) {
            console.error(
              `❌ Error creating profile for ${user.email}:`,
              error
            );
          }
        }
      }
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

checkProfiles().catch(console.error);
