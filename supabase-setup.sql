-- Complete Supabase database setup for Patta Silks
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (for user data linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Price in cents/paise
  images TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 1,
  sold BOOLEAN DEFAULT false,
  sold_at TIMESTAMP WITH TIME ZONE,
  fabric TEXT,
  color TEXT,
  size TEXT,
  weight TEXT,
  occasion TEXT,
  slug TEXT UNIQUE,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  new_arrival BOOLEAN DEFAULT false,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total INTEGER NOT NULL, -- Total in cents/paise
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
  shipping_address JSONB,
  billing_address JSONB,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL, -- Price at time of order
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default categories
INSERT INTO categories (name, description) VALUES
  ('Sarees', 'Traditional Indian silk sarees with intricate designs and patterns'),
  ('Lehengas', 'Elegant lehengas perfect for weddings and special occasions'),
  ('Dress Materials', 'Premium fabric sets ready for custom tailoring'),
  ('Accessories', 'Traditional jewelry, bangles, and complementary accessories')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
WITH saree_cat AS (SELECT id FROM categories WHERE name = 'Sarees' LIMIT 1)
INSERT INTO products (
  name, description, price, images, fabric, color, occasion, 
  featured, new_arrival, category_id, slug, tags
) VALUES
  (
    'Royal Banarasi Silk Saree',
    'Exquisite handwoven Banarasi silk saree with gold zari work. Perfect for weddings and special occasions. Features traditional motifs and rich color combinations.',
    2500000, -- ₹25,000 in paise
    ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
    'Pure Banarasi Silk',
    'Deep Red with Gold',
    'Wedding',
    true,
    true,
    (SELECT id FROM saree_cat),
    'royal-banarasi-silk-saree',
    ARRAY['banarasi', 'silk', 'wedding', 'traditional', 'handwoven']
  ),
  (
    'Elegant Kanjivaram Silk',
    'Traditional Kanjivaram silk saree with temple border design. Known for its durability and rich texture. A timeless piece for festive occasions.',
    3200000, -- ₹32,000 in paise
    ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
    'Kanjivaram Silk',
    'Golden Yellow',
    'Festival',
    true,
    true,
    (SELECT id FROM saree_cat),
    'elegant-kanjivaram-silk',
    ARRAY['kanjivaram', 'silk', 'festival', 'temple-border', 'traditional']
  ),
  (
    'Designer Georgette Saree',
    'Contemporary designer georgette saree with modern embroidery work. Perfect blend of traditional and modern aesthetics.',
    1800000, -- ₹18,000 in paise
    ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
    'Georgette',
    'Emerald Green',
    'Party',
    false,
    true,
    (SELECT id FROM saree_cat),
    'designer-georgette-saree',
    ARRAY['georgette', 'designer', 'party', 'modern', 'embroidery']
  )
ON CONFLICT (slug) DO NOTHING;

WITH lehenga_cat AS (SELECT id FROM categories WHERE name = 'Lehengas' LIMIT 1)
INSERT INTO products (
  name, description, price, images, fabric, color, occasion, 
  featured, new_arrival, category_id, slug, tags
) VALUES
  (
    'Bridal Silk Lehenga Set',
    'Luxurious bridal lehenga set with heavy embroidery and sequin work. Includes lehenga, choli, and dupatta. Perfect for wedding ceremonies.',
    8500000, -- ₹85,000 in paise
    ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
    'Raw Silk',
    'Maroon with Gold',
    'Wedding',
    true,
    false,
    (SELECT id FROM lehenga_cat),
    'bridal-silk-lehenga-set',
    ARRAY['bridal', 'lehenga', 'silk', 'wedding', 'heavy-work']
  )
ON CONFLICT (slug) DO NOTHING;

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- RLS Policies for products
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can view all products" ON products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Only admins can modify products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- RLS Policies for order_items
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all order items" ON order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Enable realtime for products table (for new arrivals)
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- Create a default admin user (you'll need to sign up manually and then run this)
-- Replace 'your-admin-email@domain.com' with your actual email
-- INSERT INTO profiles (id, email, full_name, role) 
-- VALUES (
--   'your-user-id-from-auth-users', 
--   'your-admin-email@domain.com', 
--   'Admin User', 
--   'ADMIN'
-- );

-- Final verification queries
SELECT 'Categories created:' as status, count(*) as count FROM categories;
SELECT 'Products created:' as status, count(*) as count FROM products;
SELECT 'Tables ready:' as status, 
  CASE WHEN EXISTS (SELECT 1 FROM profiles LIMIT 1) THEN 'Yes' ELSE 'No' END as profiles,
  CASE WHEN EXISTS (SELECT 1 FROM categories LIMIT 1) THEN 'Yes' ELSE 'No' END as categories,
  CASE WHEN EXISTS (SELECT 1 FROM products LIMIT 1) THEN 'Yes' ELSE 'No' END as products;
