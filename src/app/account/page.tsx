'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiUser, HiShoppingBag, HiLocationMarker, HiCog, HiLogout } from 'react-icons/hi'
import { api } from '@/lib/api'
import { toast } from 'react-toastify'

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        
        if (!token || !storedUser) {
          router.push('/login')
          return
        }

        // Try to fetch fresh user data
        try {
          const response = await api.getProfile()
          setUser(response.data.data)
          localStorage.setItem('user', JSON.stringify(response.data.data))
        } catch (error) {
          // If API fails, use stored user data
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Don't clear cart - keep cart items after logout
    toast.success('Logged out successfully!')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2">MY ACCOUNT</h1>
            <p className="text-lg text-gray-700">
              Welcome back, {user.firstName} {user.lastName}!
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Profile */}
            <Link 
              href="/account/profile" 
              className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-all border border-gray-200 hover:border-gray-300"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-black text-white">
                  <HiUser className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">PROFILE</h3>
                  <p className="text-sm text-gray-600">Manage your personal information</p>
                </div>
              </div>
            </Link>

            {/* Orders */}
            <Link 
              href="/account/orders" 
              className="bg-black rounded-lg shadow-sm p-8 hover:shadow-md transition-all text-white"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white text-black">
                  <HiShoppingBag className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">ORDERS</h3>
                  <p className="text-sm text-gray-300">View and track your orders</p>
                </div>
              </div>
            </Link>

            {/* Addresses */}
            <Link 
              href="/account/addresses" 
              className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-all border border-gray-200 hover:border-gray-300"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-black text-white">
                  <HiLocationMarker className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">ADDRESSES</h3>
                  <p className="text-sm text-gray-600">Manage your delivery addresses</p>
                </div>
              </div>
            </Link>

            {/* Settings */}
            <Link 
              href="/account/settings" 
              className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-all border border-gray-200 hover:border-gray-300"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-black text-white">
                  <HiCog className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">SETTINGS</h3>
                  <p className="text-sm text-gray-600">Update your account settings</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Logout Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-all font-bold uppercase tracking-wide"
            >
              <HiLogout className="h-5 w-5" />
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


