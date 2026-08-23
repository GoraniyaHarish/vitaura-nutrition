-- ============================================================
-- GronLiv — Flyway Migration V7
-- DEMO SEED DATA
-- ============================================================
-- ⚠️  WARNING: THIS IS DEMO DATA FOR DEVELOPMENT ONLY
-- ⚠️  Replace ALL values before production launch.
-- ⚠️  Prices are placeholder — not real GronLiv prices.
-- ⚠️  Products are illustrative — not real GronLiv menu.
-- ⚠️  Delivery pincodes are demo — not real service areas.
-- ============================================================

-- ---- Product Categories ----
INSERT INTO product_categories (slug, name, description, sort_order) VALUES
    ('shakes',        'Nutrition Shakes',  'Freshly blended premium nutrition shakes made daily.', 1),
    ('bowls',         'Healthy Bowls',     'Nourishing bowls packed with whole ingredients.',       2),
    ('healthy-bites', 'Healthy Bites',     'Quick nutritious snacks and power bites.',              3);

-- ---- Demo Products ----
-- DEMO: Replace with real GronLiv products before launch
-- Prices in PAISE: 24900 = ₹249, 27900 = ₹279, 29900 = ₹299

INSERT INTO products (slug, name, short_description, description, price, image_url, category_id, available, featured, sort_order) VALUES
    (
        'classic-vanilla-bean',
        'Classic Vanilla Bean',
        'Smooth, rich vanilla blended with plant-based protein for a clean energy boost.',
        'Our Classic Vanilla Bean shake is crafted from premium vanilla beans and high-quality plant-based protein. Each serving is freshly prepared to order, delivering a smooth, non-chalky texture that makes healthy nutrition genuinely enjoyable. Perfect for mornings, post-workout, or as a meal replacement.',
        24900,  -- ₹249 DEMO PRICE
        '/images/products/classic-vanilla-bean.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, true, 1
    ),
    (
        'double-dark-cacao',
        'Double Dark Cacao',
        'Intense raw cacao combined with dates and oats for robust recovery.',
        'The Double Dark Cacao blend combines premium raw cacao with the natural sweetness of Medjool dates and rolled oats. Rich in antioxidants and naturally energizing, this shake delivers deep, satisfying chocolate flavor without artificial sweeteners or preservatives.',
        27900,  -- ₹279 DEMO PRICE
        '/images/products/double-dark-cacao.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, true, 2
    ),
    (
        'berry-antioxidant',
        'Berry Antioxidant',
        'A vibrant mix of strawberries and blueberries packed with essential vitamins.',
        'Our Berry Antioxidant shake bursts with the natural flavor of fresh strawberries, blueberries, and seasonal berries. Every sip delivers a concentrated dose of antioxidants and vitamins in a smooth, refreshing blend. No artificial colors, no added sugar.',
        29900,  -- ₹299 DEMO PRICE
        '/images/products/berry-antioxidant.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, true, 3
    ),
    (
        'green-vitality',
        'Green Vitality Shake',
        'Spinach, green apple, and ginger blended for a fresh daily detox.',
        'Start your day with the Green Vitality shake — a clean, refreshing blend of baby spinach, green apple, fresh ginger, and a squeeze of lime. Light, bright, and nourishing, this shake is perfect for anyone seeking a gentle daily cleanse without the bitterness.',
        27900,  -- ₹279 DEMO PRICE
        '/images/products/green-vitality.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, false, 4
    );

-- ---- Product Tags ----
INSERT INTO product_tags (product_id, tag) VALUES
    ((SELECT id FROM products WHERE slug = 'classic-vanilla-bean'), 'Vegan'),
    ((SELECT id FROM products WHERE slug = 'classic-vanilla-bean'), 'Smooth'),
    ((SELECT id FROM products WHERE slug = 'classic-vanilla-bean'), 'Plant-Based'),
    ((SELECT id FROM products WHERE slug = 'double-dark-cacao'), 'High Protein'),
    ((SELECT id FROM products WHERE slug = 'double-dark-cacao'), 'Energizing'),
    ((SELECT id FROM products WHERE slug = 'double-dark-cacao'), 'Antioxidant'),
    ((SELECT id FROM products WHERE slug = 'berry-antioxidant'), 'Antioxidant'),
    ((SELECT id FROM products WHERE slug = 'berry-antioxidant'), 'Fresh'),
    ((SELECT id FROM products WHERE slug = 'berry-antioxidant'), 'Vitamin-Rich'),
    ((SELECT id FROM products WHERE slug = 'green-vitality'), 'Detox'),
    ((SELECT id FROM products WHERE slug = 'green-vitality'), 'Low Calorie'),
    ((SELECT id FROM products WHERE slug = 'green-vitality'), 'Vegan');

-- ---- Demo Ingredients ----
INSERT INTO ingredients (name) VALUES
    ('Fresh Vanilla Bean'),
    ('Plant-Based Protein'),
    ('Almond Milk'),
    ('Raw Cacao Powder'),
    ('Medjool Dates'),
    ('Rolled Oats'),
    ('Fresh Strawberries'),
    ('Fresh Blueberries'),
    ('Baby Spinach'),
    ('Green Apple'),
    ('Fresh Ginger'),
    ('Chia Seeds'),
    ('Almonds');

-- ---- Nutrition Info (DEMO — replace with lab-verified data) ----
-- protein_g10: grams * 10 (e.g. 200 = 20.0g)
-- ⚠️ These are illustrative demo values — NOT verified nutrition facts

INSERT INTO nutrition_info (product_id, serving_size, calories, protein, carbohydrates, fat, fiber, sugar) VALUES
    (
        (SELECT id FROM products WHERE slug = 'classic-vanilla-bean'),
        '300ml', 280, 200, 300, 60, 30, 120
    ),
    (
        (SELECT id FROM products WHERE slug = 'double-dark-cacao'),
        '300ml', 320, 220, 380, 80, 50, 150
    ),
    (
        (SELECT id FROM products WHERE slug = 'berry-antioxidant'),
        '300ml', 240, 150, 420, 30, 60, 200
    ),
    (
        (SELECT id FROM products WHERE slug = 'green-vitality'),
        '300ml', 180, 80, 350, 20, 80, 140
    );

-- ---- Demo Delivery Zone ----
-- ⚠️ DEMO: Replace with real GronLiv delivery zones and pincodes

INSERT INTO delivery_zones (name, description, active, delivery_fee, free_above, estimated_minutes) VALUES
    (
        'Rajkot Central',
        'Central Rajkot delivery zone — demo area',
        true,
        3000,   -- ₹30 delivery fee (DEMO)
        50000,  -- Free delivery above ₹500 (DEMO)
        45      -- 45 minutes estimated (DEMO)
    );

-- ⚠️ DEMO PINCODES — NOT real GronLiv service areas
-- Replace with actual serviceable Rajkot pincodes before launch
INSERT INTO pincodes (code, zone_id, active) VALUES
    ('360001', (SELECT id FROM delivery_zones WHERE name = 'Rajkot Central'), true),
    ('360002', (SELECT id FROM delivery_zones WHERE name = 'Rajkot Central'), true),
    ('360003', (SELECT id FROM delivery_zones WHERE name = 'Rajkot Central'), true),
    ('360004', (SELECT id FROM delivery_zones WHERE name = 'Rajkot Central'), true),
    ('360005', (SELECT id FROM delivery_zones WHERE name = 'Rajkot Central'), true);

-- ============================================================
-- END DEMO SEED DATA
-- ============================================================
