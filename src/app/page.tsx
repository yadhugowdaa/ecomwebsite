'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { catalogApi } from '@/lib/api'

interface Product {
  _id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [moreProducts, setMoreProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await catalogApi.get('/api/products')
        if (response.data.success) {
          const allProducts = response.data.data
          setProducts(allProducts.slice(0, 4))
          setMoreProducts(allProducts.slice(4, 8))
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
        setMoreProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
  return (
    <div className="relative">
      {/* Hero Section - FIXED */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.shopify.com/videos/c/o/v/bf861138015a4c0caf95384ac27b20d7.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href="/collections/all-products"
            className="px-8 py-3 border border-white text-white text-sm font-normal uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            SHOP ALL
          </Link>
        </div>
      </div>

      {/* Scrollable Content - starts after hero height */}
      <div className="relative z-10 bg-[#fafafa]" style={{ marginTop: '100vh' }}>
        {/* Latest Drop Section */}
        <section className="py-6 bg-[#fafafa]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-wider">
              Latest Drop
            </h2>
            <Link 
              href="/collections/new-in"
              className="text-[10px] font-semibold uppercase tracking-wider hover:underline"
            >
              Discover More
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="group relative border-r border-b border-gray-200 last:border-r-0"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-white">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wide mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-normal">
                      RS. {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        </section>

        {/* Discover More Button */}
        <section className="py-8 bg-[#fafafa]">
          <div className="text-center">
            <Link 
              href="/collections/all-products"
              className="inline-block px-8 py-2 border border-black text-black text-[10px] font-normal uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
            >
              Discover More
            </Link>
          </div>
        </section>

        {/* Lifestyle Image Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=1200&fit=crop')" }}></div>
        </section>

        {/* More From Lunox Section */}
        <section className="py-6 bg-[#fafafa]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-wider">
              More From Lunox
            </h2>
            <Link 
              href="/collections/bestsellers"
              className="text-[10px] font-semibold uppercase tracking-wider hover:underline"
            >
              Discover More
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : moreProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {moreProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="group relative border-r border-b border-gray-200 last:border-r-0"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-white">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wide mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-normal">
                      RS. {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
          </div>
        </section>

        {/* Discover More Button */}
        <section className="py-8 bg-[#fafafa]">
          <div className="text-center">
            <Link 
              href="/collections/all-products"
              className="inline-block px-8 py-2 border border-black text-black text-[10px] font-normal uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
            >
              Discover More
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
