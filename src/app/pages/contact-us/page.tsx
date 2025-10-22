'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Thank you! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">CONTACT US</h1>
          <p className="text-center text-gray-600 mb-12">We'd love to hear from you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-center p-6 border-2 border-black">
              <h3 className="font-bold text-xl mb-2">EMAIL</h3>
              <p className="text-gray-700">support@lunox.com</p>
            </div>

            <div className="text-center p-6 border-2 border-black">
              <h3 className="font-bold text-xl mb-2">PHONE</h3>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

