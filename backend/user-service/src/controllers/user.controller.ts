import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../db/init'

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId

    const result = await query(
      'SELECT id, email, first_name, last_name, phone, avatar, created_at FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = result.rows[0]

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        avatar: user.avatar,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId
    const { firstName, lastName, phone } = req.body

    const result = await query(
      `UPDATE users 
       SET first_name = $1, last_name = $2, phone = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 
       RETURNING id, email, first_name, last_name, phone, avatar`,
      [firstName, lastName, phone, userId]
    )

    const user = result.rows[0]

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId
    const { currentPassword, newPassword } = req.body

    // Get current password
    const result = await query('SELECT password FROM users WHERE id = $1', [userId])
    const user = result.rows[0]

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return res.status(400).json({ error: 'Current password is incorrect' })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await query('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
      hashedPassword,
      userId,
    ])

    res.json({ success: true, message: 'Password changed successfully' })
  } catch (error) {
    next(error)
  }
}


