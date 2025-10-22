'use client'

import { useState, useEffect, useRef } from 'react'
import { HiX, HiSearch } from 'react-icons/hi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
      setSuggestions([])
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      onClose()
    }
  }

  const popularSearches = [
    'Black T-Shirts',
    'Oversized Hoodies',
    'Printed Shirts',
    'Joggers',
    'New Arrivals',
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </form>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
              aria-label="Close search"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          {/* Popular Searches */}
          {!query && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                POPULAR SEARCHES
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <Link
                    key={search}
                    href={`/search?q=${encodeURIComponent(search)}`}
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                  >
                    {search}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchBar


