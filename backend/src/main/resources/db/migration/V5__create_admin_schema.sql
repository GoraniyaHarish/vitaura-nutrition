-- ============================================================
-- Vitaura Nutrition — Flyway Migration V5
-- Admin Users Schema
-- ============================================================

CREATE TABLE admin_users (
    id              BIGSERIAL       PRIMARY KEY,
    email           VARCHAR(254)    NOT NULL UNIQUE,
    -- BCrypt hashed password (strength 12) — NEVER store plaintext
    password_hash   VARCHAR(60)     NOT NULL,
    name            VARCHAR(200)    NOT NULL,
    role            VARCHAR(50)     NOT NULL DEFAULT 'ADMIN' CHECK (role IN ('SUPER_ADMIN', 'ADMIN')),
    active          BOOLEAN         NOT NULL DEFAULT true,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_active ON admin_users(active);

-- Refresh tokens for JWT
CREATE TABLE admin_refresh_tokens (
    id          BIGSERIAL       PRIMARY KEY,
    admin_id    BIGINT          NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash  VARCHAR(64)     NOT NULL UNIQUE,  -- SHA-256 of the token
    expires_at  TIMESTAMPTZ     NOT NULL,
    revoked     BOOLEAN         NOT NULL DEFAULT false,
    ip_address  INET,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_admin ON admin_refresh_tokens(admin_id);
CREATE INDEX idx_refresh_tokens_hash ON admin_refresh_tokens(token_hash);
CREATE INDEX idx_refresh_tokens_expires ON admin_refresh_tokens(expires_at);
