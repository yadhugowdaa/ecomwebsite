'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenuAlt3, HiX, HiShoppingBag, HiUser, HiSearch } from 'react-icons/hi'
import SearchBar from './SearchBar'
import MobileMenu from './MobileMenu'
import { useCartStore } from '@/store/cartStore'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const { items } = useCartStore()
  const pathname = usePathname()

  // Check if we're on a collection page
  const isCollectionPage = pathname?.startsWith('/collections')

  const announcementMessages = [
    'Extension of Your Expression',
    'Free Delivery on First Order'
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % announcementMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  const navLinks = [
    { name: 'New In', href: '/collections/new-in' },
    { name: 'T-Shirts', href: '/collections/t-shirts' },
    { name: 'Hoodies', href: '/collections/hoodies' },
    { name: 'Shirts', href: '/collections/shirts' },
    { name: 'Joggers', href: '/collections/joggers' },
    { name: 'Accessories', href: '/collections/accessories' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        {/* Announcement Bar - Rotating Messages */}
        <div className="bg-black text-white py-2.5 text-center overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.2em] font-normal transition-all duration-500">
            {announcementMessages[currentMessage]}
          </p>
        </div>

        {/* Main Header */}
        <div className="w-full">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                aria-label="Open menu"
              >
                <HiMenuAlt3 className="h-6 w-6" />
              </button>

              {/* Logo */}
              <Link href="/" className="text-2xl font-bold tracking-tight">
                LUNOX
              </Link>

              {/* Desktop Navigation - Absolutely Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
                <nav className="flex items-center space-x-8">
                  <Link
                    href="/collections/new-in"
                    className="text-xs font-normal uppercase tracking-wider hover:text-gray-600 transition-colors"
                  >
                    New In
                  </Link>
                  <div className="relative group">
                    <button className="text-xs font-normal uppercase tracking-wider hover:text-gray-600 transition-colors">
                      Apparel
                    </button>
                    {/* Mega Menu Dropdown */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-4 hidden group-hover:block z-50">
                      <div className="bg-white shadow-lg border border-gray-200 p-6 min-w-[600px]">
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wide mb-3">Top Wear</h3>
                            <ul className="space-y-2">
                              <li><Link href="/collections/t-shirts" className="text-xs hover:underline">T-Shirts</Link></li>
                              <li><Link href="/collections/polos" className="text-xs hover:underline">Polos</Link></li>
                              <li><Link href="/collections/shirts" className="text-xs hover:underline">Shirts</Link></li>
                              <li><Link href="/collections/hoodies" className="text-xs hover:underline">Hoodies</Link></li>
                              <li><Link href="/collections/sweatshirts" className="text-xs hover:underline">Sweatshirts</Link></li>
                              <li><Link href="/collections/jackets" className="text-xs hover:underline">Jackets</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wide mb-3">Bottom Wear</h3>
                            <ul className="space-y-2">
                              <li><Link href="/collections/jeans" className="text-xs hover:underline">Jeans</Link></li>
                              <li><Link href="/collections/cargos" className="text-xs hover:underline">Cargos</Link></li>
                              <li><Link href="/collections/joggers" className="text-xs hover:underline">Joggers</Link></li>
                              <li><Link href="/collections/shorts" className="text-xs hover:underline">Shorts</Link></li>
                              <li><Link href="/collections/pants" className="text-xs hover:underline">Pants</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wide mb-3">Accessories</h3>
                            <ul className="space-y-2">
                              <li><Link href="/collections/accessories" className="text-xs hover:underline">All Accessories</Link></li>
                              <li><Link href="/collections/jersey" className="text-xs hover:underline">Jersey</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/pages/stores"
                    className="text-xs font-normal uppercase tracking-wider hover:text-gray-600 transition-colors"
                  >
                    Stores
                  </Link>
                </nav>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                  aria-label="Search"
                >
                  <HiSearch className="h-5 w-5" />
                </button>

                <Link
                  href="/login"
                  className="hidden sm:block text-xs font-normal uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  LOGIN
                </Link>

                <Link
                  href="/account"
                  className="p-2 hover:bg-gray-100 rounded-md"
                  aria-label="Account"
                >
                  <HiUser className="h-5 w-5" />
                </Link>

                <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-md">
                  <HiShoppingBag className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation - Collection Links with Black Borders (Only on Collection Pages) */}
        {isCollectionPage && (
          <div className="border-t border-b border-black bg-white">
            <div className="container mx-auto px-4">
              <nav className="flex items-center justify-center space-x-6 py-3 overflow-x-auto">
                <Link
                  href="/collections/all"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  View All
                </Link>
                <Link
                  href="/collections/t-shirts"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  T-Shirts
                </Link>
                <Link
                  href="/collections/polos"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Polos
                </Link>
                <Link
                  href="/collections/shirts"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Shirts
                </Link>
                <Link
                  href="/collections/jackets"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Jackets
                </Link>
                <Link
                  href="/collections/hoodies"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Hoodies
                </Link>
                <Link
                  href="/collections/sweatshirts"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Sweatshirts
                </Link>
                <Link
                  href="/collections/cargos"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Cargos
                </Link>
                <Link
                  href="/collections/jeans"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Jeans
                </Link>
                <Link
                  href="/collections/shorts"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Shorts
                </Link>
                <Link
                  href="/collections/pants"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Pants
                </Link>
                <Link
                  href="/collections/jersey"
                  className="text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap hover:text-gray-600 transition-colors"
                >
                  Jersey
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* Search Overlay */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Spacer to prevent content from going under fixed header */}
      <div className={isCollectionPage ? "h-[132px]" : "h-[88px]"} />
    </>
  )
}

export default Header


