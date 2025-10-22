'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiMenuAlt3, HiX, HiShoppingBag, HiUser, HiSearch } from 'react-icons/hi'
import SearchBar from './SearchBar'
import MobileMenu from './MobileMenu'
import { useCartStore } from '@/store/cartStore'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCartStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
        {/* Announcement Bar */}
        <div className="bg-black text-white py-2 text-center text-sm">
          <p>Free Shipping on Orders Above ₹1999 | Shop Now</p>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              aria-label="Open menu"
            >
              <HiMenuAlt3 className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
              LUNOX
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

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
                href="/account"
                className="hidden sm:block p-2 hover:bg-gray-100 rounded-md"
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
      <div className="h-[104px]" />
    </>
  )
}

export default Header


