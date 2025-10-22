'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="page-width page-margin">
        <div className="cart-empty">
          <h1>Your cart</h1>
          <p className="cart-empty__message">Your cart is currently empty.</p>
          <Link href="/collections/all-products" className="button">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-width page-margin">
      <div className="title-wrapper-with-link">
        <h1 className="title title--primary">Your cart</h1>
        <Link href="/collections/all-products">Continue shopping</Link>
      </div>

      <div className="cart__items-wrapper isolate">
        <form action="/cart" method="post" id="cart">
          <div className="cart__items">
            <div className="cart__items-table">
              <table className="cart-items">
                <thead>
                  <tr>
                    <th className="caption-with-letter-spacing" scope="col">
                      Product
                    </th>
                    <th className="medium-hide large-up-hide right caption-with-letter-spacing" scope="col">
                      Total
                    </th>
                    <th className="cart-items__heading--wide small-hide caption-with-letter-spacing" scope="col">
                      Quantity
                    </th>
                    <th className="small-hide right caption-with-letter-spacing" scope="col">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id + item.size} className="cart-item">
                      <td className="cart-item__details">
                        <Link href={`/products/${item.id}`} className="cart-item__image-container gradient global-media-settings">
                          <img
                            className="cart-item__image"
                            src={item.image || '/placeholder-image.jpg'}
                            alt={item.name}
                            width="150"
                            height="150"
                          />
                        </Link>

                        <div>
                          <Link href={`/products/${item.id}`} className="cart-item__name h4 break">
                            {item.name}
                          </Link>

                          <dl>
                            <div className="product-option">
                              <dt>Size:</dt>
                              <dd>{item.size}</dd>
                            </div>

                            <div className="product-option">
                              <dt>Price:</dt>
                              <dd className="price price--end">
                                ₹{item.price}
                              </dd>
                            </div>
                          </dl>

                          <p className="product-option">
                            <cart-remove-button
                              onClick={() => removeItem(item.id, item.size)}
                            >
                              <button className="button button--tertiary" type="button">
                                Remove
                              </button>
                            </cart-remove-button>
                          </p>
                        </div>
                      </td>

                      <td className="cart-item__totals right medium-hide large-up-hide">
                        <div className="loading-overlay hidden">
                          <div className="loading-overlay__spinner">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              className="spinner"
                              viewBox="0 0 66 66"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                className="path"
                                fill="none"
                                strokeWidth="6"
                                cx="33"
                                cy="33"
                                r="30"
                              ></circle>
                            </svg>
                          </div>
                        </div>
                        <div className="cart-item__price-wrapper">
                          <span className="price price--end">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </td>

                      <td className="cart-item__quantity">
                        <div className="cart-item__quantity-wrapper">
                          <label className="visually-hidden" htmlFor={`Quantity-${item.id}`}>
                            Quantity
                          </label>
                          <div className="quantity">
                            <button
                              className="quantity__button no-js-hidden"
                              type="button"
                              onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false"
                                className="icon icon-minus"
                                fill="none"
                                viewBox="0 0 10 2"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <input
                              className="quantity__input"
                              type="number"
                              name={`updates-${item.id}`}
                              value={item.quantity}
                              min="1"
                              aria-label={`Quantity for ${item.name}`}
                              id={`Quantity-${item.id}`}
                              onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value) || 1)}
                            />
                            <button
                              className="quantity__button no-js-hidden"
                              type="button"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false"
                                className="icon icon-plus"
                                fill="none"
                                viewBox="0 0 10 10"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="cart-item__error" id="Line-item-error-1"></div>
                        </div>
                      </td>

                      <td className="cart-item__totals right small-hide">
                        <div className="loading-overlay hidden">
                          <div className="loading-overlay__spinner">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              className="spinner"
                              viewBox="0 0 66 66"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                className="path"
                                fill="none"
                                strokeWidth="6"
                                cx="33"
                                cy="33"
                                r="30"
                              ></circle>
                            </svg>
                          </div>
                        </div>

                        <div className="cart-item__price-wrapper">
                          <span className="price price--end">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cart__footer isolate">
            <div className="cart__blocks">
              <div className="cart__note">
                <p className="cart__message caption-large" role="status">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>

            <div className="cart__ctas">
              <div className="totals">
                <h2 className="totals__total">Subtotal</h2>
                <p className="totals__total-value">₹{total()}</p>
              </div>

              <div className="cart__ctas-buttons">
                <Link href="/checkout" className="cart__update button button--primary">
                  Check out
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="cart__additional-content">
        <div className="center">
          <Link href="/collections/all-products" className="link link--text underlined-link">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
