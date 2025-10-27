import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../db/init'

// Create initial admin user
export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const email = 'yadhumrgowda9@gmail.com'
    const password = 'Admin@123' // Default password
    const firstName = 'Yadhu'
    const lastName = 'Gowda'
    const phone = '9876543210'

    // Check if user already exists
    const existingUser = await query('SELECT * FROM users WHERE email = $1', [email])
    
    if (existingUser.rows.length > 0) {
      // Update existing user to admin
      await query('UPDATE users SET role = $1 WHERE email = $2', ['admin', email])
      return res.json({ 
        success: true, 
        message: 'User updated to admin',
        credentials: { email, password: 'Admin@123' }
      })
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash(password, 10)

    await query(
      `INSERT INTO users (email, password, first_name, last_name, phone, role)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [email, hashedPassword, firstName, lastName, phone, 'admin']
    )

    res.json({ 
      success: true, 
      message: 'Admin user created successfully',
      credentials: {
        email: 'yadhumrgowda9@gmail.com',
        password: 'Admin@123'
      }
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

