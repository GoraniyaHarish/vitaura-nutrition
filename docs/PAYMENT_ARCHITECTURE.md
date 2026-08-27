# VITAURA — Payment Architecture & Demo Mode Strategy

> **Active Strategy**: `PAYMENT_PROVIDER=demo`  
> **Target Environment**: Public Demo / Evaluation Staging  
> **Safety Guarantee**: 100% Simulated Transactions (Zero Real Financial Transfers)  

---

## 1. Architectural Pattern: Provider Strategy

The payment subsystem is decoupled using the **Strategy Pattern** with a factory resolver:

```text
                     ┌──────────────────────────────┐
                     │         OrderService         │
                     └──────────────┬───────────────┘
                                    │
                                    │ paymentServiceFactory.getPaymentService()
                                    ▼
                     ┌──────────────────────────────┐
                     │    PaymentService Interface  │
                     └──────────────┬───────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            │                                               │
            ▼                                               ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│   DemoPaymentService (ACTIVE) │               │   RazorpayPaymentService      │
│  - No external API keys req.  │               │  - (Inactive until live keys) │
│  - Instant CONFIRMED status   │               │  - Webhook verification       │
│  - DEMO_PAID payment status   │               │  - Razorpay SDK integration   │
│  - Generates DEMO-TXN-xxxx    │               │  - Signature checks           │
└───────────────────────────────┘               └───────────────────────────────┘
```

---

## 2. Component Specification

### A. Interface: `in.VITAURA.service.payment.PaymentService`
Defines the standard lifecycle methods:
- `PaymentResponse processPayment(Order order, String paymentMethod)`
- `PaymentResponse verifyPayment(String paymentReference, String signature)`
- `PaymentResponse getPaymentStatus(String paymentReference)`
- `String getProviderName()`

### B. Active Implementation: `DemoPaymentService`
When `VITAURA.payment.provider` equals `demo` (default):
1. Accepts order from `OrderService`.
2. Generates simulated transaction reference: `DEMO-TXN-<RANDOM_HEX>`.
3. Sets `order.setPaymentStatus(PaymentStatus.DEMO_PAID)`.
4. Sets `order.setStatus(OrderStatus.CONFIRMED)`.
5. Sets `order.setPaymentMethod("DEMO")`.
6. Returns `PaymentResponse` with `demo = true` and user-friendly simulated demo confirmation message.
7. **No HTTP requests are made to Razorpay, PhonePe, UPI gateways, or banking servers.**

### C. Future Extension: `RazorpayPaymentService`
Ready for production activation simply by setting:
```env
PAYMENT_PROVIDER=razorpay
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
```
`OrderService` requires **zero code modifications** to switch between Demo and Live payment processing.

---

## 3. Database Schema Alignment (Flyway V8)

Flyway migration `V8__add_demo_payment_support.sql` provides database-level constraints supporting both demo and real methods:
- `payment_status`: `('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED', 'DEMO_PAID')`
- `payment_method`: `('COD', 'RAZORPAY', 'PHONEPE', 'DEMO')`
- `orders` and `order_items` tables persist full itemized details for reporting.
