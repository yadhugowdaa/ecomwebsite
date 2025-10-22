'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from 'react-icons/hi2'

const products = [
  {
    id: 1,
    name: 'WHITE COMMITMENT T-SHIRT',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    slug: 'white-commitment-t-shirt'
  },
  {
    id: 2,
    name: 'BLACK BASIC T-SHIRT',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    slug: 'black-basic-t-shirt'
  },
  {
    id: 3,
    name: 'GREY ESSENTIAL TEE',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
    slug: 'grey-essential-tee'
  },
  {
    id: 4,
    name: 'NAVY BLUE CLASSIC',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    slug: 'navy-blue-classic'
  },
  {
    id: 5,
    name: 'RED PREMIUM TEE',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    slug: 'red-premium-tee'
  },
  {
    id: 6,
    name: 'GREEN CLASSIC SHIRT',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    slug: 'green-classic-shirt'
  },
  {
    id: 7,
    name: 'BLUE CASUAL TEE',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800',
    slug: 'blue-casual-tee'
  },
  {
    id: 8,
    name: 'YELLOW SUMMER SHIRT',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1598032895397-b9073d345d8b?w=800',
    slug: 'yellow-summer-shirt'
  },
]

export default function CollectionPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const collectionTitles: Record<string, string> = {
    'all-products': 'ALL PRODUCTS',
    'new-in': 'NEW IN',
    'bestsellers': 'BESTSELLERS',
    'oversized-t-shirts': 'OVERSIZED T-SHIRTS',
    't-shirts': 'T-SHIRTS',
    'hoodies': 'HOODIES',
    'shirts': 'SHIRTS',
  }

  const collectionTitle = collectionTitles[slug] || slug.toUpperCase().replace(/-/g, ' ')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{collectionTitle}</span>
          </nav>
        </div>
      </div>

      {/* Collection Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {collectionTitle}
          </h1>
          
          {slug === 'oversized-t-shirts' && (
            <p className="text-gray-600 max-w-3xl text-lg">
              Shop oversized T-shirts for men online! Stylish and comfortable baggy T-shirts perfect for a relaxed, trendy look every day. Premium Oversized Unisex T-shirts.
            </p>
          )}
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-700 font-medium">
                {products.length} Products
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
              >
                <HiAdjustmentsHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:flex-none">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
}
