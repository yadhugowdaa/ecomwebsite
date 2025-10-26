import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const assistant = Assistant({
  subsets: ['latin'],
  variable: '--font-assistant',
})

export const metadata: Metadata = {
  title: 'LUNOX - Premium Streetwear',
  description: 'LUNOX, a premium streetwear brand. Shop the latest unisex styles for a bold, trend-setting look.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={assistant.variable}>
      <body className={`font-sans ${assistant.className}`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}
