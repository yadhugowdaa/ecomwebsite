'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { HiPlus, HiTrash, HiUpload } from 'react-icons/hi'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: '',
    collection: '',
    stock: 0,
    is_active: true,
  })
  const [colors, setColors] = useState<any[]>([])
  const [images, setImages] = useState<any[]>([])
  const [sizes, setSizes] = useState<any[]>([])

  const categories = ['T-Shirts', 'Hoodies', 'Shirts', 'Jackets', 'Joggers', 'Cargos', 'Jeans', 'Shorts', 'Accessories']
  const collections = ['New In', 'Best Sellers', 'Sale', 'Limited Edition']
  const availableSizes = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSlugGenerate = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData({ ...formData, slug })
  }

  const addColor = () => {
    setColors([
      ...colors,
      { color_name: '', color_code: '#000000', stock: 0 },
    ])
  }

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index))
  }

  const updateColor = (index: number, field: string, value: any) => {
    const updated = [...colors]
    updated[index][field] = value
    setColors(updated)
  }

  const addImage = () => {
    setImages([
      ...images,
      { image_url: '', color_id: null, is_primary: false },
    ])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const updateImage = (index: number, field: string, value: any) => {
    const updated = [...images]
    updated[index][field] = value
    setImages(updated)
  }

  const addSize = () => {
    setSizes([
      ...sizes,
      { size: 'M', stock: 0, color_id: null },
    ])
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const updateSize = (index: number, field: string, value: any) => {
    const updated = [...sizes]
    updated[index][field] = value
    setSizes(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.slug || !formData.price) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        colors,
        images,
        sizes,
      }

      await axios.post('http://localhost:4000/api/admin/products', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Product created successfully!')
      router.push('/admin/products')
    } catch (error: any) {
      console.error('Error creating product:', error)
      toast.error(error.response?.data?.error || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add New Product</h1>
          <p className="text-gray-600">Create a new product with color variants and images</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleSlugGenerate}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="e.g., Charcoal Grey Joggers"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Slug *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="charcoal-grey-joggers"
                  />
                  <button
                    type="button"
                    onClick={handleSlugGenerate}
                    className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Collection</label>
                <select
                  name="collection"
                  value={formData.collection}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">Select Collection</option>
                  {collections.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="1999"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Total Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="Product description..."
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="w-5 h-5 rounded"
                />
                <label className="text-sm font-semibold">Active (visible on store)</label>
              </div>
            </div>
          </div>

          {/* Color Variants */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Color Variants</h2>
              <button
                type="button"
                onClick={addColor}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <HiPlus className="h-4 w-4" />
                Add Color
              </button>
            </div>
            {colors.length > 0 ? (
              <div className="space-y-4">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={color.color_name}
                      onChange={(e) => updateColor(index, 'color_name', e.target.value)}
                      placeholder="Color name (e.g., Charcoal Grey)"
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color.color_code}
                        onChange={(e) => updateColor(index, 'color_code', e.target.value)}
                        className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={color.color_code}
                        onChange={(e) => updateColor(index, 'color_code', e.target.value)}
                        placeholder="#000000"
                        className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <input
                      type="number"
                      value={color.stock}
                      onChange={(e) => updateColor(index, 'stock', parseInt(e.target.value))}
                      placeholder="Stock"
                      min="0"
                      className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No color variants added</p>
            )}
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Product Images</h2>
              <button
                type="button"
                onClick={addImage}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <HiPlus className="h-4 w-4" />
                Add Image
              </button>
            </div>
            {images.length > 0 ? (
              <div className="space-y-4">
                {images.map((image, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={image.image_url}
                      onChange={(e) => updateImage(index, 'image_url', e.target.value)}
                      placeholder="/products/image.jpg or https://..."
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={image.is_primary}
                        onChange={(e) => updateImage(index, 'is_primary', e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm">Primary</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No images added. Add product image URLs.</p>
            )}
          </div>

          {/* Sizes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Sizes & Stock</h2>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <HiPlus className="h-4 w-4" />
                Add Size
              </button>
            </div>
            {sizes.length > 0 ? (
              <div className="space-y-4">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <select
                      value={size.size}
                      onChange={(e) => updateSize(index, 'size', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      {availableSizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={size.stock}
                      onChange={(e) => updateSize(index, 'stock', parseInt(e.target.value))}
                      placeholder="Stock"
                      min="0"
                      className="w-32 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No sizes added</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {loading ? 'Creating Product...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

