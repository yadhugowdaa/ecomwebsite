import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// Admin Product API (PostgreSQL)
export const productApi = {
  // Get all products (public)
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/public/products`)
    return response.data
  },

  // Get product by slug (public)
  getBySlug: async (slug: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/public/products/slug/${slug}`)
    return response.data
  },

  // Get products by category (public)
  getByCategory: async (category: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/public/products?category=${category}`)
    return response.data
  },
}

