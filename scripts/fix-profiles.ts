/**
 * Script to fix profiles and create missing ones
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixProfiles() {
  try {
    console.log("🔧 Fixing profiles and creating missing ones...");

    // Get all auth users
    const { data: authUsers, error: authError } =
      await supabase.auth.admin.listUsers();

    if (authError) {
      console.error("❌ Error fetching auth users:", authError.message);
      return;
    }

    console.log(`Found ${authUsers.users.length} auth users`);

    for (const user of authUsers.users) {
      try {
        console.log(`\n🔄 Processing ${user.email}...`);

        // Try different role values to see which one works
        const roleVariants = ["user", "USER", "User"];
        let success = false;

        for (const roleValue of roleVariants) {
          try {
            const { data, error: insertError } = await supabase
              .from("profiles")
              .upsert(
                {
                  id: user.id,
                  email: user.email!,
                  full_name:
                    user.user_metadata?.full_name ||
                    user.email?.split("@")[0] ||
                    null,
                  role: roleValue,
                },
                {
                  onConflict: "id",
                }
              )
              .select();

            if (!insertError) {
              console.log(
                `✅ Profile created/updated for ${user.email} with role: ${roleValue}`
              );
              success = true;
              break;
            } else {
              console.log(
                `❌ Failed with role '${roleValue}':`,
                insertError.message
              );
            }
          } catch (error) {
            console.log(`❌ Error with role '${roleValue}':`, error);
          }
        }

        if (!success) {
          console.error(
            `❌ Could not create profile for ${user.email} with any role variant`
          );
        }
      } catch (error) {
        console.error(`❌ Error processing user ${user.email}:`, error);
      }
    }

    // Now check what we have
    console.log("\n📊 Current profiles:");
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profileError) {
      console.error("❌ Error fetching profiles:", profileError.message);
      return;
    }

    profiles.forEach((profile, index) => {
      console.log(`${index + 1}. ${profile.email} (Role: ${profile.role})`);
    });

    console.log(
      "\n🎉 Done! Now you can run 'npm run admin:create' to make a user admin."
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

fixProfiles().catch(console.error);
