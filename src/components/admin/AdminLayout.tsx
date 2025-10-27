'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  HiHome, 
  HiShoppingBag, 
  HiShoppingCart, 
  HiUsers, 
  HiCog,
  HiMenu,
  HiX,
  HiLogout,
  HiViewGrid
} from 'react-icons/hi'
import { toast } from 'react-toastify'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.role !== 'admin' && userData.role !== 'super_admin') {
        toast.error('Access denied. Admin privileges required.')
        router.push('/')
        return
      }
      setUser(userData)
    } else {
      router.push('/admin/login')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  const menuItems = [
    { icon: HiHome, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: HiShoppingBag, label: 'Products', href: '/admin/products' },
    { icon: HiShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: HiUsers, label: 'Customers', href: '/admin/customers' },
    { icon: HiViewGrid, label: 'Content', href: '/admin/content' },
    { icon: HiCog, label: 'Settings', href: '/admin/settings' },
  ]

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold">LUNOX ADMIN</h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded"
            >
              {isSidebarOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          {isSidebarOpen && (
            <div className="mb-3 px-4">
              <p className="text-sm font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full hover:bg-gray-800 rounded transition-colors text-gray-300"
          >
            <HiLogout className="h-5 w-5 flex-shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {menuItems.find((item) => pathname === item.href)?.label || 'Admin Panel'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

