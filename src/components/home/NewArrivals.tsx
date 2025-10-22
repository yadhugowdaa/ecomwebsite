'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/types'

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch from API
    // Mock data for now
    const mockProducts: Product[] = [
      {
        _id: '1',
        name: 'Black Oversized T-Shirt',
        slug: 'black-oversized-tshirt',
        description: 'Premium cotton oversized tee',
        price: 1299,
        compareAtPrice: 1999,
        images: ['/images/products/black-tshirt.jpg'],
        category: 't-shirts',
        tags: ['oversized', 'black', 'cotton'],
        variants: [],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black'],
        inStock: true,
        featured: true,
        bestseller: false,
        newArrival: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // Add more mock products...
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
          <Link
            href="/collections/new-in"
            className="text-sm font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals


