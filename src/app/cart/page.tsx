'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { HiTrash, HiX } from 'react-icons/hi'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [hasGiftCard, setHasGiftCard] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = () => {
    router.back()
  }

  if (!mounted) {
    return null
  }

  // Calculate total from items
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-40"
        onClick={handleClose}
      />

      {/* Cart Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Your Cart</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-6">Your cart is empty</p>
              <button
                onClick={handleClose}
                className="px-6 py-2 border border-black text-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-24 flex-shrink-0 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-2">
                          <h3 className="text-xs font-semibold uppercase tracking-wide mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            RS. {item.price.toLocaleString()}
                          </p>
                          {item.selectedSize && (
                            <p className="text-xs text-gray-600 mt-1">
                              SIZE: {item.selectedSize}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <HiTrash className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 w-32 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors text-sm"
                        >
                          −
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center text-sm border-l border-r border-gray-300 py-1 focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-6 space-y-4">
              {/* Estimated Total */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Estimated Total
                </span>
                <span className="text-base font-semibold">
                  RS. {total.toLocaleString()}
                </span>
              </div>

              {/* Tax Info */}
              <p className="text-xs text-gray-600 leading-relaxed">
                TAX INCLUDED. SHIPPING AND DISCOUNTS CALCULATED AT CHECKOUT.
              </p>

              {/* Gift Card Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="giftCard"
                  checked={hasGiftCard}
                  onChange={(e) => setHasGiftCard(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded"
                />
                <label htmlFor="giftCard" className="text-xs font-normal uppercase tracking-wide cursor-pointer">
                  HAVE A GIFT CARD?
                </label>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
