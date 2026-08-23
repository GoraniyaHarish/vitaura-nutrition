# GrønLiv — Premium D2C Organic Nutrition Storefront

A full-stack, luxury e-commerce web application engineered with a Next.js App Router frontend, a Java (Spring Boot) REST API, and PostgreSQL relational database persistence.

---

## 🌿 Architecture & Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide React
- **Backend:** Java (Spring Boot / REST API), Spring Data JPA / Hibernate
- **Database:** PostgreSQL
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
├── .env.local.example          # Frontend environment template
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0+ / npm v9+
- **Java JDK**: 17+ or 25 LTS
- **Maven**: 3.9+
- **PostgreSQL**: 15+

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The storefront will run locally at `http://localhost:3000`.

### 3. Backend Setup
```bash
cd backend
mvn spring-boot:run
```
The Spring Boot REST API will run locally at `http://localhost:8080`.

---

## 🔒 Security & Environment Setup
- Copy `.env.local.example` to `frontend/.env.local` and `backend/.env` for local configuration.
- Never commit real credentials or secret keys to version control.
