'use client'

import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const assistant = Assistant({
  subsets: ['latin'],
  variable: '--font-assistant',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCheckoutPage = pathname === '/checkout'
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <html lang="en" className={assistant.variable}>
      <body className={`font-sans ${assistant.className}`}>
        {!isCheckoutPage && !isAdminPage && <Header />}
        <main className={`${isAdminPage ? '' : 'min-h-screen'}`}>
          {children}
        </main>
        {!isCheckoutPage && !isAdminPage && <Footer />}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}
