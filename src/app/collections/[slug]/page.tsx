'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/products/ProductCard'

const products = [
  {
    id: 1,
    name: 'WHITE COMMITMENT T-SHIRT',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/junb_lj_n.jpg',
    slug: 'white-commitment-t-shirt'
  },
  {
    id: 2,
    name: 'BLACK BASIC T-SHIRT',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/hbkhb_khb.jpg',
    slug: 'black-basic-t-shirt'
  },
  {
    id: 3,
    name: 'MISSING T-SHIRT',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/missing-t-shirt-101.jpg',
    slug: 'missing-t-shirt'
  },
  {
    id: 4,
    name: 'ABSTRACT ART T-SHIRT',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/BLUORNG-OVERSIZED-WHITE-T-SHIRT-ABSTRACT-ART-01.jpg',
    slug: 'abstract-art-t-shirt'
  },
  {
    id: 5,
    name: 'GREY BASIC T-SHIRT',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/hbkhb_khb.jpg',
    slug: 'grey-basic-t-shirt'
  },
  {
    id: 6,
    name: 'WHITE BASIC T-SHIRT',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/junb_lj_n.jpg',
    slug: 'white-basic-t-shirt'
  },
  {
    id: 7,
    name: 'NAVY BLUE T-SHIRT',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/junb_lj_n.jpg',
    slug: 'navy-blue-t-shirt'
  },
  {
    id: 8,
    name: 'CLASSIC WHITE TEE',
    price: 1699,
    image: '/bluorng-assets/cdn/shop/files/hbkhb_khb.jpg',
    slug: 'classic-white-tee'
  },
]

export default function CollectionPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [sortBy, setSortBy] = useState('featured')

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
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{collectionTitle}</span>
        </nav>
      </div>

      {/* Collection Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {collectionTitle}
        </h1>
        
        {slug === 'oversized-t-shirts' && (
          <p className="text-gray-600 max-w-3xl">
            Shop oversized T-shirts for men online! Stylish and comfortable baggy T-shirts perfect for a relaxed, trendy look every day. Premium Oversized Unisex T-shirts.
          </p>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <p className="text-gray-600">{products.length} products</p>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
