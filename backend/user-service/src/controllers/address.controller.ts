import { Request, Response, NextFunction } from 'express'
import { query } from '../db/init'

export const getAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId

    const result = await query(
      'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC',
      [userId]
    )

    res.json({ success: true, data: result.rows })
  } catch (error) {
    next(error)
  }
}

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId
    const {
      firstName,
      lastName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = req.body

    // If this is the default address, unset other defaults
    if (isDefault) {
      await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [userId])
    }

    const result = await query(
      `INSERT INTO addresses (
        user_id, first_name, last_name, phone, address_line1, address_line2,
        city, state, pincode, country, is_default
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        userId,
        firstName,
        lastName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
        isDefault || false,
      ]
    )

    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId
    const { id } = req.params
    const {
      firstName,
      lastName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = req.body

    // If this is the default address, unset other defaults
    if (isDefault) {
      await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [userId])
    }

    const result = await query(
      `UPDATE addresses SET 
        first_name = $1, last_name = $2, phone = $3, address_line1 = $4,
        address_line2 = $5, city = $6, state = $7, pincode = $8,
        country = $9, is_default = $10, updated_at = CURRENT_TIMESTAMP
      WHERE id = $11 AND user_id = $12 RETURNING *`,
      [
        firstName,
        lastName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
        isDefault,
        id,
        userId,
      ]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Address not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId
    const { id } = req.params

    const result = await query('DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING *', [
      id,
      userId,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Address not found' })
    }

    res.json({ success: true, message: 'Address deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const setDefaultAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId
    const { id } = req.params

    // Unset all default addresses
    await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [userId])

    // Set new default
    const result = await query(
      'UPDATE addresses SET is_default = TRUE WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Address not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}


