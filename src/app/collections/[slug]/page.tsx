import { notFound } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'
import CollectionFilters from '@/components/collections/CollectionFilters'
import { Product } from '@/types'

interface CollectionPageProps {
  params: {
    slug: string
  }
  searchParams: {
    sort?: string
    minPrice?: string
    maxPrice?: string
    size?: string
    color?: string
  }
}

// This would be fetched from the API
const collections = [
  't-shirts',
  'hoodies',
  'shirts',
  'joggers',
  'shorts',
  'accessories',
  'new-in',
  'bestsellers',
  'all',
]

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { slug } = params

  if (!collections.includes(slug)) {
    notFound()
  }

  // TODO: Fetch products from API based on collection slug and filters
  const mockProducts: Product[] = []

  const collectionNames: Record<string, string> = {
    't-shirts': 'T-Shirts',
    'hoodies': 'Hoodies & Sweatshirts',
    'shirts': 'Shirts',
    'joggers': 'Joggers & Pants',
    'shorts': 'Shorts',
    'accessories': 'Accessories',
    'new-in': 'New Arrivals',
    'bestsellers': 'Best Sellers',
    'all': 'All Products',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{collectionNames[slug]}</h1>
        <p className="text-gray-600">
          {mockProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <CollectionFilters />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {mockProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No products found in this collection yet.
              </p>
              <p className="text-gray-400 mt-2">Check back soon for new arrivals!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return collections.map((slug) => ({
    slug,
  }))
}


