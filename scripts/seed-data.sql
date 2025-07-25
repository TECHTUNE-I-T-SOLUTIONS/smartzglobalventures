-- Insert sample products for computers
INSERT INTO products (name, description, price, original_price, image, category, subsidiary, in_stock, quantity, rating, reviews, is_new, discount, featured, features) VALUES
('USB-C Fast Charger 65W', 'High-speed USB-C charger compatible with laptops and smartphones', 15000, 18000, '/placeholder.svg?height=300&width=300&text=USB-C+Charger', 'Chargers', 'computers', true, 50, 4.5, 23, true, 17, true, ARRAY['Fast Charging', '65W Power', 'Universal Compatibility', '1 Year Warranty']),
('HDMI Cable 2m', 'Premium HDMI cable for 4K video transmission', 3500, 4000, '/placeholder.svg?height=300&width=300&text=HDMI+Cable', 'Cables', 'computers', true, 100, 4.2, 45, false, 13, true, ARRAY['4K Support', '2 Meter Length', 'Gold Plated', 'Durable Build']),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 8000, 10000, '/placeholder.svg?height=300&width=300&text=Wireless+Mouse', 'Accessories', 'computers', true, 30, 4.3, 67, false, 20, true, ARRAY['Wireless', 'Ergonomic Design', 'Long Battery Life', 'Precision Tracking']),
('Laptop Stand Adjustable', 'Aluminum laptop stand with adjustable height', 12000, 15000, '/placeholder.svg?height=300&width=300&text=Laptop+Stand', 'Accessories', 'computers', true, 25, 4.7, 34, true, 20, true, ARRAY['Adjustable Height', 'Aluminum Build', 'Heat Dissipation', 'Portable Design']);

-- Insert sample products for books
INSERT INTO products (name, description, price, original_price, image, category, subsidiary, in_stock, quantity, rating, reviews, is_new, discount, featured, features) VALUES
('JavaScript: The Complete Guide', 'Comprehensive guide to modern JavaScript programming', 8500, 10000, '/placeholder.svg?height=300&width=300&text=JavaScript+Book', 'Programming', 'books', true, 40, 4.8, 89, true, 15, true, ARRAY['Latest ES2024', 'Practical Examples', 'Expert Author', 'Digital + Physical']),
('Digital Marketing Mastery', 'Master the art of digital marketing in the modern age', 7000, 8500, '/placeholder.svg?height=300&width=300&text=Marketing+Book', 'Business', 'books', true, 35, 4.6, 56, false, 18, true, ARRAY['Case Studies', 'Actionable Strategies', 'Industry Insights', 'Updated Content']),
('Data Science Fundamentals', 'Learn data science from basics to advanced concepts', 9500, 12000, '/placeholder.svg?height=300&width=300&text=Data+Science+Book', 'Technology', 'books', true, 20, 4.9, 123, true, 21, true, ARRAY['Python & R', 'Real Projects', 'Statistical Analysis', 'Machine Learning']),
('Entrepreneurship in Africa', 'Building successful businesses in the African market', 6500, 8000, '/placeholder.svg?height=300&width=300&text=Entrepreneurship+Book', 'Business', 'books', true, 45, 4.4, 78, false, 19, true, ARRAY['African Context', 'Success Stories', 'Practical Advice', 'Local Examples']);

-- Insert sample products for business center
INSERT INTO products (name, description, price, original_price, image, category, subsidiary, in_stock, quantity, rating, reviews, is_new, discount, featured, features) VALUES
('Document Printing (Per Page)', 'High-quality document printing service', 50, null, '/placeholder.svg?height=300&width=300&text=Printing+Service', 'Printing', 'business', true, 1000, 4.5, 234, false, 0, false, ARRAY['High Quality', 'Fast Service', 'Color & B/W', 'Various Paper Types']),
('Business Card Design & Print', 'Professional business card design and printing', 2500, 3000, '/placeholder.svg?height=300&width=300&text=Business+Cards', 'Design', 'business', true, 50, 4.7, 67, true, 17, true, ARRAY['Custom Design', 'Premium Paper', 'Quick Turnaround', 'Professional Quality']),
('Document Editing Service', 'Professional document editing and formatting', 1500, 2000, '/placeholder.svg?height=300&width=300&text=Document+Editing', 'Editing', 'business', true, 100, 4.6, 45, false, 25, false, ARRAY['Professional Editing', 'Format Correction', 'Grammar Check', 'Quick Delivery']),
('Logo Design Service', 'Custom logo design for your business', 15000, 20000, '/placeholder.svg?height=300&width=300&text=Logo+Design', 'Design', 'business', true, 20, 4.8, 89, true, 25, true, ARRAY['Custom Design', 'Multiple Concepts', 'Vector Files', 'Unlimited Revisions']);

-- Create admin user
INSERT INTO users (email, first_name, last_name, role) VALUES
('admin@smartzglobal.com', 'Admin', 'User', 'admin'),
('eneji.daniel@smartzglobal.com', 'Eneji Daniel', 'Moses', 'admin');

-- Create sample customer
INSERT INTO users (email, first_name, last_name, phone, address) VALUES
('customer@example.com', 'John', 'Doe', '+234 123 456 7890', '123 Lagos Street, Lagos, Nigeria');
