'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { productApi } from '@/lib/productApi'
import { useCartStore } from '@/store/cartStore'

interface Product {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  sizes: string[]
  inStock: boolean
  gsm?: number
  fabric?: string
  care?: string[]
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [hasGiftCard, setHasGiftCard] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getBySlug(params.slug as string)
        if (response.success) {
          setProduct(response.data)
          
          // Fetch related products
          if (response.data.category) {
            const relatedResponse = await productApi.getByCategory(response.data.category)
            if (relatedResponse.success) {
              setRelatedProducts(relatedResponse.data.filter((p: Product) => p._id !== response.data._id).slice(0, 4))
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchProduct()
    }
  }, [params.slug])

  const handleAddToCart = () => {
    if (!product) return
    
    addItem({
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      image: product.images[0]
    })
    
    router.push('/cart')
  }

  const handleBuyNow = () => {
    if (!product) return
    
    addItem({
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      image: product.images[0]
    })
    
    router.push('/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm uppercase tracking-wide">Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Product Section */}
      <div className="grid grid-cols-12 gap-0">
        {/* Left Sidebar - Product Info at BOTTOM */}
        <div className="col-span-3 bg-white px-8 py-10 sticky top-[88px] h-screen overflow-y-auto flex flex-col justify-end">
          <div className="space-y-5">
            {/* Breadcrumb */}
            <nav>
              <ul className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-600">
                <li><Link href="/" className="hover:text-black transition-colors">HOME</Link></li>
                <li>›</li>
                <li><Link href="/collections/all" className="hover:text-black transition-colors">ALL PRODUCTS</Link></li>
                <li>›</li>
                <li className="text-black font-semibold">{product.name.toUpperCase()}</li>
              </ul>
            </nav>

            {/* Product Title & Price */}
            <div>
              <h1 className="text-base font-bold uppercase tracking-wide mb-2">
                {product.name}
              </h1>
              <p className="text-sm font-normal">
                RS. {product.price.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-3">DESCRIPTION</h2>
              <p className="text-[10px] leading-relaxed text-gray-700">
                THE {product.name.toUpperCase()} CAPTURES THE SPIRIT OF STRATEGY AND STYLE IN ONE BOLD DESIGN. CRAFTED FROM 100% PREMIUM COTTON WITH A HEAVYWEIGHT 260 GSM FABRIC, IT DELIVERS LASTING COMFORT AND STRUCTURE. THE STRIKING PUFF PRINTED CHESS T-SHIRT DESIGN ON THE FRONT SHOWCASES A MODERN TWIST ON CLASSIC GAME ELEMENTS, MAKING IT A MUST-HAVE FOR EVERY CHESS T-SHIRT ENTHUSIAST. DESIGNED WITH PRECISION AND ATTITUDE, THIS PUFF PRINTED CHECKMATE T-SHIRT PAIRS PERFECTLY WITH JEANS OR JOGGERS FOR A SLEEK AND LAYERS EASILY UNDER SWEATSHIRTS OR JACKETS FOR A STREETWEAR-INSPIRED LOOK. TO MAINTAIN ITS DETAIL AND TEXTURE, HANDLE WITH CARE AND REVERSE WASH ONLY.
              </p>
            </div>

            {/* Details */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-3">DETAILS</h2>
              <ul className="text-[10px] space-y-1 text-gray-700">
                <li>100% COTTON</li>
                <li>WEIGHT - 260GSM</li>
                <li>PUFF PRINT</li>
                <li>REVERSE WASH ONLY</li>
              </ul>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide mb-3">SHIPPING</h2>
              <ul className="text-[10px] space-y-1 text-gray-700">
                <li>PACKED WITHIN 24 HOURS.</li>
                <li>FREE DELIVERY PAN-INDIA.</li>
                <li>DISPATCHES NEXT DAY.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Center - Product Images */}
        <div className="col-span-6 bg-white flex items-center justify-center py-8">
          <div className="space-y-4 w-full max-w-[75%]">
            {product.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Size Selector at BOTTOM */}
        <div className="col-span-3 bg-white px-8 py-10 sticky top-[88px] h-screen overflow-y-auto flex flex-col justify-end">
          <div className="space-y-5">
            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider">SIZE</h3>
                <button className="text-[9px] font-bold uppercase tracking-widest bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                  SIZE CHART
                </button>
              </div>

              {/* Size Grid - 4 columns to match BluOrng */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['XXXS', 'XXS', 'XS', 'S'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-[11px] font-medium uppercase tracking-wide border rounded transition-all ${
                      selectedSize === size
                        ? 'border-black bg-white text-black'
                        : 'border-gray-400 hover:border-black bg-white text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-[11px] font-medium uppercase tracking-wide border rounded transition-all ${
                      selectedSize === size
                        ? 'border-black bg-white text-black'
                        : 'border-gray-400 hover:border-black bg-white text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedSize('XXXL')}
                  className={`py-2.5 text-[11px] font-medium uppercase tracking-wide border rounded transition-all ${
                    selectedSize === 'XXXL'
                      ? 'border-black bg-white text-black'
                      : 'border-gray-400 hover:border-black bg-white text-black'
                  }`}
                >
                  XXXL
                </button>
              </div>
            </div>

            {/* Gift Card Checkbox */}
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="productGiftCard"
                checked={hasGiftCard}
                onChange={(e) => setHasGiftCard(e.target.checked)}
                className="w-4 h-4 border border-gray-500 rounded cursor-pointer"
              />
              <label htmlFor="productGiftCard" className="text-[10px] font-normal uppercase tracking-wider cursor-pointer">
                HAVE A GIFT CARD?
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full py-3.5 border border-black text-black text-[11px] font-bold uppercase tracking-widest rounded hover:bg-white/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize}
                className="w-full py-3.5 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded hover:bg-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="bg-white border-t border-gray-300 py-12">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider">
              YOU MAY ALSO LIKE
            </h2>
            <Link 
              href="/collections/all"
              className="text-[9px] font-normal uppercase tracking-wider hover:underline transition-all"
            >
              VIEW ALL
            </Link>
          </div>

          {/* Related Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                href={`/products/${relatedProduct.slug}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-white mb-3">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[9px] font-bold uppercase tracking-wider mb-1">
                  {relatedProduct.name}
                </h3>
                <p className="text-[9px] font-normal">
                  RS. {relatedProduct.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
