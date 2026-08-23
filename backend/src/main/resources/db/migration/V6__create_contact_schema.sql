-- ============================================================
-- GronLiv — Flyway Migration V6
-- Contact Submissions Schema
-- ============================================================

CREATE TABLE contact_submissions (
    id          BIGSERIAL       PRIMARY KEY,
    name        VARCHAR(200)    NOT NULL,
    email       VARCHAR(254)    NOT NULL,
    message     TEXT            NOT NULL,
    -- Track IP for rate limiting (stored for 30 days max)
    ip_address  VARCHAR(45),
    -- Track if responded
    responded   BOOLEAN         NOT NULL DEFAULT false,
    responded_at TIMESTAMPTZ,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_ip ON contact_submissions(ip_address);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at DESC);
