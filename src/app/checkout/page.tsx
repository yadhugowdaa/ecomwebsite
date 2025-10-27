'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      // Not logged in - redirect to login with return URL
      toast.info('Please login to continue with checkout')
      router.push('/login?redirect=/checkout')
      return
    }
    
    setIsAuthenticated(true)
    setLoading(false)
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    country: 'India',
    emailOffers: true,
    saveInfo: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    toast.success('Order placed successfully!')
    clearCart()
    router.push('/')
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render checkout if not authenticated
  if (!isAuthenticated) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/collections/all" className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = total()

  return (
    <div className="min-h-screen bg-white">
      {/* Centered Logo */}
      <div className="border-b border-gray-200 py-8">
        <div className="flex justify-center">
          <Link href="/">
            <Image 
              src="/bluorng-assets/cdn/lunox-logo.jpg" 
              alt="Lunox" 
              width={200} 
              height={80}
              className="h-16 w-auto"
            />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/cart" className="hover:text-black">Cart</Link>
          <span>›</span>
          <span className="font-medium text-black">Information</span>
          <span>›</span>
          <span>Shipping</span>
          <span>›</span>
          <span>Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            {/* Contact Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Contact</h2>
                {/* No sign in link - user is already authenticated */}
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />

              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailOffers"
                  checked={formData.emailOffers}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm">Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Delivery</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option>India</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />

                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-500"
                    required
                  >
                    <option value="">State</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="PIN code"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">Save this information for next time</span>
                </label>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Shipping method</h2>
              <div className="p-4 bg-gray-50 rounded text-sm text-gray-600">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>

            {/* Payment */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Payment</h2>
              <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
              
              <div className="border-2 border-blue-500 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <span className="font-medium">Cashfree Payments</span>
                    <span className="text-xs text-gray-500">(UPI,Cards,Wallets,NetBanking)</span>
                  </label>
                  <div className="flex gap-2">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25'%3E%3Crect fill='%23ff6900' width='40' height='25' rx='2'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='8' font-weight='bold'%3EUPI%3C/text%3E%3C/svg%3E" alt="UPI" className="h-6" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25'%3E%3Crect fill='%231A1F71' width='40' height='25' rx='2'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='6' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-6" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25'%3E%3Crect fill='%23EB001B' width='20' height='25'/%3E%3Crect fill='%23FF5F00' x='10' width='20' height='25'/%3E%3Crect fill='%23F79E1B' x='20' width='20' height='25'/%3E%3C/svg%3E" alt="Mastercard" className="h-6" />
                  </div>
                </div>
                <div className="bg-white p-4 rounded text-center text-sm text-gray-600">
                  After clicking "Pay now", you will be redirected to Cashfree Payments (UPI,Cards,Wallets,NetBanking) to complete your purchase securely.
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-4 border border-gray-300 rounded">
                <input type="radio" name="payment" className="w-4 h-4" />
                <span>Cash on Delivery (COD)</span>
              </label>
            </div>

            {/* Billing Address */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Billing address</h2>
              <label className="flex items-center gap-2 p-4 border-2 border-blue-500 rounded cursor-pointer mb-2">
                <input type="radio" name="billing" defaultChecked className="w-4 h-4" />
                <span>Same as shipping address</span>
              </label>
              <label className="flex items-center gap-2 p-4 border border-gray-300 rounded cursor-pointer">
                <input type="radio" name="billing" className="w-4 h-4" />
                <span>Use a different billing address</span>
              </label>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-black text-white rounded text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors mb-4"
            >
              Pay now
            </button>

            {/* Footer Links */}
            <div className="flex gap-4 text-sm text-blue-600">
              <Link href="/policies/refund" className="hover:underline">Refund policy</Link>
              <Link href="/policies/shipping" className="hover:underline">Shipping</Link>
              <Link href="/policies/privacy" className="hover:underline">Privacy policy</Link>
              <Link href="/policies/terms" className="hover:underline">Terms of service</Link>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border-l border-gray-200 pl-8">
              {/* Products */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id + item.size} className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border border-gray-300"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-600">{item.size}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code or gift card"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-gray-500">Enter shipping address</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-normal text-gray-600">INR</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Including ₹{(subtotal * 0.18).toLocaleString()} in taxes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
