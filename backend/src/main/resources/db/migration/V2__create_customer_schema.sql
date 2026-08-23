-- ============================================================
-- GronLiv — Flyway Migration V2
-- Customer & Address Schema
-- ============================================================

CREATE TABLE customers (
    id              BIGSERIAL       PRIMARY KEY,
    phone           VARCHAR(15)     NOT NULL UNIQUE,  -- Primary identifier (Indian mobile)
    name            VARCHAR(200),
    email           VARCHAR(254),
    -- Store only what is needed — minimal data principle
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    last_ordered_at TIMESTAMPTZ
);

CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_email ON customers(email);

CREATE TABLE addresses (
    id          BIGSERIAL       PRIMARY KEY,
    customer_id BIGINT          REFERENCES customers(id) ON DELETE CASCADE,
    -- guest orders may have no customer_id
    label       VARCHAR(100),   -- e.g. Home, Office
    line1       VARCHAR(300)    NOT NULL,
    line2       VARCHAR(300),
    landmark    VARCHAR(300),
    city        VARCHAR(100)    NOT NULL DEFAULT 'Rajkot',
    state       VARCHAR(100)    NOT NULL DEFAULT 'Gujarat',
    pincode     VARCHAR(6)      NOT NULL,
    is_default  BOOLEAN         NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_addresses_customer ON addresses(customer_id);
CREATE INDEX idx_addresses_pincode ON addresses(pincode);
