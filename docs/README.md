# GRONLIV — EAT BETTER. LIVE BETTER. 🧋

> **Premium Fresh Nutrition Platform — Rajkot, Gujarat, India**  
> **Evaluation Status:** `PUBLIC DEMO READY & VISUALLY APPROVED`

---

## 1. System Overview

GronLiv is a premium nutrition platform offering fresh, preservative-free nutrition shakes and superfood bowls. 

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Backend:** Spring Boot 3.5.4, Java 25 LTS, REST APIs, Spring Security.
- **Database:** PostgreSQL 18, Flyway V1–V8 database migrations.
- **Monetary Standard:** Integer Paise format (`24900` paise = ₹249).
- **Payment Architecture:** Abstracted `PaymentService` defaulting to zero-credential `DEMO` mode.

---

## 2. Directory Structure

```text
GROLIV/
├── backend/            # Spring Boot REST API & PostgreSQL Flyway migrations
├── frontend/           # Next.js 16 App Router UI & Tailwind CSS v4 styling
├── docs/               # Architecture, Deployment, QA, & Structure Documentation
│   ├── README.md
│   ├── PROJECT_STATUS.md
│   ├── DEPLOYMENT.md
│   ├── QA_REPORT.md
│   ├── PROJECT_STRUCTURE.md
│   └── stitch_design_reference/
├── README.md           # Root documentation
├── FINAL_DEPLOYMENT.md # Public demo deployment instructions
└── .gitignore          # Root environment & build exclusions
```

---

## 3. Quick Start (Local Development)

### Prerequisites
- Java 25 LTS & Maven 3.9+
- Node.js v24+ & npm 11+
- PostgreSQL 18 running on `localhost:5432` with database `gronliv`

### Start Backend (Port 8080)
```powershell
cd backend
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
$env:DB_NAME="gronliv"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="0312"
$env:PAYMENT_PROVIDER="demo"
mvn spring-boot:run
```

### Start Frontend (Port 3000)
```powershell
cd frontend
$env:NEXT_PUBLIC_API_URL="http://localhost:8080"
npm run dev
```

Visit `http://localhost:3000` in Google Chrome to test the live platform.
