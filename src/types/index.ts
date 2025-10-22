// Product Types
export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  subcategory?: string
  tags: string[]
  variants: ProductVariant[]
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  bestseller: boolean
  newArrival: boolean
  gsm?: number
  fabric?: string
  care?: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  size: string
  color: string
  sku: string
  stock: number
  price?: number
}

// Collection Types
export interface Collection {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  featured: boolean
}

// Review Types
export interface Review {
  _id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  verified: boolean
  createdAt: string
}

// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  createdAt: string
}

export interface Address {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
}

// Order Types
export interface Order {
  id: string
  userId: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  name: string
  slug: string
  image: string
  price: number
  quantity: number
  size: string
  color: string
  sku: string
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Filter Types
export interface ProductFilters {
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  sizes?: string[]
  colors?: string[]
  tags?: string[]
  inStock?: boolean
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'popular'
  page?: number
  limit?: number
}


