'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'New Collection',
      subtitle: 'Premium Streetwear',
      description: 'Discover bold designs that define your style',
      cta: 'Shop Now',
      link: '/collections/new-in',
      bgColor: 'bg-gray-900',
      textColor: 'text-white',
    },
    {
      id: 2,
      title: 'Oversized Tees',
      subtitle: 'Comfort Meets Style',
      description: 'The perfect fit for the modern wardrobe',
      cta: 'Explore',
      link: '/collections/oversized-t-shirts',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
    },
    {
      id: 3,
      title: 'Limited Edition',
      subtitle: 'Exclusive Drops',
      description: 'Get your hands on limited pieces',
      cta: 'View Collection',
      link: '/collections/limited-edition',
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } ${slide.bgColor}`}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className={`max-w-2xl ${slide.textColor}`}>
              <h2 className="text-sm md:text-base font-semibold tracking-wider mb-4 uppercase">
                {slide.subtitle}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                {slide.description}
              </p>
              <Link
                href={slide.link}
                className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero


