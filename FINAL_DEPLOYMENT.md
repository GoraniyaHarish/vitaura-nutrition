# GRONLIV — FINAL PUBLIC DEMO DEPLOYMENT GUIDE

> **Evaluation Label:** `PUBLIC DEMO READY`  
> **Brand:** GRONLIV 🧋 — EAT BETTER. LIVE BETTER.  
> **Target Environment:** Free Public Staging / Demo Hosting (Vercel + Render + Neon PostgreSQL)  
> **Payment Mode:** Simulated Demo Mode (`PAYMENT_PROVIDER=demo`)

---

## 1. System Architecture Overview

```text
               ┌──────────────────────────────────────────────┐
               │              NEXT.JS 16 FRONTEND             │
               │         TypeScript + Tailwind CSS v4         │
               │            Hosted on Vercel / Netlify         │
               └──────────────────────┬───────────────────────┘
                                      │
                         HTTPS REST API Calls (Paise/INR)
                                      │
               ┌──────────────────────▼───────────────────────┐
               │           SPRING BOOT 3.5.4 BACKEND          │
               │            Java 25 LTS (Port 8080)           │
               │           Hosted on Render / Docker          │
               └──────────────┬────────────────┬──────────────┘
                              │                │
             Authoritative DB │                │ Payment Abstraction
             Price Calculations│                │ (PAYMENT_PROVIDER=demo)
                              │                │
            ┌─────────────────▼────────┐  ┌────▼─────────────────────────┐
            │   POSTGRESQL 18 DATABASE │  │  PaymentService Abstraction   │
            │  Managed by Flyway V1-V8 │  │ ├── DemoPaymentService (Active)│
            │  Hosted on Neon / RDS    │  │ └── RazorpayPaymentService    │
            └──────────────────────────┘  └─────────────────────────────┘
```

---

## 2. Environment Variables Specification

### A. Backend Configuration (`backend/.env`)

| Variable Name | Default / Demo Value | Purpose | Production / Hosting Setup |
|---|---|---|---|
| `DB_HOST` | `localhost` | PostgreSQL Server Host | Set to Neon/RDS database hostname |
| `DB_PORT` | `5432` | PostgreSQL Server Port | Set to database port (e.g. `5432`) |
| `DB_NAME` | `gronliv` | Database Name | Set to target database name |
| `DB_USERNAME` | `postgres` | Database User | Set to database application user |
| `DB_PASSWORD` | *(Local Secret)* | Database Password | Set via secret manager / platform dashboard |
| `PAYMENT_PROVIDER` | `demo` | Active Payment Provider | Defaults to `demo` (Zero payment API keys required) |
| `JWT_SECRET` | *(256-bit Key)* | JWT Signing Key | Generate via `openssl rand -hex 32` |
| `CORS_ALLOWED_ORIGINS` | `https://gronliv.in` | Allowed Frontend Origins | Comma-separated list of allowed origins |

### B. Frontend Configuration (`frontend/.env.local`)

| Variable Name | Default / Demo Value | Purpose | Client Exposure |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | Spring Boot API Endpoint | Public (Inlined at build time) |
| `NEXT_PUBLIC_SITE_URL` | `https://gronliv.in` | Canonical Site Base URL | Public (Used in Open Graph & Sitemap) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919000000000` | Support WhatsApp Channel | Public |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@gronliv.com` | Support Email Address | Public |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | `gronliv` | Instagram Social Handle | Public |

---

## 3. Database Setup & Flyway Migration Procedure

1. **Database Provisioning:**
   - Provision a PostgreSQL 18 instance on Neon, Supabase, or AWS RDS.
   - Create empty database `gronliv`.
2. **Automated Migration Execution:**
   - On backend startup, Spring Boot + Flyway automatically validates and executes migrations `V1` through `V8` in exact chronological sequence:
     - `V1`: Products, Categories, Ingredients, Nutrition Info (Paise Integer monetary columns).
     - `V2`: Customer & Address tables.
     - `V3`: Orders & OrderItems tables with status constraints.
     - `V4`: Delivery Zones & Pincodes schema.
     - `V5`: Admin Users & JWT Refresh Tokens schema.
     - `V6`: Contact Submissions schema.
     - `V7`: Demo Seed Data (4 nutrition shakes, categories, pincodes).
     - `V8`: Demo Payment Support (`DEMO_PAID` status & `DEMO` method constraints).

---

## 4. Demo Payment Architecture Behavior

- **Zero Credentials Needed:** Running with `PAYMENT_PROVIDER=demo` requires **no Razorpay, PhonePe, or payment gateway API keys**.
- **Server-Side Financial Security:**
  - Product prices are fetched authoritatively from PostgreSQL `products` table (`24900` paise = ₹249).
  - Delivery fees are fetched authoritatively from PostgreSQL `delivery_zones` table (`3000` paise = ₹30).
  - Item quantities are validated (`@Min(1)` `@Max(50)`).
  - Client-provided price parameters are strictly ignored.
- **Order Processing Flow:**
  - Order status is set to `CONFIRMED`.
  - Payment status is set to `DEMO_PAID`.
  - Payment method is set to `DEMO`.
  - Order reference `DEMO-TXN-<ORDER_ID>` is recorded in PostgreSQL `orders` table.

---

## 5. Security & Isolation Notes

- **Secrets Hygiene:** No passwords, JWT secrets, or private keys are stored in source control or exposed in frontend bundles.
- **Stack Trace Suppression:** All error responses return sanitized `ApiError` JSON objects (`timestamp`, `status`, `message`, `path`). Technical stack traces, SQL internals, and filesystem paths are completely masked.
- **Admin Endpoint Protection:** Endpoint `/api/admin/**` is protected by Spring Security (HTTP 403 Forbidden for unauthorized requests).

---

## 6. Known Demo Limitations

- **Simulated Payment:** Payments are generated in `DEMO_PAID` state without real banking or UPI transactions.
- **Demo Seed Products:** Menu items, prices, and nutrition values in Flyway `V7` are illustrative placeholders.
- **Guest Orders:** Current checkout flow is guest-first; customer accounts can be expanded with full JWT authentication.

---

## 7. Future Razorpay Production Activation Plan

To transition from Demo Mode to Live Financial Transactions:
1. Change backend environment variable: `PAYMENT_PROVIDER=razorpay`.
2. Supply `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in server environment.
3. Complete `RazorpayPaymentService.java` implementation using Razorpay Java SDK `RazorpayClient`.
4. **Zero architectural refactoring required** — `OrderService`, database schema, and frontend routes remain untouched.
