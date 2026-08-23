-- V9__add_performance_indexes.sql
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pincodes_code ON pincodes(pincode);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
