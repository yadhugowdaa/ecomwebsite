import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="https://cdn.shopify.com/videos/c/o/v/bf861138015a4c0caf95384ac27b20d7.mp4" type="video/mp4" />
      </video>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-4 md:mb-8 tracking-tight animate-fade-in">
            LUNOX
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white/90 mb-8 md:mb-12 font-light tracking-wider">
            Premium Streetwear Collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/collections/all-products"
              className="group px-8 md:px-12 py-3 md:py-4 bg-white text-black font-semibold text-base md:text-lg uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              Shop Now
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/collections/new-in"
              className="px-8 md:px-12 py-3 md:py-4 border-2 border-white text-white font-semibold text-base md:text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
