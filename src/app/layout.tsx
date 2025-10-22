import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const assistant = Assistant({
  subsets: ['latin'],
  variable: '--font-assistant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lunox - Premium Streetwear Brand',
  description: 'LUNOX, a premium streetwear brand. Shop the latest unisex styles for a bold, trend-setting look.',
  keywords: ['streetwear', 'fashion', 'clothing', 'unisex', 'premium', 'lunox'],
  authors: [{ name: 'Lunox' }],
  openGraph: {
    title: 'Lunox - Premium Streetwear Brand',
    description: 'LUNOX, a premium streetwear brand. Shop the latest unisex styles for a bold, trend-setting look.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lunox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lunox - Premium Streetwear Brand',
    description: 'LUNOX, a premium streetwear brand. Shop the latest unisex styles for a bold, trend-setting look.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={assistant.variable}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  )
}


