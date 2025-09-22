/**
 * Script to create an admin user
 *
 * Usage:
 * 1. First, create a user account through the sign-up process
 * 2. Then run this script to upgrade them to admin
 *
 * To run: npx tsx scripts/create-admin.ts
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as readline from "readline";

// Load environment variables from .env.local
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Service role key needed for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing environment variables:");
  console.error("- NEXT_PUBLIC_SUPABASE_URL");
  console.error("- SUPABASE_SERVICE_ROLE_KEY");
  console.error("\nPlease add these to your .env.local file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createAdmin(emailParam?: string) {
  try {
    console.log("🔧 Patta Silks Admin Creator");
    console.log("==========================\n");

    const email =
      emailParam ||
      (await askQuestion("Enter the email address to make admin: "));

    if (!email || !email.includes("@")) {
      console.error("❌ Please enter a valid email address");
      process.exit(1);
    }

    console.log(`\n📋 Looking up user: ${email}`);

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError) {
      console.error(`❌ User not found: ${email}`);
      console.error(
        "💡 The user must first create an account through the website sign-up process"
      );
      process.exit(1);
    }

    if (existingUser.role === "ADMIN") {
      console.log(`✅ User ${email} is already an admin!`);
      process.exit(0);
    }

    // Update user to admin
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ role: "ADMIN" })
      .eq("email", email);

    if (updateError) {
      console.error("❌ Error updating user role:", updateError.message);
      process.exit(1);
    }

    console.log(`✅ Successfully upgraded ${email} to admin!`);
    console.log("\n🎉 Admin privileges activated:");
    console.log("   • Access to admin dashboard (/admin)");
    console.log("   • Product management");
    console.log("   • Order management");
    console.log("   • User management");
    console.log("   • Analytics and reports");
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  } finally {
    rl.close();
  }
}

async function listAdmins() {
  try {
    const { data: admins, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .eq("role", "ADMIN")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching admins:", error.message);
      return;
    }

    console.log("\n👥 Current Admin Users:");
    console.log("======================");

    if (admins.length === 0) {
      console.log("No admin users found.");
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.email}`);
        console.log(`   Name: ${admin.full_name || "Not set"}`);
        console.log(
          `   Created: ${new Date(admin.created_at).toLocaleDateString()}`
        );
        console.log("");
      });
    }
  } catch (error) {
    console.error("❌ Error listing admins:", error);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 1) {
    // If an email is provided as argument, create admin directly
    await createAdmin(args[0]);
    return;
  }

  console.log("\nWhat would you like to do?");
  console.log("1. Create admin user");
  console.log("2. List existing admins");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const choice = await new Promise<string>((resolve) => {
    rl.question("\nChoose (1 or 2): ", resolve);
  });

  switch (choice.trim()) {
    case "1":
      const email = await new Promise<string>((resolve) => {
        rl.question("Enter user email to promote to admin: ", resolve);
      });
      await createAdmin(email.trim());
      break;
    case "2":
      await listAdmins();
      break;
    default:
      console.log("❌ Invalid choice");
  }

  rl.close();
}

main().catch(console.error);
