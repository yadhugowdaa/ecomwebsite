import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    help: [
      { name: 'MEMBERS LOGIN', href: '/login' },
      { name: 'PLACE AN EXCHANGE/RETURN REQUEST', href: '/pages/return-exchange' },
      { name: 'EXCHANGE/RETURNS POLICY', href: '/policies/refund-policy' },
      { name: 'FAQ', href: '/pages/faq' },
      { name: 'TERMS', href: '/policies/terms-of-service' },
      { name: 'SHIPPING', href: '/policies/shipping-policy' },
    ],
    company: [
      { name: 'STORY', href: '/pages/about-us' },
      { name: 'OUR STORES', href: '/pages/stores' },
      { name: 'CAREERS', href: '/pages/careers' },
      { name: 'CONTACT US', href: '/pages/contact-us' },
      { name: 'COLLABORATIONS', href: '/pages/collaborations' },
      { name: 'BLOGS', href: '/blogs' },
    ],
  }

  const shopByCategory = [
    'OVERSIZED T-SHIRTS', 'JOGGERS', 'ACID WASH T-SHIRTS', 
    'DESIGNER SHIRTS', 'CASUAL JACKETS', 'BLACK HOODIES', 'PRINTED SWEATSHIRTS'
  ]

  const shopByStyle = [
    'PRINTED SHIRTS', 'CHECKED SHIRTS', 'CASUAL SHIRTS', 
    'FULL-SLEEVE SHIRTS', 'HALF-SLEEVE SHIRTS', 'CREW NECK T-SHIRT', 'PRINTED T-SHIRTS'
  ]

  const shopByColor = [
    'BLACK T-SHIRTS', 'WHITE T-SHIRTS', 'BLUE T-SHIRTS', 'RED T-SHIRTS'
  ]

  return (
    <footer className="bg-white">
      {/* Footer Text Banner */}
      <div className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-sm font-normal uppercase tracking-wide mb-2">
            Feel The Luxury Of Premium Streetwear With LUNOX - Best Unisex Clothing Brand In India
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed font-normal">
            READ MORE...
          </p>
        </div>
      </div>

      {/* Shipping Banner */}
      <div className="bg-black text-white py-2.5 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          <span className="inline-block text-xs uppercase tracking-[0.3em]">
            SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="inline-block text-xs uppercase tracking-[0.3em]">
            SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; SHIPPING WORLDWIDE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'serif' }}>
              Lunox
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              © {currentYear} LUNOX RETAIL PRIVATE LIMITED, ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-bold mb-4 uppercase tracking-wide">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold mb-4 uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold mb-4 uppercase tracking-wide">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-xs font-bold mb-4 uppercase tracking-wide">Popular Searches</h4>
          
          <div className="mb-6">
            <h5 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Shop by Category</h5>
            <div className="flex flex-wrap gap-2">
              {shopByCategory.map((item) => (
                <Link
                  key={item}
                  href={`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs text-gray-600 hover:text-black uppercase"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h5 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Shop by Style</h5>
            <div className="flex flex-wrap gap-2">
              {shopByStyle.map((item) => (
                <Link
                  key={item}
                  href={`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs text-gray-600 hover:text-black uppercase"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Shop by Color</h5>
            <div className="flex flex-wrap gap-2">
              {shopByColor.map((item) => (
                <Link
                  key={item}
                  href={`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs text-gray-600 hover:text-black uppercase"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


