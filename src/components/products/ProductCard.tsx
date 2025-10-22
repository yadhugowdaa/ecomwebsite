import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { HiHeart } from 'react-icons/hi'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="card">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100">
          {/* Placeholder for product image */}
          <div className="w-full h-full flex items-center justify-center text-6xl">
            👕
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.newArrival && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Add to wishlist
            }}
            aria-label="Add to wishlist"
          >
            <HiHeart className="h-5 w-5" />
          </button>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-white text-black px-4 py-2 rounded-md font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">₹{product.price}</span>
            {product.compareAtPrice && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.compareAtPrice}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="flex gap-1 mt-2">
              {product.colors.slice(0, 5).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard


