import Link from 'next/link'

interface Product {
  _id?: string
  id?: number
  name: string
  price: number
  image?: string
  images?: string[]
  slug: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
  
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Product Image */}
        <div className="aspect-square relative bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  )
}
