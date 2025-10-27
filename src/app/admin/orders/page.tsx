'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { HiEye, HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:4000/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrders(response.data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `http://localhost:4000/api/admin/orders/${orderId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      toast.success('Order status updated')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update order status')
    }
  }

  const handleDelete = async (orderId: number) => {
    if (!confirm('Are you sure you want to delete this order?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:4000/api/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Order deleted successfully')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to delete order')
    }
  }

  const viewOrderDetails = async (orderId: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:4000/api/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSelectedOrder(response.data.data)
      setShowModal(true)
    } catch (error) {
      toast.error('Failed to fetch order details')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'processing':
        return 'bg-blue-100 text-blue-700'
      case 'shipped':
        return 'bg-purple-100 text-purple-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-yellow-100 text-yellow-700'
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Orders Management</h1>
        <p className="text-gray-600">View and manage customer orders</p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">
                    #{order.order_number}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">
                        {order.first_name} {order.last_name}
                      </p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ₹{parseFloat(order.total_amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.payment_status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm border-0 cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => viewOrderDetails(order.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="View Details"
                      >
                        <HiEye className="h-5 w-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Delete"
                      >
                        <HiTrash className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <p className="text-gray-600">Order #{selectedOrder.order_number}</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-bold text-lg mb-2">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                  <p><strong>Name:</strong> {selectedOrder.first_name} {selectedOrder.last_name}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-bold text-lg mb-2">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="font-semibold">{item.product_name}</p>
                        <p className="text-sm text-gray-600">
                          {item.color_name && `Color: ${item.color_name} | `}
                          {item.size && `Size: ${item.size} | `}
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">₹{parseFloat(item.price).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>₹{parseFloat(selectedOrder.total_amount).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

