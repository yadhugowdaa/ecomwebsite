import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { query } from '../db/init'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AuthRequest extends Request {
  user?: {
    userId: number
    email: string
    role: string
  }
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string }

    const result = await query('SELECT id, email, role FROM users WHERE id = $1', [decoded.userId])

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' })
    }

    const user = result.rows[0]

    if (user.role !== 'admin' && user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' })
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

