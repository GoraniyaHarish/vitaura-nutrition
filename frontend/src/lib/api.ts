// ============================================================
// GronLiv — API Client
// All API calls go through this client.
// Backend URL comes from environment variable.
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const error = await response.json();
      message = error.message || message;
    } catch {
      // Response body wasn't JSON
    }
    throw new ApiError(message, response.status);
  }

  // Handle empty responses (e.g. 204 No Content)
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return undefined as T;
  }

  return response.json();
}

// ============================================================
// PRODUCT APIs
// ============================================================

export interface Product {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number; // in paise (1 INR = 100 paise) — never use float for money
  imageUrl: string;
  category: ProductCategory;
  tags: string[];
  ingredients: Ingredient[];
  nutritionInfo: NutritionInfo;
  available: boolean;
  featured: boolean;
}

export interface ProductCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
}

export interface Ingredient {
  id: number;
  name: string;
  imageUrl?: string;
}

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getProducts(params?: {
  category?: string;
  page?: number;
  size?: number;
}): Promise<ProductListResponse> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.size !== undefined) query.set("size", String(params.size));

  return request<ProductListResponse>(`/api/products?${query}`);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return request<Product[]>("/api/products/featured");
}

export async function getProduct(slug: string): Promise<Product> {
  return request<Product>(`/api/products/${slug}`);
}

export async function getCategories(): Promise<ProductCategory[]> {
  return request<ProductCategory[]>("/api/categories");
}

// ============================================================
// DELIVERY APIs
// ============================================================

export interface DeliveryCheckResponse {
  pincode?: string;
  eligible?: boolean;
  available?: boolean;
  zone?: string;
  zoneName?: string;
  estimatedMinutes?: number;
  deliveryFee?: number; // in paise
  message?: string;
}

export async function checkDelivery(
  pincode: string
): Promise<DeliveryCheckResponse> {
  if (!/^\d{6}$/.test(pincode)) {
    throw new ApiError("Invalid pincode format", 400);
  }
  return request<DeliveryCheckResponse>(
    `/api/delivery/check?pincode=${encodeURIComponent(pincode)}`
  );
}

// ============================================================
// ORDER APIs
// ============================================================

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  pincode: string;
  paymentMethod?: "COD" | "RAZORPAY" | "PHONEPE" | "DEMO";
  notes?: string;
}

export interface OrderResponse {
  orderId: string;
  orderNumber?: string;
  status: string;
  subtotal?: number;
  deliveryFee: number;
  total: number; // in paise — calculated server-side
  paymentStatus?: string;
  paymentMethod?: string;
  isDemo?: boolean;
  paymentMessage?: string;
  paymentDetails?: {
    provider: string;
    orderId?: string;
    key?: string;
    amount?: number;
  };
}

export async function createOrder(
  order: CreateOrderRequest
): Promise<OrderResponse> {
  return request<OrderResponse>("/api/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

export async function getOrderStatus(orderId: string): Promise<OrderResponse> {
  return request<OrderResponse>(`/api/orders/${encodeURIComponent(orderId)}`);
}

// ============================================================
// CONTACT API
// ============================================================

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export async function submitContact(data: ContactRequest): Promise<void> {
  return request<void>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
