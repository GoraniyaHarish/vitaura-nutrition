# VITAURA NUTRITION — PURE NUTRITION. ELEVATED LIVING. 🌿

> **Brand:** Vitaura Nutrition  
> **Tagline:** "Pure Nutrition. Elevated Living."  
> **Description:** "Vitaura is a premium D2C health and nutrition platform offering chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean ingredients."

---

## 1. System Overview

Vitaura Nutrition is a premium full-stack D2C health & nutrition e-commerce platform.

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Backend:** Spring Boot 3.5.4, Java 25 LTS, REST APIs, Spring Security.
- **Database:** PostgreSQL, Flyway database migrations.
- **Monetary Standard:** Integer Paise format (`24900` paise = ₹249).
- **Payment Architecture:** Abstracted `PaymentService` defaulting to zero-credential `DEMO` mode.

---

## 2. Directory Structure

```text
vitaura/
├── backend/            # Spring Boot REST API & PostgreSQL Flyway migrations (com.vitaura)
├── frontend/           # Next.js 16 App Router UI & Tailwind CSS v4 styling
├── docs/               # Architecture, Deployment, QA, & Structure Documentation
├── docker-compose.yml  # PostgreSQL container
├── .env.local.example  # Environment variables template
├── README.md           # Root documentation
└── package.json        # Unified monorepo runner
```

---

## 3. Quick Start (Local Development)

### Prerequisites
- Java 25 LTS & Maven 3.9+
- Node.js v20+ & npm 10+
- PostgreSQL running on `localhost:5432` with database `vitaura_db`

### Start Backend (Port 8080)
```powershell
cd backend
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
$env:DB_NAME="vitaura_db"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_password"
$env:PAYMENT_PROVIDER="demo"
mvn spring-boot:run
```

### Start Frontend (Port 3000)
```powershell
cd frontend
$env:NEXT_PUBLIC_VITAURA_API_URL="http://localhost:8080"
npm run dev
```

Visit `http://localhost:3000` to interact with the Vitaura Nutrition storefront.
