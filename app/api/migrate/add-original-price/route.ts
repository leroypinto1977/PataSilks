import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST() {
  try {
    const supabase = createSupabaseAdminClient();

    // Add the original_price column if it doesn't exist
    const { data, error } = await supabase.rpc("exec", {
      sql: `
        DO $$ 
        BEGIN 
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'products' 
            AND column_name = 'original_price'
          ) THEN
            ALTER TABLE products ADD COLUMN original_price DECIMAL(10,2);
          END IF;
        END $$;
      `,
    });

    if (error) {
      console.error("Migration error:", error);
      // Try alternative approach using direct SQL
      const { error: altError } = await supabase
        .from("products")
        .select("original_price")
        .limit(1);

      if (
        altError &&
        altError.message.includes("column") &&
        altError.message.includes("original_price")
      ) {
        return NextResponse.json(
          {
            error:
              "original_price column doesn't exist. Please add it manually in Supabase dashboard: ALTER TABLE products ADD COLUMN original_price DECIMAL(10,2);",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message:
        "Migration completed successfully. original_price column is ready.",
    });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      {
        error:
          "Migration failed. Please add column manually: ALTER TABLE products ADD COLUMN original_price DECIMAL(10,2);",
      },
      { status: 500 }
    );
  }
}
