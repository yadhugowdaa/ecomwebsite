'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'react-toastify'
import { HiMinus, HiPlus, HiHeart, HiShare } from 'react-icons/hi2'

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()

  const product = {
    id: 1,
    name: slug.toUpperCase().replace(/-/g, ' '),
    price: 1699,
    description: 'Lunox ' + slug.replace(/-/g, ' ') + '. The design with minimal branding. It is 100% jersey cotton, 240 gsm and screen printed. The fit is a Lunox signature oversized fit.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      '100% Premium Cotton',
      '240 GSM Fabric',
      'Screen Printed',
      'Oversized Fit',
      'Unisex',
    ]
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }

    addItem({
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      size: selectedSize,
    })

    toast.success('Added to cart!')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/collections/all-products" className="text-gray-500 hover:text-gray-700">
            Products
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  In Stock
                </span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-semibold text-gray-900">
                  Select Size
                </label>
                <Link href="/pages/size-chart" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-900 transition-colors"
                >
                  <HiMinus className="w-5 h-5" />
                </button>
                <span className="text-xl font-semibold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-900 transition-colors"
                >
                  <HiPlus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
                <HiHeart className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors">
                <HiShare className="w-6 h-6" />
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Product Details</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-gray-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders above ₹2,999</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-gray-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-600">7 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
