export interface Product {
  id: number
  name: string
  price: number
  description?: string
  image: string
  images?: string[]
  slug: string
  category?: string
  sizes?: string[]
  inStock?: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  size?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
}

export interface Address {
  id?: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  isDefault?: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  createdAt: string
}
