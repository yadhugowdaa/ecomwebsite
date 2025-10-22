'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiUser, HiShoppingBag, HiLocationMarker, HiCog } from 'react-icons/hi'

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // TODO: Fetch user data from API
    setUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    })
  }, [])

  const menuItems = [
    {
      icon: HiUser,
      title: 'Profile',
      description: 'Manage your personal information',
      href: '/account/profile',
    },
    {
      icon: HiShoppingBag,
      title: 'Orders',
      description: 'View and track your orders',
      href: '/account/orders',
    },
    {
      icon: HiLocationMarker,
      title: 'Addresses',
      description: 'Manage your delivery addresses',
      href: '/account/addresses',
    },
    {
      icon: HiCog,
      title: 'Settings',
      description: 'Update your account settings',
      href: '/account/settings',
    },
  ]

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to access your account.</p>
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-gray-600">
          Welcome back, {user.firstName} {user.lastName}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-black text-white rounded-lg">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


