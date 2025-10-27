'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { HiSave, HiVideoCamera, HiPhotograph } from 'react-icons/hi'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroContent, setHeroContent] = useState({
    section: 'hero',
    content_type: 'video',
    content_url: '',
    title: '',
    description: '',
    button_text: 'SHOP ALL',
    button_link: '/collections/all-products',
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:4000/api/admin/content/hero', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data.data) {
        setHeroContent(response.data.data)
      }
    } catch (error) {
      console.log('No existing content found, using defaults')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!heroContent.content_url) {
      toast.error('Please provide a content URL')
      return
    }

    setSaving(true)

    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:4000/api/admin/content',
        heroContent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      toast.success('Content updated successfully!')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update content')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Content Management</h1>
          <p className="text-gray-600">Manage homepage hero section, banners, and content</p>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              {heroContent.content_type === 'video' ? (
                <HiVideoCamera className="h-6 w-6 text-blue-600" />
              ) : (
                <HiPhotograph className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">Hero Section</h2>
              <p className="text-sm text-gray-600">Main landing page video or image</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Content Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">Content Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="video"
                    checked={heroContent.content_type === 'video'}
                    onChange={(e) => setHeroContent({ ...heroContent, content_type: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span>Video</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="image"
                    checked={heroContent.content_type === 'image'}
                    onChange={(e) => setHeroContent({ ...heroContent, content_type: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span>Image</span>
                </label>
              </div>
            </div>

            {/* Content URL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {heroContent.content_type === 'video' ? 'Video URL' : 'Image URL'}
              </label>
              <input
                type="url"
                value={heroContent.content_url}
                onChange={(e) => setHeroContent({ ...heroContent, content_url: e.target.value })}
                placeholder={heroContent.content_type === 'video' 
                  ? 'https://cdn.shopify.com/videos/...' 
                  : 'https://...your-image.jpg'}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                {heroContent.content_type === 'video' 
                  ? 'Enter the full URL to your video (MP4 format recommended)' 
                  : 'Enter the full URL to your hero image'}
              </p>
            </div>

            {/* Button Text */}
            <div>
              <label className="block text-sm font-semibold mb-2">Button Text</label>
              <input
                type="text"
                value={heroContent.button_text}
                onChange={(e) => setHeroContent({ ...heroContent, button_text: e.target.value })}
                placeholder="SHOP ALL"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Button Link */}
            <div>
              <label className="block text-sm font-semibold mb-2">Button Link</label>
              <input
                type="text"
                value={heroContent.button_link}
                onChange={(e) => setHeroContent({ ...heroContent, button_link: e.target.value })}
                placeholder="/collections/all-products"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Preview */}
            {heroContent.content_url && (
              <div>
                <label className="block text-sm font-semibold mb-2">Preview</label>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-black aspect-video">
                  {heroContent.content_type === 'video' ? (
                    <video
                      src={heroContent.content_url}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={heroContent.content_url}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              <HiSave className="h-5 w-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Current Homepage Video Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">📌 Current Homepage Video</h3>
          <p className="text-sm text-blue-700 mb-3">
            The hero section currently uses a video from Shopify CDN. You can replace it with your own video or image using this form.
          </p>
          <div className="bg-white p-3 rounded text-xs font-mono text-gray-700 break-all">
            https://cdn.shopify.com/videos/c/o/v/bf861138015a4c0caf95384ac27b20d7.mp4
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

