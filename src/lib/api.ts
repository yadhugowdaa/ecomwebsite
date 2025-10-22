import axios, { AxiosInstance, AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
const CATALOG_API_URL = process.env.NEXT_PUBLIC_CATALOG_API_URL || 'http://localhost:4001'
const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:4002'

// Create axios instances for each service
export const userApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const catalogApi: AxiosInstance = axios.create({
  baseURL: CATALOG_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const orderApi: AxiosInstance = axios.create({
  baseURL: ORDER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
const addAuthToken = (config: any) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

userApi.interceptors.request.use(addAuthToken)
orderApi.interceptors.request.use(addAuthToken)

// Handle response errors
const handleError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
}

userApi.interceptors.response.use((response) => response, handleError)
catalogApi.interceptors.response.use((response) => response, handleError)
orderApi.interceptors.response.use((response) => response, handleError)

// API helper functions
export const api = {
  // Auth
  register: (data: any) => userApi.post('/api/auth/register', data),
  login: (data: any) => userApi.post('/api/auth/login', data),
  logout: () => userApi.post('/api/auth/logout'),

  // User
  getProfile: () => userApi.get('/api/users/profile'),
  updateProfile: (data: any) => userApi.put('/api/users/profile', data),
  changePassword: (data: any) => userApi.put('/api/users/change-password', data),

  // Addresses
  getAddresses: () => userApi.get('/api/addresses'),
  createAddress: (data: any) => userApi.post('/api/addresses', data),
  updateAddress: (id: string, data: any) => userApi.put(`/api/addresses/${id}`, data),
  deleteAddress: (id: string) => userApi.delete(`/api/addresses/${id}`),
  setDefaultAddress: (id: string) => userApi.put(`/api/addresses/${id}/default`),

  // Products
  getProducts: (params?: any) => catalogApi.get('/api/products', { params }),
  searchProducts: (query: string) => catalogApi.get(`/api/products/search?q=${query}`),
  getFeaturedProducts: () => catalogApi.get('/api/products/featured'),
  getBestsellers: () => catalogApi.get('/api/products/bestsellers'),
  getNewArrivals: () => catalogApi.get('/api/products/new-arrivals'),
  getProductBySlug: (slug: string) => catalogApi.get(`/api/products/${slug}`),

  // Categories
  getCategories: () => catalogApi.get('/api/categories'),
  getFeaturedCategories: () => catalogApi.get('/api/categories/featured'),
  getCategoryBySlug: (slug: string) => catalogApi.get(`/api/categories/${slug}`),

  // Reviews
  getProductReviews: (productId: string, params?: any) =>
    catalogApi.get(`/api/reviews/product/${productId}`, { params }),
  createReview: (data: any) => catalogApi.post('/api/reviews', data),

  // Orders
  createOrder: (data: any) => orderApi.post('/api/orders', data),
  getUserOrders: (userId: string, params?: any) =>
    orderApi.get(`/api/orders/user/${userId}`, { params }),
  getOrderByNumber: (orderNumber: string) => orderApi.get(`/api/orders/${orderNumber}`),

  // Payments
  initiatePayment: (data: any) => orderApi.post('/api/payments/initiate', data),
  verifyPayment: (data: any) => orderApi.post('/api/payments/verify', data),
}

export default api


