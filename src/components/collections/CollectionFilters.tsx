'use client'

import { useState } from 'react'

const CollectionFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#008000' },
  ]

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h3 className="font-semibold mb-4">Filters</h3>

        {/* Sort */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Size</label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`border rounded-md py-2 text-sm font-medium transition-colors ${
                  selectedSizes.includes(size)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Color</label>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.name)
                    ? 'border-black scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        {/* In Stock Only */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>

        {/* Clear Filters */}
        <button className="w-full text-sm text-red-500 hover:text-red-600 font-medium">
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

export default CollectionFilters


