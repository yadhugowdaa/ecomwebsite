'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiHome, HiShoppingBag, HiUsers, HiChartBar, HiCog, HiShoppingCart } from 'react-icons/hi2'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { name: 'Total Revenue', value: '₹2,45,000', change: '+12.5%', icon: HiChartBar },
    { name: 'Total Orders', value: '145', change: '+8.2%', icon: HiShoppingCart },
    { name: 'Total Products', value: '68', change: '+3', icon: HiShoppingBag },
    { name: 'Total Customers', value: '892', change: '+24', icon: HiUsers },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', product: 'Black Basic T-Shirt', amount: '₹1,699', status: 'Delivered' },
    { id: 'ORD-002', customer: 'Jane Smith', product: 'White Commitment Tee', amount: '₹1,699', status: 'Shipped' },
    { id: 'ORD-003', customer: 'Mike Johnson', product: 'Grey Essential Tee', amount: '₹1,699', status: 'Processing' },
    { id: 'ORD-004', customer: 'Sarah Williams', product: 'Navy Blue Classic', amount: '₹1,699', status: 'Pending' },
    { id: 'ORD-005', customer: 'Tom Brown', product: 'Black Hoodie', amount: '₹2,499', status: 'Delivered' },
  ]

  const topProducts = [
    { name: 'Black Basic T-Shirt', sales: 145, revenue: '₹2,46,355' },
    { name: 'White Commitment Tee', sales: 128, revenue: '₹2,17,472' },
    { name: 'Grey Essential Tee', sales: 112, revenue: '₹1,90,288' },
    { name: 'Navy Blue Classic', sales: 98, revenue: '₹1,66,502' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, Admin</p>
            </div>
            <Link
              href="/"
              className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <HiHome className="mr-2" />
              View Store
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change}</p>
                </div>
                <stat.icon className="h-12 w-12 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Product</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-2 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="py-4 px-2 text-sm text-gray-600">{order.customer}</td>
                      <td className="py-4 px-2 text-sm text-gray-600">{order.product}</td>
                      <td className="py-4 px-2 text-sm font-semibold text-gray-900">{order.amount}</td>
                      <td className="py-4 px-2">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="border-b pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{product.sales} sales</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(product.sales / 145) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add Product</h3>
                <p className="text-sm text-gray-600 mt-1">Create a new product listing</p>
              </div>
              <HiShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
          </button>

          <button className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Manage Orders</h3>
                <p className="text-sm text-gray-600 mt-1">View and process orders</p>
              </div>
              <HiShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </button>

          <button className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Configure your store</p>
              </div>
              <HiCog className="h-8 w-8 text-purple-600" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

