import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productRoutes from './routes/product.routes'
import categoryRoutes from './routes/category.routes'
import reviewRoutes from './routes/review.routes'
import { errorHandler } from './middleware/error.middleware'
import { connectDB } from './db/connection'

dotenv.config()

const app = express()
const PORT = process.env.CATALOG_SERVICE_PORT || 4001

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
  res.json({ status: 'ok', service: 'catalog-service' })
})

// Routes
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/reviews', reviewRoutes)

// Error handler
app.use(errorHandler)

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Catalog Service running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()


