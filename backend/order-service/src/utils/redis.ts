import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
})

export const initRedis = async () => {
  try {
    await redisClient.connect()
    console.log('Connected to Redis successfully')
  } catch (error) {
    console.error('Redis connection error:', error)
    throw error
  }
}

redisClient.on('error', (error) => {
  console.error('Redis error:', error)
})

redisClient.on('disconnect', () => {
  console.log('Redis disconnected')
})

export default redisClient


