-- Initial categories for testing
INSERT INTO categories (id, name, description, color) VALUES
('cat-1', 'Silk Sarees', 'Premium silk sarees for special occasions', '#FF6B6B'),
('cat-2', 'Cotton Sarees', 'Comfortable cotton sarees for daily wear', '#4ECDC4'),
('cat-3', 'Designer Sarees', 'Contemporary designer sarees', '#45B7D1'),
('cat-4', 'Banarasi Sarees', 'Traditional Banarasi silk sarees', '#F7DC6F'),
('cat-5', 'Wedding Sarees', 'Special wedding collection sarees', '#BB8FCE'),
('cat-6', 'Georgette Sarees', 'Light and elegant georgette sarees', '#82E0AA')
ON CONFLICT (name) DO NOTHING;
