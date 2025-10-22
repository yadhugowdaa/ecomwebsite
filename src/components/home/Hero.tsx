import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      >
        <source src="https://cdn.shopify.com/videos/c/o/v/bf861138015a4c0caf95384ac27b20d7.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            LUNOX
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light tracking-wider">
            Premium Streetwear
          </p>
          <Link
            href="/collections/all-products"
            className="inline-block px-12 py-4 bg-white text-black font-semibold text-lg uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
          >
            Shop All
          </Link>
        </div>
      </div>
    </section>
  )
}
