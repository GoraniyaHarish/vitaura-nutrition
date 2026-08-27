-- ============================================================
-- Vitaura Nutrition — Flyway Migration V3
-- Order & Payment Schema
-- ============================================================
-- CRITICAL: All monetary values in PAISE (integer)
-- NEVER use FLOAT for money.
-- ============================================================

CREATE TABLE orders (
    id              BIGSERIAL           PRIMARY KEY,
    order_number    VARCHAR(20)         NOT NULL UNIQUE,  -- e.g. GL-20260822-001234
    customer_id     BIGINT              REFERENCES customers(id) ON DELETE SET NULL,

    -- Customer info snapshot (for guest orders or if customer deleted)
    customer_name   VARCHAR(200)        NOT NULL,
    customer_phone  VARCHAR(15)         NOT NULL,
    customer_email  VARCHAR(254),

    -- Delivery address snapshot
    delivery_address    TEXT            NOT NULL,

    -- Financials (PAISE)
    subtotal        BIGINT              NOT NULL CHECK (subtotal >= 0),
    delivery_fee    BIGINT              NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
    discount        BIGINT              NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total           BIGINT              NOT NULL CHECK (total >= 0),

    -- Status (VARCHAR for 100% JPA @Enumerated(EnumType.STRING) compatibility)
    status              VARCHAR(50)     NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')),
    payment_status      VARCHAR(50)     NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED')),
    payment_method      VARCHAR(50)     NOT NULL CHECK (payment_method IN ('COD', 'RAZORPAY', 'PHONEPE')),

    -- Payment provider reference
    payment_provider_order_id   VARCHAR(200),
    payment_provider_txn_id     VARCHAR(200),

    notes           TEXT,
    ip_address      VARCHAR(45),

    -- Timestamps
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    confirmed_at    TIMESTAMPTZ,
    delivered_at    TIMESTAMPTZ
);

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_phone ON orders(customer_phone);

CREATE TABLE order_items (
    id          BIGSERIAL   PRIMARY KEY,
    order_id    BIGINT      NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id  BIGINT      NOT NULL REFERENCES products(id) ON DELETE RESTRICT,

    -- Snapshot prices at time of order (PAISE) — do not link live prices
    product_name    VARCHAR(300)    NOT NULL,
    unit_price      BIGINT          NOT NULL CHECK (unit_price > 0),
    quantity        INTEGER         NOT NULL CHECK (quantity > 0 AND quantity <= 50),
    total_price     BIGINT          NOT NULL CHECK (total_price > 0)
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
