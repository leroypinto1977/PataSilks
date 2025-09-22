# Database Migration Instructions

## Add Original Price Column to Products Table

The `original_price` column is needed to support strike-through pricing (discount display).

### Option 1: Using Supabase Dashboard (Recommended)

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Run this SQL command:

```sql
ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2);
```

### Option 2: Using the Migration API (If available)
=
```bash
curl -X POST http://localhost:3000/api/migrate/add-original-price
```

### Option 3: Manual SQL in psql

If you have direct database access:

```sql
\c your_database_name
ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2);
```

## After Migration

Once the column is added:

1. Update the API to include original_price in insertData
2. Remove the disabled state from the Original Price input field
3. Enable the strike-through pricing feature

## Current Status

✅ **Stock Quantity** - Fully working
⚠️ **Original Price** - Requires database migration
✅ **All other fields** - Fully working

The form will work perfectly for creating products, but the original price will be ignored until the database column is added.
