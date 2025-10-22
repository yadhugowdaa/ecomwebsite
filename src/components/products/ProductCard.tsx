import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  image: string
  slug: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="aspect-square relative bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-semibold text-gray-900">
            ₹{product.price}
          </p>
        </div>
      </div>
    </Link>
  )
}
