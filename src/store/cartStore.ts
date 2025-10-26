import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  size?: string
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (productId: string, size?: string) => void
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void
  clearCart: () => void
  total: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(
          (i) => i.name === item.name && i.size === item.size
        )

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          const newItem: CartItem = {
            ...item,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          }
          set({
            items: [...items, newItem],
          })
        }
      },

      removeItem: (productId, size) => {
        set({ 
          items: get().items.filter((item) => 
            !(item.name === productId || item.id === productId) || 
            (size && item.size !== size)
          ) 
        })
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }
        set({
          items: get().items.map((item) =>
            (item.id === productId || item.name === productId) && 
            (!size || item.size === size)
              ? { ...item, quantity }
              : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      total: () => {
        const items = get().items
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'lunox-cart-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
    }
  )
)
