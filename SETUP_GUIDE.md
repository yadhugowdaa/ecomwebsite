# Lunox E-Commerce - Complete Setup Guide

This guide will walk you through setting up the Lunox E-Commerce platform from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (v9 or higher)
   - Comes with Node.js
   - Verify: `npm --version`

3. **Docker** (v20 or higher)
   - Download from: https://www.docker.com/get-started
   - Verify: `docker --version`

4. **Docker Compose** (v2 or higher)
   - Usually comes with Docker Desktop
   - Verify: `docker-compose --version`

## Quick Start with Docker (Recommended)

### Step 1: Clone and Setup

```bash
# Navigate to your project directory
cd "C:\Users\Yadhu Gowda\website 2"

# Copy environment variables
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit the `.env` file with your preferred text editor:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CATALOG_API_URL=http://localhost:4001
NEXT_PUBLIC_ORDER_API_URL=http://localhost:4002

# Database Passwords (Change these!)
POSTGRES_PASSWORD=change_this_secure_password
JWT_SECRET=change_this_super_secret_jwt_key
```

### Step 3: Start All Services

```bash
# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### Step 4: Initialize Databases

The databases will be automatically initialized when services start. Wait about 30 seconds for all services to be ready.

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **User Service API**: http://localhost:4000/health
- **Catalog Service API**: http://localhost:4001/health
- **Order Service API**: http://localhost:4002/health

## Manual Setup (Without Docker)

### Step 1: Install Databases

#### PostgreSQL
```bash
# Windows: Download from https://www.postgresql.org/download/windows/
# Create database
psql -U postgres
CREATE DATABASE lunox_users;
\q
```

#### MongoDB
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# MongoDB will create the database automatically
```

#### Redis
```bash
# Windows: Download from https://github.com/tporadowski/redis/releases
# Or use Docker:
docker run -d -p 6379:6379 redis:7-alpine
```

### Step 2: Setup Frontend

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with local database connections
# NEXT_PUBLIC_API_URL=http://localhost:4000
# etc.

# Run development server
npm run dev
```

Frontend will be available at http://localhost:3000

### Step 3: Setup User Service

```bash
cd backend/user-service

# Install dependencies
npm install

# The service will create tables automatically on first run
npm run dev
```

User Service will be available at http://localhost:4000

### Step 4: Setup Catalog Service

```bash
cd backend/catalog-service

# Install dependencies
npm install

# Run development server
npm run dev
```

Catalog Service will be available at http://localhost:4001

### Step 5: Setup Order Service

```bash
cd backend/order-service

# Install dependencies
npm install

# Run development server
npm run dev
```

Order Service will be available at http://localhost:4002

## Seeding Data

### Add Sample Products

1. Create a file `backend/catalog-service/src/db/seed.ts`:

```typescript
import mongoose from 'mongoose'
import Product from '../models/product.model'
import Category from '../models/category.model'
import { connectDB } from './connection'

const seedData = async () => {
  await connectDB()

  // Clear existing data
  await Product.deleteMany({})
  await Category.deleteMany({})

  // Create categories
  const categories = [
    { name: 'T-Shirts', slug: 't-shirts', description: 'Comfortable and stylish t-shirts', featured: true },
    { name: 'Hoodies', slug: 'hoodies', description: 'Warm and cozy hoodies', featured: true },
    { name: 'Shirts', slug: 'shirts', description: 'Casual and formal shirts', featured: false },
  ]

  await Category.insertMany(categories)

  // Create sample products
  const products = [
    {
      name: 'Black Oversized T-Shirt',
      slug: 'black-oversized-tshirt',
      description: 'Premium cotton oversized tee with a relaxed fit',
      price: 1299,
      compareAtPrice: 1999,
      images: ['/images/products/black-tshirt.jpg'],
      category: 't-shirts',
      tags: ['oversized', 'black', 'cotton'],
      variants: [
        { size: 'M', color: 'Black', sku: 'BLK-TSH-M', stock: 50 },
        { size: 'L', color: 'Black', sku: 'BLK-TSH-L', stock: 50 },
        { size: 'XL', color: 'Black', sku: 'BLK-TSH-XL', stock: 50 },
      ],
      sizes: ['M', 'L', 'XL'],
      colors: ['Black'],
      inStock: true,
      featured: true,
      bestseller: true,
      newArrival: true,
      gsm: 220,
      fabric: '100% Cotton',
      care: ['Machine wash cold', 'Tumble dry low'],
    },
    // Add more products...
  ]

  await Product.insertMany(products)

  console.log('Database seeded successfully!')
  process.exit(0)
}

seedData()
```

2. Run the seed script:

```bash
cd backend/catalog-service
npm run seed
```

## Testing the Setup

### 1. Test Health Endpoints

```bash
# Test User Service
curl http://localhost:4000/health

# Test Catalog Service
curl http://localhost:4001/health

# Test Order Service
curl http://localhost:4002/health
```

### 2. Test User Registration

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234",
    "firstName": "Test",
    "lastName": "User",
    "phone": "9876543210"
  }'
```

### 3. Test Product Listing

```bash
curl http://localhost:4001/api/products
```

## Common Issues and Solutions

### Issue 1: Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change the port
# In package.json: "dev": "next dev -p 3001"
```

### Issue 2: Docker Containers Not Starting

**Error**: `Container exited with code 1`

**Solution**:
```bash
# Check logs
docker-compose logs <service-name>

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Issue 3: Database Connection Failed

**Error**: `ECONNREFUSED` or connection errors

**Solution**:
- Ensure databases are running
- Check environment variables
- Verify database credentials
- Check if ports are not blocked by firewall

### Issue 4: Module Not Found

**Error**: `Cannot find module '@/...'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

### Making Changes

1. **Frontend Changes**: Edit files in `src/`, hot reload will update automatically
2. **Backend Changes**: Services will auto-restart with `ts-node-dev`
3. **Database Changes**: Update schema files and restart services

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f user-service
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes data!)
docker-compose down -v
```

## Production Deployment

### Build for Production

```bash
# Frontend
npm run build

# Backend services
cd backend/user-service && npm run build
cd backend/catalog-service && npm run build
cd backend/order-service && npm run build
```

### Environment Variables for Production

Update `.env` for production:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
JWT_SECRET=<generate-strong-secret>
POSTGRES_PASSWORD=<strong-password>
```

### Deployment Checklist

- [ ] Change all default passwords
- [ ] Set strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Configure monitoring
- [ ] Set up logging
- [ ] Enable rate limiting
- [ ] Configure CDN for static assets

## Next Steps

1. ✅ Setup completed
2. 📝 Add sample data using seed scripts
3. 🎨 Customize branding (colors, logo, etc.)
4. 🖼️ Add product images
5. 💳 Integrate payment gateway
6. 📧 Configure email service
7. 🚀 Deploy to production

## Support

If you encounter any issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Ensure all ports are available
4. Check database connections
5. Consult the main README.md

Happy coding! 🎉


