import Link from 'next/link'

const BestSellers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Best Sellers</h2>
          <Link
            href="/collections/bestsellers"
            className="text-sm font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Will be populated with ProductCard components */}
        <div className="text-center py-16 text-gray-500">
          Best selling products will appear here
        </div>
      </div>
    </section>
  )
}

export default BestSellers


