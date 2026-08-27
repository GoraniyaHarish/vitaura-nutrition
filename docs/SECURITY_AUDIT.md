# VITAURA — Security Audit & Red Team Report

> **Target**: VITAURA Backend API (`http://localhost:8080`) & Frontend App Router (`http://localhost:3000`)  
> **Evaluation Date**: 2026-08-22  
> **Security Posture**: PASSED (Zero Critical / High Vulnerabilities)  

---

## 1. Executive Summary

A comprehensive automated and manual security red-team assessment was conducted against the VITAURA platform. All tested attack vectors—including quantity manipulation, client-side price tampering, financial calculation overrides, SQL injection payloads, unauthorized administrative route access, and IDOR order lookups—were successfully defended and rejected by the backend server.

---

## 2. Red Team Test Execution & Results

| Attack Vector | Test Payload / Scenario | Expected Response | Actual Status | Actual Behavior | Result |
|---|---|---|---|---|---|
| **Negative Quantity Attack** | `POST /api/orders` with `quantity: -5` | HTTP 400 Bad Request | **HTTP 400** | Caught by Bean Validation (`@Min(1)`). Sanitized `ApiError` returned. | ✅ **PASS** |
| **Zero Quantity Attack** | `POST /api/orders` with `quantity: 0` | HTTP 400 Bad Request | **HTTP 400** | Caught by Bean Validation (`@Min(1)`). | ✅ **PASS** |
| **Excessive Quantity Attack** | `POST /api/orders` with `quantity: 10000` | HTTP 400 Bad Request | **HTTP 400** | Caught by Bean Validation (`@Max(50)`). Quantity limits enforced. | ✅ **PASS** |
| **Quantity Boundary (50 - Max)** | `POST /api/orders` with `quantity: 50` | HTTP 200 OK | **HTTP 200** | Successfully processed at boundary limit (₹12,450.00 subtotal). | ✅ **PASS** |
| **Quantity Boundary (51 - Exceeds)** | `POST /api/orders` with `quantity: 51` | HTTP 400 Bad Request | **HTTP 400** | Successfully rejected at boundary + 1. | ✅ **PASS** |
| **Price Tampering Attack** | `POST /api/orders` injecting `price: 1, total: 1, subtotal: 1, deliveryFee: 0` | Backend ignores client financial values | **HTTP 200** | Backend fetched DB price (₹249 = 24900 paise) + fee (₹30 = 3000 paise) -> Authoritative Total = ₹279 (27900 paise). Client values strictly ignored. | ✅ **PASS** |
| **Non-Existent Product ID** | `POST /api/orders` with `productId: 999999` | HTTP 404 Not Found | **HTTP 404** | Throws `ResourceNotFoundException`. Clean error without DB leak. | ✅ **PASS** |
| **SQL Injection (Pincode Param)** | `GET /api/delivery/check?pincode=' OR '1'='1` | Safe sanitization / Unserviceable | **HTTP 200** | Parameterized JPA query executed safely; returned `available: false`. | ✅ **PASS** |
| **SQL Injection (Destructive Payload)** | `GET /api/delivery/check?pincode=360001; DROP TABLE products;` | Parameterized binding | **HTTP 200** | Safely queried as string literal; database tables completely intact. | ✅ **PASS** |
| **Unauthorized Admin Endpoint** | `GET /api/admin/orders` without JWT | HTTP 403 Forbidden / 401 | **HTTP 403** | Spring Security filter blocked request before reaching controller. | ✅ **PASS** |
| **Missing Required Fields** | `POST /api/orders` omitting `customerPhone` | HTTP 400 Bad Request | **HTTP 400** | Caught by `@NotBlank` validation on DTO. | ✅ **PASS** |
| **Invalid Email Format** | `POST /api/contact` with `email: "not-an-email"` | HTTP 400 Bad Request | **HTTP 400** | Caught by `@Email` validation annotation. | ✅ **PASS** |
| **IDOR Non-Existent Order** | `GET /api/orders/NON-EXISTENT-ID` | HTTP 404 Not Found | **HTTP 404** | Cleanly handled by `GlobalExceptionHandler`. | ✅ **PASS** |

---

## 3. Financial Integrity & Currency Handling

1. **Integer Arithmetic**: All monetary values (`subtotal`, `delivery_fee`, `total`, `discount`, `unit_price`, `total_price`) are stored and computed strictly as **64-bit Integers (BIGINT) in Paise** (1 INR = 100 paise).
2. **Zero Floating-Point Drift**: Floating-point types (`float`, `double`) are prohibited in the financial calculation pipeline, preventing rounding discrepancies and accumulator exploits.
3. **Server-Side Authority**: Frontend cart prices are purely visual representations. The Spring Boot backend recalculates subtotal and delivery fees dynamically using verified database records.

---

## 4. Secret Isolation & Environment Security

- Database passwords and JWT secrets are externalized via environment variables.
- Production and demo environment variables are isolated in `.env.example` templates with zero committed credentials.
- Spring Boot error configuration (`server.error.include-stacktrace=never`, `server.error.include-exception=false`) guarantees that no internal stack traces or database connection details leak to the client.
