'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { HiShoppingBag, HiShoppingCart, HiUsers, HiCurrencyRupee } from 'react-icons/hi'
import axios from 'axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:4000/api/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStats(response.data.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
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

  const statCards = [
    {
      icon: HiShoppingBag,
      label: 'Total Products',
      value: stats?.stats?.products || 0,
      color: 'bg-blue-500',
    },
    {
      icon: HiShoppingCart,
      label: 'Total Orders',
      value: stats?.stats?.orders || 0,
      color: 'bg-green-500',
    },
    {
      icon: HiUsers,
      label: 'Total Customers',
      value: stats?.stats?.customers || 0,
      color: 'bg-purple-500',
    },
    {
      icon: HiCurrencyRupee,
      label: 'Total Revenue',
      value: `₹${stats?.stats?.revenue?.toLocaleString() || 0}`,
      color: 'bg-yellow-500',
    },
  ]

  return (
    <AdminLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`${card.color} p-4 rounded-lg text-white`}>
                  <Icon className="h-8 w-8" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">Recent Orders</h3>
          </div>
          <div className="p-6">
            {stats?.recentOrders?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-semibold">#{order.order_number}</p>
                      <p className="text-sm text-gray-600">
                        {order.first_name} {order.last_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                      <p className={`text-xs ${
                        order.status === 'completed' ? 'text-green-600' : 
                        order.status === 'pending' ? 'text-yellow-600' : 
                        'text-gray-600'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No orders yet</p>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">Low Stock Alert</h3>
          </div>
          <div className="p-6">
            {stats?.lowStockProducts?.length > 0 ? (
              <div className="space-y-4">
                {stats.lowStockProducts.slice(0, 5).map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        product.stock === 0 ? 'text-red-600' : 
                        product.stock < 5 ? 'text-orange-600' : 
                        'text-yellow-600'
                      }`}>
                        {product.stock} in stock
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">All products in stock</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

