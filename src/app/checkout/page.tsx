'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    // Simulate order placement
    toast.success('Order placed successfully!')
    clearCart()
    router.push('/')
  }

  if (items.length === 0) {
    return (
      <div className="page-width page-margin">
        <div className="cart-empty">
          <h1>Checkout</h1>
          <p className="cart-empty__message">Your cart is empty.</p>
          <Link href="/collections/all-products" className="button">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper page-width">
        <div className="checkout-breadcrumb">
          <Link href="/cart">Cart</Link>
          <span className="separator">›</span>
          <span>Information</span>
          <span className="separator">›</span>
          <span className="inactive">Shipping</span>
          <span className="separator">›</span>
          <span className="inactive">Payment</span>
        </div>

        <div className="checkout-content">
          {/* Left Side - Checkout Form */}
          <div className="checkout-main">
            <div className="checkout-section">
              <h2 className="checkout-section__title">Contact information</h2>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="field__input"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label className="field__label" htmlFor="email">
                  Email
                </label>
              </div>
            </div>

            <div className="checkout-section">
              <h2 className="checkout-section__title">Shipping address</h2>
              
              <div className="checkout-section__content">
                <div className="field-group">
                  <div className="field">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="field__input"
                      placeholder=" "
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <label className="field__label" htmlFor="firstName">
                      First name
                    </label>
                  </div>

                  <div className="field">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="field__input"
                      placeholder=" "
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    <label className="field__label" htmlFor="lastName">
                      Last name
                    </label>
                  </div>
                </div>

                <div className="field">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="field__input"
                    placeholder=" "
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <label className="field__label" htmlFor="address">
                    Address
                  </label>
                </div>

                <div className="field-group field-group--three">
                  <div className="field">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="field__input"
                      placeholder=" "
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    <label className="field__label" htmlFor="city">
                      City
                    </label>
                  </div>

                  <div className="field">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="field__input"
                      placeholder=" "
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                    <label className="field__label" htmlFor="state">
                      State
                    </label>
                  </div>

                  <div className="field">
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      className="field__input"
                      placeholder=" "
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                    <label className="field__label" htmlFor="pincode">
                      PIN code
                    </label>
                  </div>
                </div>

                <div className="field">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="field__input"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <label className="field__label" htmlFor="phone">
                    Phone
                  </label>
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <button
                type="submit"
                className="button button--full-width button--primary"
                onClick={handleSubmit}
              >
                Continue to shipping
              </button>
            </div>

            <div className="checkout-footer">
              <Link href="/cart" className="link">
                ‹ Return to cart
              </Link>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h2 className="order-summary__title">Order summary</h2>

              <div className="order-summary__sections">
                <table className="order-summary__section order-summary__section--product-list">
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id + item.size} className="product">
                        <td className="product__image">
                          <div className="product-thumbnail">
                            <div className="product-thumbnail__wrapper">
                              <img
                                alt={item.name}
                                className="product-thumbnail__image"
                                src={item.image || '/placeholder-image.jpg'}
                              />
                            </div>
                            <span className="product-thumbnail__quantity" aria-hidden="true">
                              {item.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="product__description">
                          <span className="product__description__name order-summary__emphasis">
                            {item.name}
                          </span>
                          <span className="product__description__variant order-summary__small-text">
                            Size: {item.size}
                          </span>
                        </td>
                        <td className="product__price">
                          <span className="order-summary__emphasis">
                            ₹{item.price * item.quantity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="order-summary__section">
                  <tbody>
                    <tr className="total-line">
                      <td className="total-line__name">Subtotal</td>
                      <td className="total-line__price">
                        <span className="order-summary__emphasis">₹{total()}</span>
                      </td>
                    </tr>
                    <tr className="total-line">
                      <td className="total-line__name">Shipping</td>
                      <td className="total-line__price">
                        <span className="order-summary__small-text">
                          Calculated at next step
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="total-line">
                      <td className="total-line__name">
                        <span className="payment-due-label__total">Total</span>
                      </td>
                      <td className="total-line__price">
                        <span className="payment-due__currency">INR</span>
                        <span className="payment-due__price">₹{total()}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-container {
          min-height: 100vh;
          background: #fafafa;
          padding: 2rem 0;
        }

        .checkout-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .checkout-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: 0.875rem;
        }

        .checkout-breadcrumb .inactive {
          color: #999;
        }

        .checkout-content {
          display: grid;
          grid-template-columns: 1fr 500px;
          gap: 4rem;
        }

        @media (max-width: 990px) {
          .checkout-content {
            grid-template-columns: 1fr;
          }

          .checkout-sidebar {
            order: -1;
          }
        }

        .checkout-section {
          margin-bottom: 2rem;
        }

        .checkout-section__title {
          font-size: 1.125rem;
          margin-bottom: 1rem;
        }

        .field-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .field-group--three {
          grid-template-columns: 1fr 1fr 1fr;
        }

        .checkout-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .order-summary {
          background: white;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 1.5rem;
          position: sticky;
          top: 2rem;
        }

        .order-summary__title {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .product {
          border-bottom: 1px solid #e1e1e1;
          padding: 1rem 0;
        }

        .product__image {
          width: 64px;
        }

        .product-thumbnail {
          position: relative;
        }

        .product-thumbnail__image {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 4px;
        }

        .product-thumbnail__quantity {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #333;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .product__description {
          padding: 0 1rem;
        }

        .product__description__name {
          display: block;
          margin-bottom: 0.25rem;
        }

        .product__description__variant {
          font-size: 0.875rem;
          color: #666;
        }

        .total-line {
          padding: 0.5rem 0;
        }

        .total-line__name {
          text-align: left;
        }

        .total-line__price {
          text-align: right;
        }

        tfoot .total-line {
          border-top: 1px solid #e1e1e1;
          padding-top: 1rem;
          margin-top: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .payment-due__price {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  )
}
