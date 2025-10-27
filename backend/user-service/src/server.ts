import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import addressRoutes from './routes/address.routes'
import adminRoutes from './routes/admin.routes'
import publicRoutes from './routes/public.routes'
import { errorHandler } from './middleware/error.middleware'
import { initDatabase } from './db/init'

dotenv.config()

const app = express()
const PORT = process.env.USER_SERVICE_PORT || 4000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' })
})

// Admin setup endpoint (one-time use)
import { createAdminUser } from './controllers/admin.setup.controller'
app.post('/api/setup-admin', createAdminUser)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/addresses', addressRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/public', publicRoutes)

// Error handler
app.use(errorHandler)

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase()
    app.listen(PORT, () => {
      console.log(`User Service running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()


