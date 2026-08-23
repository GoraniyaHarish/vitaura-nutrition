import os

base_dir = r"d:\GROLIV\backend\src\main\java\in\gronliv"

files = {
    # ---------------- ENUMS ----------------
    "domain/OrderStatus.java": """package in.gronliv.domain;
public enum OrderStatus { PENDING, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED }
""",
    "domain/PaymentStatus.java": """package in.gronliv.domain;
public enum PaymentStatus { PENDING, AUTHORIZED, PAID, FAILED, REFUNDED }
""",
    "domain/AdminRole.java": """package in.gronliv.domain;
public enum AdminRole { SUPER_ADMIN, ADMIN }
""",

    # ---------------- ENTITIES ----------------
    "domain/ProductCategory.java": """package in.gronliv.domain;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="product_categories")
public class ProductCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String slug;
    
    private String name;
    private String description;
    private boolean active;
    private int sortOrder;
    
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
""",
    "domain/Product.java": """package in.gronliv.domain;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String slug;
    
    private String name;
    private String shortDescription;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Long price; // paise
    private String imageUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private ProductCategory category;
    
    @ElementCollection
    @CollectionTable(name="product_tags", joinColumns=@JoinColumn(name="product_id"))
    @Column(name="tag")
    private List<String> tags;
    
    private boolean available;
    private boolean featured;
    private int sortOrder;
    
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getPrice() { return price; }
    public void setPrice(Long price) { this.price = price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public ProductCategory getCategory() { return category; }
    public void setCategory(ProductCategory category) { this.category = category; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
""",
    "domain/NutritionInfo.java": """package in.gronliv.domain;
import jakarta.persistence.*;

@Entity
@Table(name="nutrition_info")
public class NutritionInfo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;
    
    private String servingSize;
    private int calories;
    private int protein; // grams * 10
    private int carbohydrates;
    private int fat;
    private int fiber;
    private int sugar;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public String getServingSize() { return servingSize; }
    public void setServingSize(String servingSize) { this.servingSize = servingSize; }
    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }
    public int getProtein() { return protein; }
    public void setProtein(int protein) { this.protein = protein; }
    public int getCarbohydrates() { return carbohydrates; }
    public void setCarbohydrates(int carbohydrates) { this.carbohydrates = carbohydrates; }
    public int getFat() { return fat; }
    public void setFat(int fat) { this.fat = fat; }
    public int getFiber() { return fiber; }
    public void setFiber(int fiber) { this.fiber = fiber; }
    public int getSugar() { return sugar; }
    public void setSugar(int sugar) { this.sugar = sugar; }
}
""",
    "domain/Ingredient.java": """package in.gronliv.domain;
import jakarta.persistence.*;

@Entity
@Table(name="ingredients")
public class Ingredient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String imageUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
""",
    "domain/DeliveryZone.java": """package in.gronliv.domain;
import jakarta.persistence.*;

@Entity
@Table(name="delivery_zones")
public class DeliveryZone {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private boolean active;
    private Long deliveryFee; // paise
    private int estimatedMinutes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public Long getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Long deliveryFee) { this.deliveryFee = deliveryFee; }
    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
}
""",
    "domain/Pincode.java": """package in.gronliv.domain;
import jakarta.persistence.*;

@Entity
@Table(name="pincodes")
public class Pincode {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 6, unique = true)
    private String code;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="zone_id")
    private DeliveryZone zone;
    
    private boolean active;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public DeliveryZone getZone() { return zone; }
    public void setZone(DeliveryZone zone) { this.zone = zone; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
""",
    "domain/Order.java": """package in.gronliv.domain;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String orderNumber;
    
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    
    private String deliveryAddress;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    
    private String paymentMethod;
    
    private Long subtotal; // paise
    private Long deliveryFee; // paise
    private Long discount; // paise
    private Long total; // paise
    
    private String notes;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
    
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime confirmedAt;
    private LocalDateTime deliveredAt;

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public Long getSubtotal() { return subtotal; }
    public void setSubtotal(Long subtotal) { this.subtotal = subtotal; }
    public Long getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Long deliveryFee) { this.deliveryFee = deliveryFee; }
    public Long getDiscount() { return discount; }
    public void setDiscount(Long discount) { this.discount = discount; }
    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public LocalDateTime getConfirmedAt() { return confirmedAt; }
    public void setConfirmedAt(LocalDateTime confirmedAt) { this.confirmedAt = confirmedAt; }
    public LocalDateTime getDeliveredAt() { return deliveredAt; }
    public void setDeliveredAt(LocalDateTime deliveredAt) { this.deliveredAt = deliveredAt; }
}
""",
    "domain/OrderItem.java": """package in.gronliv.domain;
import jakarta.persistence.*;

@Entity
@Table(name="order_items")
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_id")
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;
    
    private int quantity;
    private Long unitPrice; // paise
    private Long totalPrice; // paise

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public Long getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Long unitPrice) { this.unitPrice = unitPrice; }
    public Long getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Long totalPrice) { this.totalPrice = totalPrice; }
}
""",
    "domain/ContactSubmission.java": """package in.gronliv.domain;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="contact_submissions")
public class ContactSubmission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private String ipAddress;
    
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
""",
    "domain/AdminUser.java": """package in.gronliv.domain;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="admin_users")
public class AdminUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String passwordHash;
    private String name;
    
    @Enumerated(EnumType.STRING)
    private AdminRole role;
    
    private boolean active;
    private LocalDateTime lastLoginAt;
    
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public AdminRole getRole() { return role; }
    public void setRole(AdminRole role) { this.role = role; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(LocalDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
""",

    # ---------------- DTOs ----------------
    "dto/ProductDTO.java": """package in.gronliv.dto;
import java.util.List;
public class ProductDTO {
    private String slug;
    private String name;
    private String shortDescription;
    private String description;
    private Long price;
    private String imageUrl;
    private String categoryName;
    private List<String> tags;
    private boolean available;

    // Getters and Setters
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getPrice() { return price; }
    public void setPrice(Long price) { this.price = price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
""",
    "dto/ProductListDTO.java": """package in.gronliv.dto;
import java.util.List;
public class ProductListDTO {
    private List<ProductDTO> products;
    private long totalElements;
    private int totalPages;
    private int currentPage;

    public List<ProductDTO> getProducts() { return products; }
    public void setProducts(List<ProductDTO> products) { this.products = products; }
    public long getTotalElements() { return totalElements; }
    public void setTotalElements(long totalElements) { this.totalElements = totalElements; }
    public int getTotalPages() { return totalPages; }
    public void setTotalPages(int totalPages) { this.totalPages = totalPages; }
    public int getCurrentPage() { return currentPage; }
    public void setCurrentPage(int currentPage) { this.currentPage = currentPage; }
}
""",
    "dto/CategoryDTO.java": """package in.gronliv.dto;
public class CategoryDTO {
    private String slug;
    private String name;
    private String description;
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
""",
    "dto/DeliveryCheckRequest.java": """package in.gronliv.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
public class DeliveryCheckRequest {
    @NotBlank
    @Pattern(regexp="\\\\d{6}", message="Pincode must be 6 digits")
    private String pincode;

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
}
""",
    "dto/DeliveryCheckResponse.java": """package in.gronliv.dto;
public class DeliveryCheckResponse {
    private boolean available;
    private String zoneName;
    private Long deliveryFee;
    private int estimatedMinutes;
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public String getZoneName() { return zoneName; }
    public void setZoneName(String zoneName) { this.zoneName = zoneName; }
    public Long getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Long deliveryFee) { this.deliveryFee = deliveryFee; }
    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
}
""",
    "dto/CreateOrderRequest.java": """package in.gronliv.dto;
import jakarta.validation.constraints.*;
import java.util.List;
public class CreateOrderRequest {
    @NotBlank
    private String customerName;
    @NotBlank
    private String customerPhone;
    @Email
    private String customerEmail;
    @NotBlank
    private String deliveryAddress;
    @NotBlank
    @Pattern(regexp="\\\\d{6}")
    private String pincode;
    private String notes;
    
    @NotEmpty
    private List<OrderItemRequest> items;

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public static class OrderItemRequest {
        @NotNull
        private Long productId;
        @Min(1)
        private int quantity;
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
}
""",
    "dto/OrderResponse.java": """package in.gronliv.dto;
public class OrderResponse {
    private String orderNumber;
    private String status;
    private Long subtotal;
    private Long deliveryFee;
    private Long total;

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getSubtotal() { return subtotal; }
    public void setSubtotal(Long subtotal) { this.subtotal = subtotal; }
    public Long getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Long deliveryFee) { this.deliveryFee = deliveryFee; }
    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }
}
""",
    "dto/ContactRequest.java": """package in.gronliv.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Size(max=2000)
    private String message;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
""",
    "dto/ApiError.java": """package in.gronliv.dto;
import java.time.LocalDateTime;

public class ApiError {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    private String path;

    public ApiError(int status, String message, String path) {
        this.status = status;
        this.message = message;
        this.path = path;
        this.timestamp = LocalDateTime.now();
    }

    public int getStatus() { return status; }
    public String getMessage() { return message; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public String getPath() { return path; }
}
""",

    # ---------------- REPOSITORIES ----------------
    "repository/ProductRepository.java": """package in.gronliv.repository;
import in.gronliv.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategorySlugAndAvailableTrue(String categorySlug, Pageable pageable);
    Page<Product> findByAvailableTrue(Pageable pageable);
    List<Product> findByFeaturedTrueAndAvailableTrueOrderBySortOrderAsc();
    Optional<Product> findBySlugAndAvailableTrue(String slug);
}
""",
    "repository/CategoryRepository.java": """package in.gronliv.repository;
import in.gronliv.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CategoryRepository extends JpaRepository<ProductCategory, Long> {
    List<ProductCategory> findByActiveTrueOrderBySortOrderAsc();
}
""",
    "repository/DeliveryZoneRepository.java": """package in.gronliv.repository;
import in.gronliv.domain.DeliveryZone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface DeliveryZoneRepository extends JpaRepository<DeliveryZone, Long> {
    List<DeliveryZone> findByActiveTrue();
}
""",
    "repository/PincodeRepository.java": """package in.gronliv.repository;
import in.gronliv.domain.Pincode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface PincodeRepository extends JpaRepository<Pincode, Long> {
    Optional<Pincode> findByCodeAndActiveTrue(String code);
}
""",
    "repository/OrderRepository.java": """package in.gronliv.repository;
import in.gronliv.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
}
""",
    "repository/ContactSubmissionRepository.java": """package in.gronliv.repository;
import in.gronliv.domain.ContactSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ContactSubmissionRepository extends JpaRepository<ContactSubmission, Long> {}
""",
    "repository/AdminUserRepository.java": """package in.gronliv.repository;
import in.gronliv.domain.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    Optional<AdminUser> findByEmailAndActiveTrue(String email);
}
""",

    # ---------------- EXCEPTIONS ----------------
    "exception/ResourceNotFoundException.java": """package in.gronliv.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
""",
    "exception/RateLimitException.java": """package in.gronliv.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
public class RateLimitException extends RuntimeException {
    public RateLimitException(String message) {
        super(message);
    }
}
""",
    "exception/GlobalExceptionHandler.java": """package in.gronliv.exception;

import in.gronliv.dto.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiError(HttpStatus.NOT_FOUND.value(), ex.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<ApiError> handleRateLimit(RateLimitException ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body(new ApiError(HttpStatus.TOO_MANY_REQUESTS.value(), ex.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiError(HttpStatus.BAD_REQUEST.value(), "Validation failed", request.getRequestURI()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneral(Exception ex, HttpServletRequest request) {
        log.error("Internal Error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An internal error occurred", request.getRequestURI()));
    }
}
""",

    # ---------------- SERVICES ----------------
    "service/ProductService.java": """package in.gronliv.service;

import in.gronliv.domain.Product;
import in.gronliv.dto.ProductDTO;
import in.gronliv.dto.ProductListDTO;
import in.gronliv.exception.ResourceNotFoundException;
import in.gronliv.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductListDTO getProducts(String category, int page, int size) {
        Page<Product> productPage;
        if (category != null && !category.isEmpty()) {
            productPage = productRepository.findByCategorySlugAndAvailableTrue(category, PageRequest.of(page, size));
        } else {
            productPage = productRepository.findByAvailableTrue(PageRequest.of(page, size));
        }

        ProductListDTO dto = new ProductListDTO();
        dto.setProducts(productPage.getContent().stream().map(this::mapToDTO).collect(Collectors.toList()));
        dto.setCurrentPage(productPage.getNumber());
        dto.setTotalPages(productPage.getTotalPages());
        dto.setTotalElements(productPage.getTotalElements());
        return dto;
    }

    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueAndAvailableTrueOrderBySortOrderAsc()
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ProductDTO getProduct(String slug) {
        return productRepository.findBySlugAndAvailableTrue(slug)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private ProductDTO mapToDTO(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setSlug(p.getSlug());
        dto.setName(p.getName());
        dto.setShortDescription(p.getShortDescription());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setImageUrl(p.getImageUrl());
        dto.setCategoryName(p.getCategory() != null ? p.getCategory().getName() : null);
        dto.setTags(p.getTags());
        dto.setAvailable(p.isAvailable());
        return dto;
    }
}
""",
    "service/CategoryService.java": """package in.gronliv.service;

import in.gronliv.dto.CategoryDTO;
import in.gronliv.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findByActiveTrueOrderBySortOrderAsc().stream().map(c -> {
            CategoryDTO dto = new CategoryDTO();
            dto.setSlug(c.getSlug());
            dto.setName(c.getName());
            dto.setDescription(c.getDescription());
            return dto;
        }).collect(Collectors.toList());
    }
}
""",
    "service/DeliveryService.java": """package in.gronliv.service;

import in.gronliv.domain.Pincode;
import in.gronliv.dto.DeliveryCheckResponse;
import in.gronliv.repository.PincodeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeliveryService {
    private final PincodeRepository pincodeRepository;

    public DeliveryService(PincodeRepository pincodeRepository) {
        this.pincodeRepository = pincodeRepository;
    }

    public DeliveryCheckResponse checkDelivery(String pincode) {
        Optional<Pincode> p = pincodeRepository.findByCodeAndActiveTrue(pincode);
        DeliveryCheckResponse res = new DeliveryCheckResponse();
        if (p.isPresent() && p.get().getZone().isActive()) {
            res.setAvailable(true);
            res.setZoneName(p.get().getZone().getName());
            res.setDeliveryFee(p.get().getZone().getDeliveryFee());
            res.setEstimatedMinutes(p.get().getZone().getEstimatedMinutes());
        } else {
            res.setAvailable(false);
        }
        return res;
    }
}
""",
    "service/OrderService.java": """package in.gronliv.service;

import in.gronliv.domain.*;
import in.gronliv.dto.CreateOrderRequest;
import in.gronliv.dto.OrderResponse;
import in.gronliv.exception.ResourceNotFoundException;
import in.gronliv.repository.OrderRepository;
import in.gronliv.repository.PincodeRepository;
import in.gronliv.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final PincodeRepository pincodeRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, PincodeRepository pincodeRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.pincodeRepository = pincodeRepository;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest req, String clientIp) {
        Pincode pin = pincodeRepository.findByCodeAndActiveTrue(req.getPincode())
                .orElseThrow(() -> new IllegalArgumentException("Delivery not available to this pincode"));

        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setCustomerName(req.getCustomerName());
        order.setCustomerEmail(req.getCustomerEmail());
        order.setCustomerPhone(req.getCustomerPhone());
        order.setDeliveryAddress(req.getDeliveryAddress());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setNotes(req.getNotes());
        
        long subtotal = 0;
        for (CreateOrderRequest.OrderItemRequest itemReq : req.getItems()) {
            Product p = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(p);
            item.setQuantity(itemReq.getQuantity());
            item.setUnitPrice(p.getPrice());
            item.setTotalPrice(p.getPrice() * itemReq.getQuantity());
            order.getItems().add(item);
            subtotal += item.getTotalPrice();
        }
        
        order.setSubtotal(subtotal);
        order.setDeliveryFee(pin.getZone().getDeliveryFee());
        order.setDiscount(0L);
        order.setTotal(subtotal + order.getDeliveryFee());
        
        orderRepository.save(order);
        
        OrderResponse res = new OrderResponse();
        res.setOrderNumber(order.getOrderNumber());
        res.setStatus(order.getStatus().name());
        res.setSubtotal(order.getSubtotal());
        res.setDeliveryFee(order.getDeliveryFee());
        res.setTotal(order.getTotal());
        return res;
    }
    
    public OrderResponse getOrderStatus(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        OrderResponse res = new OrderResponse();
        res.setOrderNumber(order.getOrderNumber());
        res.setStatus(order.getStatus().name());
        res.setSubtotal(order.getSubtotal());
        res.setDeliveryFee(order.getDeliveryFee());
        res.setTotal(order.getTotal());
        return res;
    }
}
""",
    "service/ContactService.java": """package in.gronliv.service;

import in.gronliv.domain.ContactSubmission;
import in.gronliv.dto.ContactRequest;
import in.gronliv.repository.ContactSubmissionRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ContactSubmissionRepository repo;

    public ContactService(ContactSubmissionRepository repo) {
        this.repo = repo;
    }

    public void submitContact(ContactRequest req, String ip) {
        ContactSubmission sub = new ContactSubmission();
        sub.setName(req.getName());
        sub.setEmail(req.getEmail());
        sub.setMessage(req.getMessage());
        sub.setIpAddress(ip);
        repo.save(sub);
    }
}
""",

    # ---------------- CONTROLLERS ----------------
    "controller/ProductController.java": """package in.gronliv.controller;

import in.gronliv.dto.ProductDTO;
import in.gronliv.dto.ProductListDTO;
import in.gronliv.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) { this.productService = productService; }
    
    @GetMapping
    public ProductListDTO getProducts(@RequestParam(required=false) String category,
                                      @RequestParam(defaultValue="0") int page,
                                      @RequestParam(defaultValue="10") int size) {
        return productService.getProducts(category, page, size);
    }
    
    @GetMapping("/featured")
    public List<ProductDTO> getFeatured() {
        return productService.getFeaturedProducts();
    }
    
    @GetMapping("/{slug}")
    public ProductDTO getProduct(@PathVariable String slug) {
        return productService.getProduct(slug);
    }
}
""",
    "controller/CategoryController.java": """package in.gronliv.controller;

import in.gronliv.dto.CategoryDTO;
import in.gronliv.service.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) { this.categoryService = categoryService; }
    
    @GetMapping
    public List<CategoryDTO> getCategories() {
        return categoryService.getAllCategories();
    }
}
""",
    "controller/DeliveryController.java": """package in.gronliv.controller;

import in.gronliv.dto.DeliveryCheckResponse;
import in.gronliv.service.DeliveryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {
    private final DeliveryService deliveryService;
    public DeliveryController(DeliveryService deliveryService) { this.deliveryService = deliveryService; }
    
    @GetMapping("/check")
    public DeliveryCheckResponse checkDelivery(@RequestParam String pincode) {
        return deliveryService.checkDelivery(pincode);
    }
}
""",
    "controller/OrderController.java": """package in.gronliv.controller;

import in.gronliv.dto.CreateOrderRequest;
import in.gronliv.dto.OrderResponse;
import in.gronliv.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) { this.orderService = orderService; }
    
    @PostMapping
    public OrderResponse createOrder(@Valid @RequestBody CreateOrderRequest req, HttpServletRequest request) {
        return orderService.createOrder(req, request.getRemoteAddr());
    }
    
    @GetMapping("/{orderId}")
    public OrderResponse getOrder(@PathVariable String orderId) {
        return orderService.getOrderStatus(orderId);
    }
}
""",
    "controller/ContactController.java": """package in.gronliv.controller;

import in.gronliv.dto.ContactRequest;
import in.gronliv.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService contactService;
    public ContactController(ContactService contactService) { this.contactService = contactService; }
    
    @PostMapping
    public void submitContact(@Valid @RequestBody ContactRequest req, HttpServletRequest request) {
        contactService.submitContact(req, request.getRemoteAddr());
    }
}
""",
    "controller/HealthController.java": """package in.gronliv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class HealthController {
    @GetMapping("/api/health")
    public Map<String, Object> health() {
        return Map.of("status", "ok", "timestamp", LocalDateTime.now());
    }
}
""",

    # ---------------- CONFIG & SECURITY ----------------
    "config/SecurityConfig.java": """package in.gronliv.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/products/**", "/api/categories", "/api/delivery/**", "/api/health", "/api/contact", "/api/orders/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
""",
    "config/CorsConfig.java": """package in.gronliv.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Value("${gronliv.cors.allowed-origins:*}")
    private String[] allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
""",
    "config/RateLimitConfig.java": """package in.gronliv.config;

import org.springframework.context.annotation.Configuration;
@Configuration
public class RateLimitConfig {
    // Basic rate limit config hook
}
""",
    "config/AppProperties.java": """package in.gronliv.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "gronliv")
public class AppProperties {
    private String jwtSecret;
    public String getJwtSecret() { return jwtSecret; }
    public void setJwtSecret(String jwtSecret) { this.jwtSecret = jwtSecret; }
}
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content)

print("Created all Java source files successfully.")
