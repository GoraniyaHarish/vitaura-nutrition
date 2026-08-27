# VITAURA NUTRITION — PROJECT ARCHITECTURE & CODE ORGANIZATION

> **Evaluation Label:** `PORTFOLIO READY & VERIFIED`  
> **Brand:** Vitaura Nutrition — "Pure Nutrition. Elevated Living."

---

## 1. Project Folder Structure

```text
vitaura/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── vitaura/
│   │       │           ├── config/
│   │       │           │   ├── AppProperties.java
│   │       │           │   ├── CorsConfig.java
│   │       │           │   ├── RateLimitConfig.java
│   │       │           │   └── SecurityConfig.java
│   │       │           ├── controller/
│   │       │           │   ├── CategoryController.java
│   │       │           │   ├── ContactController.java
│   │       │           │   ├── DeliveryController.java
│   │       │           │   ├── HealthController.java
│   │       │           │   ├── OrderController.java
│   │       │           │   └── ProductController.java
│   │       │           ├── domain/
│   │       │           │   ├── AdminRole.java
│   │       │           │   ├── AdminUser.java
│   │       │           │   ├── ContactSubmission.java
│   │       │           │   ├── DeliveryZone.java
│   │       │           │   ├── Ingredient.java
│   │       │           │   ├── NutritionInfo.java
│   │       │           │   ├── Order.java
│   │       │           │   ├── OrderItem.java
│   │       │           │   ├── OrderStatus.java
│   │       │           │   ├── PaymentStatus.java
│   │       │           │   ├── Pincode.java
│   │       │           │   ├── Product.java
│   │       │           │   └── ProductCategory.java
│   │       │           ├── dto/
│   │       │           │   ├── ApiError.java
│   │       │           │   ├── CategoryDTO.java
│   │       │           │   ├── ContactRequest.java
│   │       │           │   ├── CreateOrderRequest.java
│   │       │           │   ├── DeliveryCheckResponse.java
│   │       │           │   ├── NutritionInfoDTO.java
│   │       │           │   ├── OrderResponse.java
│   │       │           │   ├── PaymentResponse.java
│   │       │           │   ├── ProductDTO.java
│   │       │           │   └── ProductListDTO.java
│   │       │           ├── exception/
│   │       │           │   ├── GlobalExceptionHandler.java
│   │       │           │   ├── RateLimitException.java
│   │       │           │   └── ResourceNotFoundException.java
│   │       │           ├── repository/
│   │       │           │   ├── AdminUserRepository.java
│   │       │           │   ├── CategoryRepository.java
│   │       │           │   ├── ContactSubmissionRepository.java
│   │       │           │   ├── DeliveryZoneRepository.java
│   │       │           │   ├── NutritionInfoRepository.java
│   │       │           │   ├── OrderRepository.java
│   │       │           │   ├── PincodeRepository.java
│   │       │           │   └── ProductRepository.java
│   │       │           ├── service/
│   │       │           │   ├── CategoryService.java
│   │       │           │   ├── ContactService.java
│   │       │           │   ├── DeliveryService.java
│   │       │           │   ├── OrderService.java
│   │       │           │   ├── PaymentService.java
│   │       │           │   └── ProductService.java
│   │       │           └── VitauraApplication.java
│   │       └── resources/
│   │           ├── db/migration/
│   │           │   ├── V1__create_product_schema.sql
│   │           │   ├── V2__create_customer_schema.sql
│   │           │   ├── V3__create_order_schema.sql
│   │           │   ├── V4__create_delivery_schema.sql
│   │           │   ├── V5__create_admin_schema.sql
│   │           │   ├── V6__create_contact_schema.sql
│   │           │   ├── V7__create_seed_data.sql
│   │           │   ├── V8__add_demo_payment_support.sql
│   │           │   └── V9__add_performance_indexes.sql
│   │           └── application.yml
│   ├── .env.example
│   ├── .gitignore
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   │   └── images/
│   │       ├── vanilla-matcha-zen.jpg
│   │       ├── dark-cacao-recharge.jpg
│   │       ├── wild-berry-collagen.jpg
│   │       ├── golden-turmeric-cleanse.jpg
│   │       ├── acai-power-bowl.jpg
│   │       ├── quinoa-avocado-harvest.jpg
│   │       ├── cacao-hazelnut-energy-bites.jpg
│   │       ├── almond-flax-protein-bar.jpg
│   │       ├── matcha.jpg
│   │       ├── raw-cacao.jpg
│   │       ├── berries.jpg
│   │       ├── almonds.jpg
│   │       ├── avocado.jpg
│   │       ├── kitchen.jpg
│   │       ├── story-crafted.jpg
│   │       └── why-vitaura-ingredients.jpg
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── delivery/
│   │   │   │   └── page.tsx
│   │   │   ├── menu/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   ├── product/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── robots.ts
│   │   │   └── sitemap.ts
│   │   ├── components/
│   │   │   ├── cart/
│   │   │   │   └── CartPageContent.tsx
│   │   │   ├── contact/
│   │   │   │   └── ContactPageContent.tsx
│   │   │   ├── delivery/
│   │   │   │   └── DeliveryPageContent.tsx
│   │   │   ├── home/
│   │   │   │   ├── DeliverySection.tsx
│   │   │   │   ├── FeaturedProducts.tsx
│   │   │   │   ├── FinalCTA.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── IngredientGallery.tsx
│   │   │   │   ├── USPStrip.tsx
│   │   │   │   └── WhyVitaura.tsx
│   │   │   ├── layout/
│   │   │   │   ├── AnnouncementBar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── MobileBottomNav.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── menu/
│   │   │   │   └── MenuPageContent.tsx
│   │   │   └── ui/
│   │   │       ├── AddToCartButton.tsx
│   │   │       ├── CustomCursor.tsx
│   │   │       ├── LoadingModal.tsx
│   │   │       ├── ProductCard.tsx
│   │   │       └── WhatsAppFAB.tsx
│   │   ├── context/
│   │   │   └── CartContext.tsx
│   │   └── lib/
│   │       ├── api.ts
│   │       └── utils.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
├── docker-compose.yml
├── .env.local.example
├── .gitignore
└── package.json
```
