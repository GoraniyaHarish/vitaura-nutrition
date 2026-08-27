# VITAURA — PUBLIC DEMO DEPLOYMENT GUIDE

> **Evaluation Label:** `PUBLIC DEMO READY`  
> **Hosting Targets:** Vercel (Frontend), Render (Backend), Neon (PostgreSQL Database)

---

## 1. Environment Variables Configuration

### Backend Environment Variables (`backend/.env`)

```properties
DB_HOST=your-neon-db-hostname.neon.tech
DB_PORT=5432
DB_NAME=VITAURA
DB_USERNAME=your_db_user
DB_PASSWORD=your_secure_db_password
PAYMENT_PROVIDER=demo
JWT_SECRET=your_256_bit_random_jwt_secret_hex
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
```

### Frontend Environment Variables (`frontend/.env.local`)

```properties
NEXT_PUBLIC_API_URL=https://your-backend-api.onrender.com
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=919000000000
NEXT_PUBLIC_CONTACT_EMAIL=hello@VITAURA.com
NEXT_PUBLIC_INSTAGRAM_HANDLE=VITAURA
```

---

## 2. Deployment Execution Steps

1. **Database Setup:**
   - Provision a PostgreSQL 18 instance on Neon or AWS RDS.
   - Create empty database `VITAURA`.

2. **Backend Deployment (Render / Docker):**
   - Connect repository `backend/` directory.
   - Build command: `mvn clean package -DskipTests`
   - Start command: `java -jar target/VITAURA-backend-0.1.0-SNAPSHOT.jar`
   - Flyway automatically runs migrations V1–V8 on startup.

3. **Frontend Deployment (Vercel):**
   - Connect repository `frontend/` directory.
   - Build command: `npm run build`
   - Set environment variable `NEXT_PUBLIC_API_URL`.
