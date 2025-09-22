/**
 * Quick script to force update a user to admin and verify
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function forceAdminUpdate() {
  const userEmail = "leroypinto1977@gmail.com";
  const userId = "f6d2b41d-de90-492e-9bb9-6071fd28adf5";

  console.log(`🔧 Force updating ${userEmail} to ADMIN...`);

  // Force update the profile
  const { data: updateResult, error: updateError } = await supabase
    .from("profiles")
    .update({
      role: "ADMIN",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select();

  if (updateError) {
    console.error("❌ Update error:", updateError);
    return;
  }

  console.log("✅ Profile updated:", updateResult);

  // Verify the update
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error("❌ Verification error:", fetchError);
    return;
  }

  console.log("🔍 Verification result:");
  console.log(`   Email: ${profile.email}`);
  console.log(`   Role: ${profile.role}`);
  console.log(`   Updated: ${profile.updated_at}`);
  console.log(`   Is Admin: ${profile.role === "ADMIN"}`);

  console.log(
    "\n🎉 Done! Now refresh your browser page and try the refresh button."
  );
}

forceAdminUpdate().catch(console.error);
