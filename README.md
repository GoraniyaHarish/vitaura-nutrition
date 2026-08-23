# GrønLiv — Premium D2C Organic Nutrition Storefront

[![CI Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)](https://nextjs.org/)
[![Java](https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen?logo=spring)](https://spring.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2016-blue?logo=postgresql)](https://www.postgresql.org/)

A production-ready full-stack e-commerce web platform engineered with a Next.js App Router storefront, Java (Spring Boot) REST API, and PostgreSQL relational database persistence.

---

## 📸 Storefront Preview

| Desktop Showcase (1440px) | Mobile Experience (390px) |
| :---: | :---: |
| ![Desktop View](docs/screenshots/desktop-hero.png) | ![Mobile View](docs/screenshots/mobile-pdp.png) |

---

## 🌿 Architecture & Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide React
- **Backend:** Java (Spring Boot / REST API), Spring Data JPA / Hibernate
- **Database:** PostgreSQL (Docker containerized)
- **Design System:** Custom Organic Luxury Design Tokens

---

## 📁 Repository Structure

```text
gronliv/
├── frontend/                   # Next.js Storefront Application
│   ├── public/                 # Static media assets & product photography
│   ├── src/                    # App Router pages, layout & UI components
│   ├── package.json
│   └── tsconfig.json
├── backend/                    # Java Spring Boot API
│   ├── src/main/java/          # Controllers, Services, Entities, Repositories
│   ├── src/main/resources/     # application.properties & configuration
│   └── pom.xml
├── docs/                       # Architecture & API documentation
├── .github/workflows/ci.yml    # Automated GitHub Actions pipeline
├── docker-compose.yml          # 1-Click PostgreSQL container
├── .env.local.example          # Frontend environment template
├── .gitignore
└── package.json                # Unified monorepo runner
```

---

## 🚀 1-Click Quickstart Guide

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
