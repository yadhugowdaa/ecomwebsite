import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lunox_catalog'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error)
})


