/**
 * Quick database setup script for Patta Silks
 * This creates the essential tables and trigger if they don't exist
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

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupDatabase() {
  console.log("🔧 Setting up essential database tables...");

  try {
    // Create the profiles table with a simple SQL command
    const setupSQL = `
      -- Create profiles table if it doesn't exist
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        email TEXT NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create function to handle new user signup
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.profiles (id, email, full_name, role)
        VALUES (
          NEW.id,
          NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
          'user'
        )
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Create trigger for new user signup
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

      -- Enable RLS
      ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

      -- Create policies
      DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
      CREATE POLICY "Users can view their own profile" ON profiles
        FOR SELECT USING (auth.uid() = id);

      DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
      CREATE POLICY "Users can update their own profile" ON profiles
        FOR UPDATE USING (auth.uid() = id);

      DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
      CREATE POLICY "Admins can view all profiles" ON profiles
        FOR ALL USING (
          EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
          )
        );
    `;

    // Execute the setup SQL
    const { error } = await supabase.rpc("exec_sql", { sql: setupSQL });

    if (error) {
      // If the RPC doesn't exist, we need to run the SQL manually
      console.log("⚠️  Direct SQL execution not available.");
      console.log(
        "📋 Please run the following SQL in your Supabase dashboard:"
      );
      console.log("==========================================");
      console.log(setupSQL);
      console.log("==========================================");
      return false;
    }

    console.log("✅ Database setup completed!");
    return true;
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    console.log(
      "\n📋 Manual setup required. Please run this SQL in Supabase dashboard:"
    );
    console.log("==========================================");
    console.log(`
      -- Create profiles table if it doesn't exist
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        email TEXT NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create function to handle new user signup
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.profiles (id, email, full_name, role)
        VALUES (
          NEW.id,
          NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
          'user'
        )
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Create trigger for new user signup
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

      -- Enable RLS
      ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

      -- Create policies
      DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
      CREATE POLICY "Users can view their own profile" ON profiles
        FOR SELECT USING (auth.uid() = id);

      DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
      CREATE POLICY "Users can update their own profile" ON profiles
        FOR UPDATE USING (auth.uid() = id);

      DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
      CREATE POLICY "Admins can view all profiles" ON profiles
        FOR ALL USING (
          EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
          )
        );
    `);
    console.log("==========================================");
    return false;
  }
}

async function checkSetup() {
  try {
    // Check if profiles table exists and has data
    const { data, error } = await supabase
      .from("profiles")
      .select("count")
      .limit(1);

    if (error) {
      console.log("❌ Profiles table not found or not accessible");
      return false;
    }

    console.log("✅ Profiles table exists and is accessible");
    return true;
  } catch (error) {
    console.log("❌ Database not properly set up");
    return false;
  }
}

async function main() {
  console.log("🚀 Patta Silks Database Setup");
  console.log("=============================\n");

  const isSetup = await checkSetup();

  if (!isSetup) {
    console.log("Setting up database...\n");
    await setupDatabase();
  } else {
    console.log("✅ Database is already set up!\n");
  }

  console.log("🎯 Next steps:");
  console.log("1. Sign up for an account on your website");
  console.log("2. Run: npm run admin:create");
  console.log("3. Enter your email to become admin");
  console.log("4. Access admin panel at /admin");
}

main().catch(console.error);
