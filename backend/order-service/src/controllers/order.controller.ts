import { Request, Response, NextFunction } from 'express'
import { query } from '../db/init'
import { v4 as uuidv4 } from 'uuid'

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `LNX${timestamp}${random}`
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userId,
      items,
      subtotal,
      shipping,
      tax,
      discount,
      total,
      paymentMethod,
      shippingAddress,
      billingAddress,
      notes,
    } = req.body

    const orderNumber = generateOrderNumber()

    const result = await query(
      `INSERT INTO orders (
        user_id, order_number, items, subtotal, shipping, tax, discount, total,
        payment_method, shipping_address, billing_address, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        userId,
        orderNumber,
        JSON.stringify(items),
        subtotal,
        shipping,
        tax,
        discount,
        total,
        paymentMethod,
        JSON.stringify(shippingAddress),
        JSON.stringify(billingAddress),
        notes,
      ]
    )

    res.status(201).json({
      success: true,
      data: {
        ...result.rows[0],
        items: JSON.parse(result.rows[0].items),
        shippingAddress: JSON.parse(result.rows[0].shipping_address),
        billingAddress: JSON.parse(result.rows[0].billing_address),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    const { page = 1, limit = 10 } = req.query

    const offset = (Number(page) - 1) * Number(limit)

    const [ordersResult, countResult] = await Promise.all([
      query(
        `SELECT * FROM orders WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
      ),
      query('SELECT COUNT(*) FROM orders WHERE user_id = $1', [userId]),
    ])

    const orders = ordersResult.rows.map((order: any) => ({
      ...order,
      items: JSON.parse(order.items),
      shippingAddress: JSON.parse(order.shipping_address),
      billingAddress: JSON.parse(order.billing_address),
    }))

    const total = parseInt(countResult.rows[0].count)

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getOrderByNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderNumber } = req.params

    const result = await query('SELECT * FROM orders WHERE order_number = $1', [orderNumber])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }

    const order = {
      ...result.rows[0],
      items: JSON.parse(result.rows[0].items),
      shippingAddress: JSON.parse(result.rows[0].shipping_address),
      billingAddress: JSON.parse(result.rows[0].billing_address),
    }

    res.json({ success: true, data: order })
  } catch (error) {
    next(error)
  }
}

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const validStatuses = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded',
    ]

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid order status' })
    }

    const result = await query(
      `UPDATE orders 
       SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

export const updateTrackingNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { trackingNumber } = req.body

    const result = await query(
      `UPDATE orders 
       SET tracking_number = $1, status = 'shipped', updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [trackingNumber, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const result = await query(
      `UPDATE orders 
       SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND status IN ('pending', 'confirmed') 
       RETURNING *`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found or cannot be cancelled' })
    }

    res.json({ success: true, message: 'Order cancelled successfully' })
  } catch (error) {
    next(error)
  }
}

