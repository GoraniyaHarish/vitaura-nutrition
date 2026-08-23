-- ============================================================
-- GronLiv — Flyway Migration V4
-- Delivery Zones & Pincodes
-- ============================================================

CREATE TABLE delivery_zones (
    id                  BIGSERIAL       PRIMARY KEY,
    name                VARCHAR(200)    NOT NULL,
    description         TEXT,
    active              BOOLEAN         NOT NULL DEFAULT true,
    -- Delivery fee in PAISE (0 = free delivery)
    delivery_fee        BIGINT          NOT NULL DEFAULT 3000 CHECK (delivery_fee >= 0), -- ₹30 default
    -- Free delivery above this order amount (PAISE), 0 = never free
    free_above          BIGINT          NOT NULL DEFAULT 50000 CHECK (free_above >= 0), -- ₹500
    estimated_minutes   INTEGER         NOT NULL DEFAULT 45 CHECK (estimated_minutes > 0),
    sort_order          INTEGER         NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_delivery_zones_active ON delivery_zones(active);

-- Pincodes served by GronLiv
-- IMPORTANT: No pincode is assumed to be served without explicit data
CREATE TABLE pincodes (
    id          BIGSERIAL       PRIMARY KEY,
    code        VARCHAR(6)      NOT NULL UNIQUE CHECK (code ~ '^\d{6}$'),
    zone_id     BIGINT          NOT NULL REFERENCES delivery_zones(id) ON DELETE RESTRICT,
    active      BOOLEAN         NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pincodes_code ON pincodes(code);
CREATE INDEX idx_pincodes_zone ON pincodes(zone_id);
CREATE INDEX idx_pincodes_active ON pincodes(active) WHERE active = true;
