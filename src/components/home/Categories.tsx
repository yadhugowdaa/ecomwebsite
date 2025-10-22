import Link from 'next/link'
import Image from 'next/image'

const Categories = () => {
  const categories = [
    {
      name: 'T-Shirts',
      slug: 't-shirts',
      image: '/images/categories/tshirts.jpg',
      count: 150,
    },
    {
      name: 'Hoodies',
      slug: 'hoodies',
      image: '/images/categories/hoodies.jpg',
      count: 80,
    },
    {
      name: 'Shirts',
      slug: 'shirts',
      image: '/images/categories/shirts.jpg',
      count: 65,
    },
    {
      name: 'Joggers',
      slug: 'joggers',
      image: '/images/categories/joggers.jpg',
      count: 45,
    },
    {
      name: 'Shorts',
      slug: 'shorts',
      image: '/images/categories/shorts.jpg',
      count: 30,
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      image: '/images/categories/accessories.jpg',
      count: 25,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className="group"
            >
              <div className="card overflow-hidden">
                <div className="aspect-square relative bg-gray-200">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                  {/* Placeholder for category image */}
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    👕
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories


