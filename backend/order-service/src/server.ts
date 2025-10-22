import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import orderRoutes from './routes/order.routes'
import paymentRoutes from './routes/payment.routes'
import { errorHandler } from './middleware/error.middleware'
import { initDatabase } from './db/init'
import { initRedis } from './utils/redis'

dotenv.config()

const app = express()
const PORT = process.env.ORDER_SERVICE_PORT || 4002

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
  res.json({ status: 'ok', service: 'order-service' })
})

// Routes
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)

// Error handler
app.use(errorHandler)

// Initialize database, Redis, and start server
const startServer = async () => {
  try {
    await initDatabase()
    await initRedis()
    app.listen(PORT, () => {
      console.log(`Order Service running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()


