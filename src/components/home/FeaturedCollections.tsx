import Link from 'next/link'

const FeaturedCollections = () => {
  const collections = [
    {
      name: 'Summer Vibes',
      description: 'Light and breezy pieces for the season',
      image: '/images/collections/summer.jpg',
      slug: 'summer-collection',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'Dark Mode',
      description: 'All-black everything',
      image: '/images/collections/dark.jpg',
      slug: 'black-collection',
      bgColor: 'bg-gray-900',
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Collections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group relative h-96 rounded-lg overflow-hidden"
            >
              <div className={`absolute inset-0 ${collection.bgColor}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{collection.name}</h3>
                <p className="text-lg mb-4 opacity-90">{collection.description}</p>
                <span className="inline-block text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  Shop Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollections


