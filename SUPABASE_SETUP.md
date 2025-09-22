# Patta Silks - Supabase Setup Guide

## Prerequisites

1. Supabase account (https://supabase.com)
2. Node.js and npm installed
3. The existing Next.js project

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Project Name**: patta-silks
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
5. Click "Create new project"
6. Wait for project to initialize (2-3 minutes)

## Step 2: Get Environment Variables

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Project API Key** (anon/public key) (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **Service Role Key** (service_role/secret key) (SUPABASE_SERVICE_ROLE_KEY)

## Step 3: Configure Environment Variables

Create/update `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth Configuration (keep existing if already set)
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Database URL (update to use Supabase)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

## Step 4: Create Database Schema

1. In Supabase dashboard, go to "SQL Editor"
2. Run the following SQL to create tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  images TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  "inStock" BOOLEAN DEFAULT true,
  "stockCount" INTEGER DEFAULT 1,
  sold BOOLEAN DEFAULT false,
  "soldAt" TIMESTAMP WITH TIME ZONE,
  fabric VARCHAR(255),
  color VARCHAR(255),
  size VARCHAR(100),
  weight VARCHAR(100),
  occasion VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  "newArrival" BOOLEAN DEFAULT false,
  "categoryId" UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'USER',
  avatar TEXT,
  "supabaseId" UUID,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  "shippingAddress" JSONB,
  "billingAddress" JSONB,
  "paymentMethod" VARCHAR(100),
  "paymentStatus" VARCHAR(50) DEFAULT 'PENDING',
  "trackingNumber" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "orderId" UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  "productId" UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products("categoryId");
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_new_arrival ON products("newArrival");
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_in_stock ON products("inStock");
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user ON orders("userId");
CREATE INDEX idx_order_items_order ON order_items("orderId");
CREATE INDEX idx_order_items_product ON order_items("productId");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Step 5: Seed Initial Data

Run the following SQL to add initial categories and sample products:

```sql
-- Insert categories
INSERT INTO categories (name, description) VALUES
('Sarees', 'Traditional Indian silk sarees with intricate designs'),
('Lehengas', 'Elegant lehengas for special occasions'),
('Dress Materials', 'Premium fabric sets for custom tailoring'),
('Accessories', 'Traditional jewelry and accessories');

-- Insert sample products
WITH saree_category AS (SELECT id FROM categories WHERE name = 'Sarees' LIMIT 1)
INSERT INTO products (
  name, description, price, images, fabric, color, occasion,
  featured, "newArrival", "categoryId", slug
) VALUES
(
  'Royal Banarasi Silk Saree',
  'Exquisite handwoven Banarasi silk saree with gold zari work. Perfect for weddings and special occasions.',
  25000,
  ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
  'Pure Silk',
  'Deep Red',
  'Wedding',
  true,
  true,
  (SELECT id FROM saree_category),
  'royal-banarasi-silk-saree'
),
(
  'Elegant Kanjivaram Silk',
  'Traditional Kanjivaram silk saree with temple border design and rich color combination.',
  32000,
  ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
  'Kanjivaram Silk',
  'Golden Yellow',
  'Festival',
  true,
  true,
  (SELECT id FROM saree_category),
  'elegant-kanjivaram-silk'
);
```

## Step 6: Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to categories and products
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to active products" ON products FOR SELECT USING (active = true);

-- Create policies for authenticated users
CREATE POLICY "Allow users to read their own data" ON users FOR SELECT USING (auth.uid()::text = "supabaseId"::text);
CREATE POLICY "Allow users to update their own data" ON users FOR UPDATE USING (auth.uid()::text = "supabaseId"::text);

-- Create policies for orders (users can only see their own orders)
CREATE POLICY "Users can read their own orders" ON orders FOR SELECT USING (auth.uid()::text = (SELECT "supabaseId" FROM users WHERE id = "userId"));
CREATE POLICY "Users can create their own orders" ON orders FOR INSERT WITH CHECK (auth.uid()::text = (SELECT "supabaseId" FROM users WHERE id = "userId"));

-- Admin policies (users with role 'ADMIN' can do everything)
CREATE POLICY "Admin full access to categories" ON categories FOR ALL USING ((SELECT role FROM users WHERE "supabaseId" = auth.uid()::text) = 'ADMIN');
CREATE POLICY "Admin full access to products" ON products FOR ALL USING ((SELECT role FROM users WHERE "supabaseId" = auth.uid()::text) = 'ADMIN');
CREATE POLICY "Admin full access to users" ON users FOR ALL USING ((SELECT role FROM users WHERE "supabaseId" = auth.uid()::text) = 'ADMIN');
CREATE POLICY "Admin full access to orders" ON orders FOR ALL USING ((SELECT role FROM users WHERE "supabaseId" = auth.uid()::text) = 'ADMIN');
```

## Step 7: Enable Real-time

1. In Supabase dashboard, go to "Database" > "Replication"
2. Enable replication for the `products` table
3. This allows real-time updates when new products are added

## Step 8: Test the Application

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Visit http://localhost:3000
4. Test the admin dashboard at http://localhost:3000/admin

## Features Enabled

### Real-time Updates

- New arrivals section updates automatically when products are added
- Admin dashboard shows real-time inventory changes

### Admin Dashboard

- Add/edit products with image upload
- Mark products as featured or new arrivals
- Track inventory and mark items as sold
- Real-time statistics

### User Features

- Browse products by category
- Filter by price, featured, new arrivals
- Real-time new arrivals display
- Shopping cart functionality

### Security

- Row Level Security enabled
- Admin-only access to management features
- User authentication with NextAuth.js

## Next Steps

1. **Image Storage**: Set up Cloudinary or Supabase Storage for image uploads
2. **Payment Integration**: Add Razorpay or Stripe for payments
3. **Email Notifications**: Set up order confirmations and notifications
4. **SEO Optimization**: Add meta tags and structured data
5. **Performance**: Add caching and CDN integration

## Troubleshooting

### Connection Issues

- Verify environment variables are correct
- Check Supabase project status
- Ensure database URL includes correct password

### RLS Issues

- Check if policies are properly configured
- Verify user roles in the database
- Test with service role for admin operations

### Real-time Issues

- Ensure replication is enabled for products table
- Check browser console for WebSocket errors
- Verify Supabase client configuration

## Support

For issues with this setup:

1. Check Supabase documentation: https://supabase.com/docs
2. Review the application logs for detailed error messages
3. Test database connectivity with the Supabase dashboard
