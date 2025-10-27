import { Response } from 'express'
import { AuthRequest } from '../middleware/admin.middleware'
import { query } from '../db/init'

// Get all orders
export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT o.*, 
        u.first_name, u.last_name, u.email,
        json_agg(jsonb_build_object(
          'id', oi.id,
          'product_name', oi.product_name,
          'color_name', oi.color_name,
          'size', oi.size,
          'quantity', oi.quantity,
          'price', oi.price
        )) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id, u.id
      ORDER BY o.created_at DESC
    `)

    res.json({ success: true, data: result.rows })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get single order
export const getOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const orderResult = await query(`
      SELECT o.*, u.first_name, u.last_name, u.email, u.phone
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
    `, [id])

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }

    const itemsResult = await query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    )

    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows,
    }

    res.json({ success: true, data: order })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Update order status
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { status, payment_status, notes } = req.body

    const result = await query(
      `UPDATE orders 
       SET status = COALESCE($1, status), 
           payment_status = COALESCE($2, payment_status),
           notes = COALESCE($3, notes),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status, payment_status, notes, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Delete order
export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    await query('DELETE FROM orders WHERE id = $1', [id])

    res.json({ success: true, message: 'Order deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

