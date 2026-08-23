-- ============================================================
-- GronLiv — Flyway Migration V1
-- Product Schema: categories, products, nutrition, ingredients
-- ============================================================
-- IMPORTANT: Prices stored in PAISE (1 INR = 100 paise)
-- NEVER use FLOAT or DECIMAL for monetary values.
-- ============================================================

-- Product Categories
CREATE TABLE product_categories (
    id          BIGSERIAL       PRIMARY KEY,
    slug        VARCHAR(100)    NOT NULL UNIQUE,
    name        VARCHAR(200)    NOT NULL,
    description TEXT,
    active      BOOLEAN         NOT NULL DEFAULT true,
    sort_order  INTEGER         NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_categories_slug ON product_categories(slug);
CREATE INDEX idx_product_categories_active ON product_categories(active);

-- Products
CREATE TABLE products (
    id                BIGSERIAL       PRIMARY KEY,
    slug              VARCHAR(200)    NOT NULL UNIQUE,
    name              VARCHAR(300)    NOT NULL,
    short_description VARCHAR(500),
    description       TEXT,
    -- Price in PAISE (e.g. 24900 = ₹249)
    price             BIGINT          NOT NULL CHECK (price > 0),
    image_url         VARCHAR(500),
    category_id       BIGINT          NOT NULL REFERENCES product_categories(id) ON DELETE RESTRICT,
    available         BOOLEAN         NOT NULL DEFAULT true,
    featured          BOOLEAN         NOT NULL DEFAULT false,
    sort_order        INTEGER         NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_available ON products(available);
CREATE INDEX idx_products_featured ON products(featured);

-- Product Tags (e.g. Vegan, High Protein, Antioxidant)
CREATE TABLE product_tags (
    product_id  BIGINT          NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag         VARCHAR(100)    NOT NULL,
    PRIMARY KEY (product_id, tag)
);

-- Ingredients
CREATE TABLE ingredients (
    id          BIGSERIAL       PRIMARY KEY,
    name        VARCHAR(200)    NOT NULL,
    image_url   VARCHAR(500),
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Product <-> Ingredient (many-to-many)
CREATE TABLE product_ingredients (
    product_id      BIGINT  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    ingredient_id   BIGINT  NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, ingredient_id)
);

-- Nutrition Info (one-to-one with product)
-- Values stored as integer * 10 to avoid floating-point
-- e.g. protein_g10 = 250 means 25.0g protein
CREATE TABLE nutrition_info (
    id              BIGSERIAL   PRIMARY KEY,
    product_id      BIGINT      NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    serving_size    VARCHAR(50) NOT NULL DEFAULT '250ml',
    calories        INTEGER     NOT NULL CHECK (calories >= 0),
    protein         INTEGER     NOT NULL DEFAULT 0 CHECK (protein >= 0),
    carbohydrates   INTEGER     NOT NULL DEFAULT 0 CHECK (carbohydrates >= 0),
    fat             INTEGER     NOT NULL DEFAULT 0 CHECK (fat >= 0),
    fiber           INTEGER     NOT NULL DEFAULT 0 CHECK (fiber >= 0),
    sugar           INTEGER     NOT NULL DEFAULT 0 CHECK (sugar >= 0)
);

CREATE INDEX idx_nutrition_info_product ON nutrition_info(product_id);
