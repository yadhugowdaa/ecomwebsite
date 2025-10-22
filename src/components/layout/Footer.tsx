import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/collections/new-in' },
      { name: 'Best Sellers', href: '/collections/bestsellers' },
      { name: 'T-Shirts', href: '/collections/t-shirts' },
      { name: 'Hoodies', href: '/collections/hoodies' },
      { name: 'All Products', href: '/collections/all' },
    ],
    help: [
      { name: 'Contact Us', href: '/pages/contact-us' },
      { name: 'FAQ', href: '/pages/faq' },
      { name: 'Size Chart', href: '/pages/size-chart' },
      { name: 'Shipping Policy', href: '/policies/shipping-policy' },
      { name: 'Return & Exchange', href: '/pages/return-exchange' },
    ],
    about: [
      { name: 'About Us', href: '/pages/about-us' },
      { name: 'Our Stores', href: '/pages/stores' },
      { name: 'Collaborations', href: '/pages/collaborations' },
      { name: 'Careers', href: '/pages/careers' },
      { name: 'Blog', href: '/blogs' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/policies/privacy-policy' },
      { name: 'Terms of Service', href: '/policies/terms-of-service' },
      { name: 'Refund Policy', href: '/policies/refund-policy' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">LUNOX</h3>
            <p className="text-gray-400 text-sm mb-4">
              Premium streetwear brand delivering bold, trend-setting unisex styles.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Lunox. All rights reserved.</p>
          <p className="mt-2">Premium Streetwear Brand | Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


