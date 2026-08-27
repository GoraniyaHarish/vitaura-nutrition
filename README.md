# Vitaura Nutrition — Pure Nutrition. Elevated Living.

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)](https://nextjs.org/)
[![Java](https://img.shields.io/badge/Backend-Spring%20Boot%203.5-brightgreen?logo=spring)](https://spring.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2016-blue?logo=postgresql)](https://www.postgresql.org/)

> "Vitaura is a premium D2C health and nutrition platform offering chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean ingredients."

A production-ready full-stack e-commerce web platform engineered with a Next.js App Router storefront, Java (Spring Boot) REST API, Flyway schema migrations, and PostgreSQL relational database persistence.

---

## 🌿 Architecture & Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide React
- **Backend:** Java 25 (Spring Boot 3.5 / REST API), Spring Data JPA / Hibernate, Flyway
- **Database:** PostgreSQL (Docker containerized)
- **Design System:** Vitaura Botanical Color System (`#0F382C`, `#3B6E58`, `#D97706`, `#FDFBF7`)

---

## 📁 Repository Structure

```text
vitaura/
├── frontend/                   # Next.js Storefront Application
│   ├── public/                 # Static photographic assets & product photography
│   ├── src/                    # App Router pages, layout & UI components
│   ├── package.json
│   └── tsconfig.json
├── backend/                    # Java Spring Boot API
│   ├── src/main/java/com/vitaura # Controllers, Services, Entities, Repositories
│   ├── src/main/resources/     # application.yml & Flyway migrations
│   └── pom.xml
├── docs/                       # Architecture & API documentation
├── .github/workflows/ci.yml    # Automated GitHub Actions pipeline
├── docker-compose.yml          # PostgreSQL container
├── .env.local.example          # Unified environment template
├── .gitignore
└── package.json                # Unified monorepo runner
```

---

## 🚀 Quickstart Guide

### 1. Start Database Container

```bash
docker compose up -d
```

### 2. Install Root Dependencies & Run Everything

```bash
npm install
npm run dev
```

* Storefront: `http://localhost:3000`
* API Service: `http://localhost:8080`

### 3. Production Build Verification

```bash
npm run build
```
