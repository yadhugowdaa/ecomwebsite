'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from 'react-icons/hi2'
import { productApi } from '@/lib/productApi'

interface Product {
  _id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: string
}

export default function CollectionPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let response
        
        // Map collection slugs to category names
        const categoryMap: Record<string, string> = {
          't-shirts': 'T-Shirts',
          'hoodies': 'Hoodies',
          'shirts': 'Shirts',
          'jackets': 'Jackets',
          'joggers': 'Joggers',
          'cargos': 'Cargos',
          'jeans': 'Jeans',
          'shorts': 'Shorts',
          'accessories': 'Accessories',
        }
        
        if (slug === 'all-products' || slug === 'all') {
          response = await productApi.getAll()
        } else if (categoryMap[slug]) {
          response = await productApi.getByCategory(categoryMap[slug])
        } else {
          // Try the slug as-is
          response = await productApi.getByCategory(slug)
        }
        
        if (response.success) {
          setProducts(response.data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [slug])

  // Sort products
  useEffect(() => {
    if (products.length > 0) {
      const sorted = [...products].sort((a, b) => {
        switch (sortBy) {
          case 'price-low-high':
            return a.price - b.price
          case 'price-high-low':
            return b.price - a.price
          case 'newest':
            return 0 // Already sorted by newest from API
          default:
            return 0
        }
      })
      if (JSON.stringify(sorted) !== JSON.stringify(products)) {
        setProducts(sorted)
      }
    }
  }, [sortBy])

  // Filter by search query
  const filteredProducts = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products

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
    <div className="min-h-screen bg-white">
      {/* Collection Header and Filters Combined */}
      <div className="bg-white py-4 border-b border-gray-300">
        <div className="max-w-[1600px] mx-auto px-6">
          <h1 className="text-sm font-bold uppercase tracking-wide mb-4">
            {collectionTitle}
          </h1>
          
          {/* Filters Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider">FILTER:</span>
              <select className="text-[10px] uppercase tracking-wider border border-gray-300 px-3 py-1 bg-white focus:outline-none focus:border-gray-900">
                <option>SIZE</option>
              </select>
              <select className="text-[10px] uppercase tracking-wider border border-gray-300 px-3 py-1 bg-white focus:outline-none focus:border-gray-900">
                <option>AVAILABILITY</option>
              </select>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[10px] uppercase tracking-wider border border-gray-300 px-3 py-1 bg-white focus:outline-none focus:border-gray-900"
              >
                <option value="featured">FEATURED</option>
                <option value="price-low-high">PRICE: LOW TO HIGH</option>
                <option value="price-high-low">PRICE: HIGH TO LOW</option>
                <option value="newest">NEWEST</option>
              </select>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                {filteredProducts.length} PRODUCTS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid - NO GAPS between images */}
      <div className="max-w-[1600px] mx-auto px-0 py-0">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-300"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group relative bg-white border-r border-b border-gray-200"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-white">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wide mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] font-normal">
                    RS. {product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              {searchQuery ? `No products found for "${searchQuery}"` : 'No products available in this collection.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
