-- ============================================================
-- GronLiv — Flyway Migration V8
-- Add DEMO Payment Support
-- ============================================================

ALTER TABLE orders DROP CONSTRAINT orders_payment_status_check;
ALTER TABLE orders ADD CONSTRAINT orders_payment_status_check 
    CHECK (payment_status IN ('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED', 'DEMO_PAID'));

ALTER TABLE orders DROP CONSTRAINT orders_payment_method_check;
ALTER TABLE orders ADD CONSTRAINT orders_payment_method_check 
    CHECK (payment_method IN ('COD', 'RAZORPAY', 'PHONEPE', 'DEMO'));
