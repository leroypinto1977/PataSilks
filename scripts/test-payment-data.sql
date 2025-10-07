-- Test data for Razorpay payment testing
-- Run these queries in your Supabase SQL editor to create test products

-- Insert test categories
INSERT INTO categories (id, name, description) VALUES
('test-cat-1', 'Test Category 1', 'Test category for payment testing'),
('test-cat-2', 'Test Category 2', 'Another test category');

-- Insert test products
INSERT INTO products (
  id, 
  name, 
  description, 
  price, 
  images, 
  active, 
  in_stock, 
  stock_count, 
  fabric, 
  color, 
  slug, 
  tags, 
  featured, 
  new_arrival, 
  category_id
) VALUES
(
  'test-product-1',
  'Test Saree 1',
  'A beautiful test saree for payment testing',
  5000,
  ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
  true,
  true,
  10,
  'Silk',
  'Red',
  'test-saree-1',
  ARRAY['test', 'silk', 'red'],
  true,
  true,
  'test-cat-1'
),
(
  'test-product-2',
  'Test Saree 2',
  'Another beautiful test saree',
  7500,
  ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
  true,
  true,
  5,
  'Cotton',
  'Blue',
  'test-saree-2',
  ARRAY['test', 'cotton', 'blue'],
  false,
  true,
  'test-cat-2'
),
(
  'test-product-3',
  'Test Saree 3',
  'Premium test saree',
  12000,
  ARRAY['https://images.pexels.com/photos/8839898/pexels-photo-8839898.jpeg'],
  true,
  true,
  3,
  'Silk',
  'Gold',
  'test-saree-3',
  ARRAY['test', 'silk', 'gold', 'premium'],
  true,
  false,
  'test-cat-1'
);

-- Insert test user profile (if needed)
INSERT INTO profiles (
  id,
  email,
  full_name,
  is_admin,
  created_at,
  updated_at
) VALUES
(
  'test-user-1',
  'test@example.com',
  'Test User',
  false,
  NOW(),
  NOW()
);

-- Note: Make sure to update the category_id values to match your actual category IDs
-- You can check existing categories with: SELECT * FROM categories;



