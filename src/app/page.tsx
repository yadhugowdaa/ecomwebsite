'use client'

import Hero from '@/components/home/Hero'
import ProductCard from '@/components/products/ProductCard'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi2'

const featuredProducts = [
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
]

const collections = [
  {
    name: 'T-Shirts',
    slug: 't-shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    count: 50
  },
  {
    name: 'Hoodies',
    slug: 'hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
    count: 30
  },
  {
    name: 'Oversized',
    slug: 'oversized-t-shirts',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600',
    count: 40
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured Collections */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-white/80 mb-4">{collection.count}+ Products</p>
                  <span className="inline-flex items-center text-white font-semibold group-hover:gap-2 transition-all">
                    Shop Now <HiArrowRight className="ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                New Arrivals
              </h2>
              <p className="text-gray-600 text-lg">
                Fresh drops, hot styles
              </p>
            </div>
            <Link
              href="/collections/new-in"
              className="hidden md:flex items-center text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              View All <HiArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Link
            href="/collections/new-in"
            className="md:hidden flex items-center justify-center mt-8 text-lg font-semibold text-gray-900"
          >
            View All <HiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-6">
            Join the Lunox Family
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12">
            Get exclusive access to new drops, special offers, and style inspiration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders above ₹2,999</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">100% authentic products</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">7 days return policy</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
