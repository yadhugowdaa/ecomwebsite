'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { HiX } from 'react-icons/hi'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: { name: string; href: string }[]
}

const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">LUNOX</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
              aria-label="Close menu"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-lg font-medium hover:text-gray-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Additional Links */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">MORE</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="block py-2 text-lg font-medium hover:text-gray-600 transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/about-us"
                    onClick={onClose}
                    className="block py-2 text-lg font-medium hover:text-gray-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/contact-us"
                    onClick={onClose}
                    className="block py-2 text-lg font-medium hover:text-gray-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileMenu


