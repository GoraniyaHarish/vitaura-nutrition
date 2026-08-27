-- ============================================================
-- Vitaura Nutrition — Flyway Migration V7
-- SEED DATA & FORMULATION CATALOG
-- ============================================================

-- ---- Product Categories ----
INSERT INTO product_categories (slug, name, description, sort_order) VALUES
    ('shakes',        'Shakes',        'Chef-crafted organic protein shakes made from whole botanicals.', 1),
    ('bowls',         'Bowls',         'Nutrient-dense organic superfood wellness bowls.',               2),
    ('healthy-bites', 'Healthy Bites', 'Cold-pressed artisan energy bites and protein bars.',             3);

-- ---- Vitaura Products ----
-- Prices in PAISE: 24900 = ₹249, 27900 = ₹279, 29900 = ₹299, 26900 = ₹269, 34900 = ₹349, 32900 = ₹329, 19900 = ₹199, 17900 = ₹179

INSERT INTO products (slug, name, short_description, description, price, image_url, category_id, available, featured, sort_order) VALUES
    (
        'vanilla-matcha-zen',
        'Vanilla Matcha Zen',
        'Smooth ceremonial grade matcha blended with rich vanilla and organic plant protein.',
        'Our signature blend of ceremonial Uji matcha, Madagascar vanilla, and cold-pressed organic almond milk. Balanced with bioavailable plant protein to provide steady morning clarity, focus, and clean energy with zero jitters.',
        24900,
        '/images/vanilla-matcha-zen.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, true, 1
    ),
    (
        'dark-cacao-recharge',
        'Dark Cacao Recharge',
        'Intense single-origin raw cacao combined with Medjool dates and whole rolled oats.',
        'The Dark Cacao Recharge combines single-origin raw South American cacao with Medjool dates and sprouted whole oats for deep cellular recovery and sustained fuel.',
        27900,
        '/images/dark-cacao-recharge.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, true, 2
    ),
    (
        'wild-berry-collagen',
        'Wild Berry Collagen',
        'Wild Nordic blueberries, fresh strawberries, and botanical collagen boosters.',
        'A concentrated blend of wild forest berries, organic strawberry purée, and clean botanical collagen precursors designed to nurture skin radiance, joint vitality, and cellular antioxidant defense.',
        29900,
        '/images/wild-berry-collagen.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, true, 3
    ),
    (
        'golden-turmeric-cleanse',
        'Golden Turmeric Cleanse',
        'Cold-pressed organic turmeric root, ginger, cracked black pepper, and almond milk.',
        'A restorative golden elixir powered by fresh turmeric root, warm ginger, cracked Tellicherry pepper for curcumin bioavailability, and organic vanilla spice.',
        26900,
        '/images/golden-turmeric-cleanse.jpg',
        (SELECT id FROM product_categories WHERE slug = 'shakes'),
        true, false, 4
    ),
    (
        'acai-power-bowl',
        'Acai Power Bowl',
        'Organic wild acai purée topped with fresh sliced banana, blueberries, and toasted coconut flakes.',
        'Thick, velvety organic Amazonian acai blended with frozen berries, topped with crunchy gluten-free granola, chia seeds, and raw hemp hearts for complete breakfast vitality.',
        34900,
        '/images/acai-power-bowl.jpg',
        (SELECT id FROM product_categories WHERE slug = 'bowls'),
        true, true, 5
    ),
    (
        'quinoa-avocado-harvest',
        'Quinoa Avocado Harvest',
        'Warm tri-color quinoa, sliced Hass avocado, edamame, baby spinach, and lemon-tahini dressing.',
        'Nutrient-dense savory wellness bowl packed with fluffy tri-color quinoa, ripe avocado, steamed edamame, organic greens, and pumpkin seeds with artisan tahini drizzle.',
        32900,
        '/images/quinoa-avocado-harvest.jpg',
        (SELECT id FROM product_categories WHERE slug = 'bowls'),
        true, false, 6
    ),
    (
        'cacao-hazelnut-energy-bites',
        'Cacao Hazelnut Energy Bites',
        'Cold-formed truffles made with raw cacao, roasted hazelnuts, chia, and dates.',
        'Artisan small-batch energy bites rolled in raw cocoa nibs and crushed roasted hazelnuts. The ultimate clean on-the-go fuel with zero refined sugar.',
        19900,
        '/images/cacao-hazelnut-energy-bites.jpg',
        (SELECT id FROM product_categories WHERE slug = 'healthy-bites'),
        true, true, 7
    ),
    (
        'almond-flax-protein-bar',
        'Almond Flax Protein Bar',
        'Cold-pressed whole almond, toasted golden flaxseed, and oat protein bar.',
        'Handcrafted whole-ingredient nutrition bar combining freshly ground almond butter, organic golden flax, chia seeds, and plant protein.',
        17900,
        '/images/almond-flax-protein-bar.jpg',
        (SELECT id FROM product_categories WHERE slug = 'healthy-bites'),
        true, false, 8
    );

-- ---- Product Tags ----
INSERT INTO product_tags (product_id, tag) VALUES
    ((SELECT id FROM products WHERE slug = 'vanilla-matcha-zen'), 'Ceremonial Matcha'),
    ((SELECT id FROM products WHERE slug = 'vanilla-matcha-zen'), 'Plant Protein'),
    ((SELECT id FROM products WHERE slug = 'vanilla-matcha-zen'), 'Zen Focus'),
    ((SELECT id FROM products WHERE slug = 'dark-cacao-recharge'), 'High Protein'),
    ((SELECT id FROM products WHERE slug = 'dark-cacao-recharge'), 'Raw Cacao'),
    ((SELECT id FROM products WHERE slug = 'dark-cacao-recharge'), 'Recovery'),
    ((SELECT id FROM products WHERE slug = 'wild-berry-collagen'), 'Antioxidant'),
    ((SELECT id FROM products WHERE slug = 'wild-berry-collagen'), 'Collagen Boost'),
    ((SELECT id FROM products WHERE slug = 'wild-berry-collagen'), 'Superfood'),
    ((SELECT id FROM products WHERE slug = 'golden-turmeric-cleanse'), 'Anti-Inflammatory'),
    ((SELECT id FROM products WHERE slug = 'golden-turmeric-cleanse'), 'Ginger Root'),
    ((SELECT id FROM products WHERE slug = 'golden-turmeric-cleanse'), 'Cleanse'),
    ((SELECT id FROM products WHERE slug = 'acai-power-bowl'), 'Organic Acai'),
    ((SELECT id FROM products WHERE slug = 'acai-power-bowl'), 'Antioxidant Rich'),
    ((SELECT id FROM products WHERE slug = 'acai-power-bowl'), 'Whole Foods'),
    ((SELECT id FROM products WHERE slug = 'quinoa-avocado-harvest'), 'Savory Bowl'),
    ((SELECT id FROM products WHERE slug = 'quinoa-avocado-harvest'), 'Healthy Fats'),
    ((SELECT id FROM products WHERE slug = 'quinoa-avocado-harvest'), 'Complete Protein'),
    ((SELECT id FROM products WHERE slug = 'cacao-hazelnut-energy-bites'), 'Raw Cacao'),
    ((SELECT id FROM products WHERE slug = 'cacao-hazelnut-energy-bites'), 'Hazelnut'),
    ((SELECT id FROM products WHERE slug = 'cacao-hazelnut-energy-bites'), 'No Added Sugar'),
    ((SELECT id FROM products WHERE slug = 'almond-flax-protein-bar'), 'Clean Protein'),
    ((SELECT id FROM products WHERE slug = 'almond-flax-protein-bar'), 'Omega-3'),
    ((SELECT id FROM products WHERE slug = 'almond-flax-protein-bar'), 'Gluten-Free');

-- ---- Ingredients ----
INSERT INTO ingredients (name) VALUES
    ('Ceremonial Uji Matcha'),
    ('Madagascar Vanilla Bean'),
    ('Pea & Rice Protein Isolate'),
    ('Cold-Pressed Almond Milk'),
    ('Raw South American Cacao'),
    ('Medjool Dates'),
    ('Sprouted Rolled Oats'),
    ('Wild Nordic Blueberries'),
    ('Fresh Strawberries'),
    ('Cold-Pressed Turmeric Root'),
    ('Fresh Ginger'),
    ('Wild Organic Acai Puree'),
    ('Organic Tri-Color Quinoa'),
    ('Hass Avocado'),
    ('Roasted Hazelnuts'),
    ('Organic Golden Flaxseed');

-- ---- Nutrition Info ----
INSERT INTO nutrition_info (product_id, serving_size, calories, protein, carbohydrates, fat, fiber, sugar) VALUES
    ((SELECT id FROM products WHERE slug = 'vanilla-matcha-zen'), '350ml', 280, 200, 260, 60, 40, 90),
    ((SELECT id FROM products WHERE slug = 'dark-cacao-recharge'), '350ml', 320, 240, 340, 80, 50, 120),
    ((SELECT id FROM products WHERE slug = 'wild-berry-collagen'), '350ml', 240, 180, 360, 30, 60, 140),
    ((SELECT id FROM products WHERE slug = 'golden-turmeric-cleanse'), '350ml', 220, 140, 280, 50, 40, 80),
    ((SELECT id FROM products WHERE slug = 'acai-power-bowl'), '400g', 380, 120, 540, 110, 90, 180),
    ((SELECT id FROM products WHERE slug = 'quinoa-avocado-harvest'), '420g', 420, 160, 460, 180, 110, 40),
    ((SELECT id FROM products WHERE slug = 'cacao-hazelnut-energy-bites'), '120g (4 bites)', 260, 90, 280, 140, 50, 110),
    ((SELECT id FROM products WHERE slug = 'almond-flax-protein-bar'), '75g', 240, 150, 220, 110, 60, 60);

-- ---- Delivery Zones ----
INSERT INTO delivery_zones (name, description, active, delivery_fee, free_above, estimated_minutes) VALUES
    (
        'Vitaura Express Zone',
        'Central delivery zone — cold-chain direct delivery',
        true,
        3000,   -- ₹30 delivery fee
        50000,  -- Free delivery above ₹500
        45      -- 45 minutes estimated
    );

-- Serviceable Pincodes
INSERT INTO pincodes (code, zone_id, active) VALUES
    ('360001', (SELECT id FROM delivery_zones WHERE name = 'Vitaura Express Zone'), true),
    ('360002', (SELECT id FROM delivery_zones WHERE name = 'Vitaura Express Zone'), true),
    ('360003', (SELECT id FROM delivery_zones WHERE name = 'Vitaura Express Zone'), true),
    ('360004', (SELECT id FROM delivery_zones WHERE name = 'Vitaura Express Zone'), true),
    ('360005', (SELECT id FROM delivery_zones WHERE name = 'Vitaura Express Zone'), true);

-- ============================================================
-- END VITAURA SEED DATA
-- ============================================================
