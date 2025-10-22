'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { HiHeart, HiShoppingBag } from 'react-icons/hi'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'react-toastify'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const { addItem } = useCartStore()

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  // TODO: Fetch product from API
  const product = {
    id: '1',
    name: 'Black Oversized T-Shirt',
    slug: 'black-oversized-tshirt',
    description: 'Premium cotton oversized tee with a relaxed fit. Perfect for streetwear styling.',
    price: 1299,
    compareAtPrice: 1999,
    images: ['/images/products/black-tshirt-1.jpg', '/images/products/black-tshirt-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Gray'],
    inStock: true,
    gsm: 220,
    fabric: '100% Cotton',
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }
    if (!selectedColor) {
      toast.error('Please select a color')
      return
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.images[0],
      slug: product.slug,
    })

    toast.success('Added to cart!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-8xl">
            👕
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 rounded-lg cursor-pointer hover:border-2 hover:border-black flex items-center justify-center text-4xl"
              >
                👕
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.compareAtPrice}
                </span>
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                  {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block font-semibold">Size</label>
              <button className="text-sm text-blue-600 hover:underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border-2 rounded-md py-3 font-medium transition-all ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block font-semibold mb-3">Color: {selectedColor}</label>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border-2 rounded-md font-medium transition-all ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block font-semibold mb-3">Quantity</label>
            <div className="flex items-center border-2 border-gray-300 rounded-md w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                −
              </button>
              <span className="flex-1 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn btn-primary flex items-center justify-center gap-2"
            >
              <HiShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              className="btn btn-outline flex items-center justify-center gap-2"
              aria-label="Add to wishlist"
            >
              <HiHeart className="h-5 w-5" />
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GSM: {product.gsm}</li>
                <li>• Fabric: {product.fabric}</li>
                <li>• Fit: Oversized</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Care Instructions</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.care.map((instruction, index) => (
                  <li key={index}>• {instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


