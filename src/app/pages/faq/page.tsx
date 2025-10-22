'use client'

import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is your shipping policy?',
      answer: 'We offer free shipping on all orders above ₹1999. Orders are typically delivered within 5-7 business days across India.'
    },
    {
      question: 'What is your return/exchange policy?',
      answer: 'We accept returns and exchanges within 7 days of delivery. Products must be unwashed, unworn, and in original condition with all tags attached.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) for orders across India.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from your account dashboard.'
    },
    {
      question: 'What is your size guide?',
      answer: 'Please refer to our size chart page for detailed measurements. If you're between sizes, we recommend sizing up for our oversized collection.'
    },
    {
      question: 'What is GSM in t-shirts?',
      answer: 'GSM (Grams per Square Meter) indicates fabric weight. Our premium t-shirts are 220+ GSM, ensuring durability and quality.'
    },
    {
      question: 'Are your products unisex?',
      answer: 'Yes! All LUNOX products are designed as unisex wear, suitable for everyone.'
    },
    {
      question: 'How do I care for my LUNOX products?',
      answer: 'Machine wash cold, tumble dry low, and avoid bleach. Turn garments inside out before washing to preserve prints and colors.'
    },
  ]

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="text-center text-gray-600 mb-12">Find answers to common questions</p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-2 border-black">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-4 font-semibold hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <span className="text-lg">{faq.question}</span>
                <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t-2 border-black">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="/pages/contact-us"
            className="inline-block bg-black text-white px-8 py-3 font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </div>
  )
}

