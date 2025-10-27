'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { HiSave, HiCog, HiMail, HiCurrencyRupee } from 'react-icons/hi'
import { toast } from 'react-toastify'

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'LUNOX',
    storeEmail: 'support@lunox.com',
    storePhone: '+91 98765 43210',
    currency: 'INR',
    taxRate: 18,
    shippingFee: 0,
    freeShippingThreshold: 2000,
    announcementText: 'Extension of Your Expression',
    enableAnnouncement: true,
  })

  const handleSave = async () => {
    setSaving(true)
    
    // Simulate save
    setTimeout(() => {
      toast.success('Settings saved successfully!')
      setSaving(false)
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">Manage your store settings and configuration</p>
        </div>

        {/* Store Information */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <HiCog className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Store Information</h2>
              <p className="text-sm text-gray-600">Basic store details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Store Email</label>
                <input
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Store Phone</label>
                <input
                  type="tel"
                  value={settings.storePhone}
                  onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Shipping */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <HiCurrencyRupee className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Pricing & Shipping</h2>
              <p className="text-sm text-gray-600">Configure pricing and shipping</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Shipping Fee (₹)</label>
                <input
                  type="number"
                  value={settings.shippingFee}
                  onChange={(e) => setSettings({ ...settings, shippingFee: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Free Shipping Above (₹)</label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <HiMail className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Announcement Banner</h2>
              <p className="text-sm text-gray-600">Top banner message on website</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.enableAnnouncement}
                onChange={(e) => setSettings({ ...settings, enableAnnouncement: e.target.checked })}
                className="w-5 h-5 rounded"
              />
              <label className="text-sm font-semibold">Enable Announcement Banner</label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Announcement Text</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="Extension of Your Expression"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
        >
          <HiSave className="h-5 w-5" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>

        {/* Note */}
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Settings are currently stored in local state. In production, these would be saved to a database and applied site-wide.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}

