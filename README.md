# Lunox E-Commerce Platform

A complete, modern e-commerce platform built with Next.js, TypeScript, and microservices architecture. Inspired by premium streetwear brands, Lunox offers a seamless shopping experience with robust backend services.

## 🏗️ Architecture

### Technology Stack

#### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Animations**: Framer Motion

#### Backend Microservices
- **Language**: Node.js with TypeScript
- **Framework**: Express.js
- **Architecture**: Microservices

#### Databases & Storage
- **PostgreSQL**: User data, orders, payments, addresses
- **MongoDB**: Product catalog, categories, reviews
- **Redis**: Session management, cart storage, caching

#### Development Tools
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm

## 📁 Project Structure

```
lunox-ecommerce/
├── src/                          # Frontend Next.js application
│   ├── app/                      # App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home page
│   │   ├── cart/                # Cart page
│   │   ├── checkout/            # Checkout page
│   │   ├── collections/         # Collection pages
│   │   └── products/            # Product pages
│   ├── components/               # React components
│   │   ├── layout/              # Layout components
│   │   ├── home/                # Home page components
│   │   ├── products/            # Product components
│   │   └── collections/         # Collection components
│   ├── store/                    # Zustand stores
│   ├── types/                    # TypeScript types
│   ├── hooks/                    # Custom React hooks
│   └── utils/                    # Utility functions
├── backend/                      # Backend microservices
│   ├── user-service/            # User authentication & management
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── validators/
│   │   │   └── db/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── catalog-service/         # Product catalog & search
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── models/
│   │   │   └── db/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── order-service/           # Order & payment processing
│       ├── src/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── utils/
│       │   └── db/
│       ├── Dockerfile
│       └── package.json
├── docker-compose.yml            # Docker Compose configuration
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **Docker**: v20 or higher
- **Docker Compose**: v2 or higher
- **npm**: v9 or higher

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lunox-ecommerce
```

2. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CATALOG_API_URL=http://localhost:4001
NEXT_PUBLIC_ORDER_API_URL=http://localhost:4002

# User Service
JWT_SECRET=your_super_secret_jwt_key_here
POSTGRES_PASSWORD=your_secure_password

# Payment (Add your gateway credentials)
PAYMENT_GATEWAY_KEY=your_payment_key
PAYMENT_GATEWAY_SECRET=your_payment_secret
```

3. **Start the entire stack with Docker Compose**
```bash
docker-compose up -d
```

This will start:
- PostgreSQL (port 5432)
- MongoDB (port 27017)
- Redis (port 6379)
- User Service (port 4000)
- Catalog Service (port 4001)
- Order Service (port 4002)
- Frontend (port 3000)

4. **Access the application**
- Frontend: http://localhost:3000
- User Service API: http://localhost:4000
- Catalog Service API: http://localhost:4001
- Order Service API: http://localhost:4002

### Development Setup (Without Docker)

#### Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

#### Backend Services

For each service (user-service, catalog-service, order-service):

```bash
cd backend/<service-name>

# Install dependencies
npm install

# Run development server
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start
```

## 📡 API Documentation

### User Service (Port 4000)

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

#### User Management
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)
- `PUT /api/users/change-password` - Change password (requires auth)

#### Addresses
- `GET /api/addresses` - Get user addresses (requires auth)
- `POST /api/addresses` - Create new address (requires auth)
- `PUT /api/addresses/:id` - Update address (requires auth)
- `DELETE /api/addresses/:id` - Delete address (requires auth)
- `PUT /api/addresses/:id/default` - Set default address (requires auth)

### Catalog Service (Port 4001)

#### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/search` - Search products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/bestsellers` - Get bestsellers
- `GET /api/products/new-arrivals` - Get new arrivals
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

#### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/featured` - Get featured categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

#### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review (requires auth)
- `PUT /api/reviews/:id` - Update review (requires auth)
- `DELETE /api/reviews/:id` - Delete review (requires auth)

### Order Service (Port 4002)

#### Orders
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders/user/:userId` - Get user orders (requires auth)
- `GET /api/orders/:orderNumber` - Get order by number (requires auth)
- `PUT /api/orders/:id/status` - Update order status (admin)
- `PUT /api/orders/:id/tracking` - Update tracking number (admin)
- `DELETE /api/orders/:id` - Cancel order (requires auth)

#### Payments
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Payment gateway webhook

## 🗄️ Database Schemas

### PostgreSQL (Users & Orders)

#### Users Table
```sql
users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar VARCHAR(500),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

#### Addresses Table
```sql
addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

#### Orders Table
```sql
orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50) NOT NULL,
  payment_id VARCHAR(255),
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### MongoDB (Catalog)

#### Products Collection
```javascript
{
  name: String,
  slug: String (unique, indexed),
  description: String,
  price: Number,
  compareAtPrice: Number,
  images: [String],
  category: String (indexed),
  subcategory: String (indexed),
  tags: [String] (indexed),
  variants: [{
    size: String,
    color: String,
    sku: String (unique),
    stock: Number,
    price: Number
  }],
  sizes: [String],
  colors: [String],
  inStock: Boolean (indexed),
  featured: Boolean (indexed),
  bestseller: Boolean (indexed),
  newArrival: Boolean (indexed),
  gsm: Number,
  fabric: String,
  care: [String],
  createdAt: Date,
  updatedAt: Date
}
```

#### Categories Collection
```javascript
{
  name: String (unique),
  slug: String (unique),
  description: String,
  image: String,
  parentCategory: String,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Reviews Collection
```javascript
{
  productId: String (indexed),
  userId: String,
  userName: String,
  rating: Number (1-5),
  title: String,
  comment: String,
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CATALOG_API_URL=http://localhost:4001
NEXT_PUBLIC_ORDER_API_URL=http://localhost:4002

# User Service
USER_SERVICE_PORT=4000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=lunox_users
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
REDIS_HOST=localhost
REDIS_PORT=6379

# Catalog Service
CATALOG_SERVICE_PORT=4001
MONGODB_URI=mongodb://localhost:27017/lunox_catalog
MONGODB_DB=lunox_catalog

# Order Service
ORDER_SERVICE_PORT=4002
PAYMENT_GATEWAY_KEY=your_payment_gateway_key
PAYMENT_GATEWAY_SECRET=your_payment_gateway_secret

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_password

# General
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 🛠️ Development

### Adding New Features

1. **Frontend**: Add pages in `src/app/` and components in `src/components/`
2. **Backend**: Add routes and controllers in respective services
3. **Database**: Update models/schemas as needed

### Code Structure

- Follow TypeScript best practices
- Use functional components with hooks in React
- Implement proper error handling
- Add input validation
- Write clean, maintainable code

## 📦 Deployment

### Production Build

```bash
# Frontend
npm run build
npm start

# Backend Services
cd backend/<service-name>
npm run build
npm start
```

### Docker Production

```bash
# Build all services
docker-compose build

# Start in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Helmet for security headers
- Input validation with Joi
- Environment variable protection
- SQL injection prevention
- XSS protection

## 🎨 Features

### Frontend
- ✅ Responsive design
- ✅ Product catalog with filters
- ✅ Product search
- ✅ Shopping cart
- ✅ Checkout process
- ✅ User authentication
- ✅ User profile management
- ✅ Order history
- ✅ Address management

### Backend
- ✅ User authentication & authorization
- ✅ Product management
- ✅ Category management
- ✅ Order processing
- ✅ Payment integration (placeholder)
- ✅ Review system
- ✅ Session management with Redis
- ✅ Microservices architecture

## 🚧 Roadmap

- [ ] Admin dashboard
- [ ] Product recommendations
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Image upload and CDN
- [ ] Advanced search with Elasticsearch
- [ ] Real-time notifications
- [ ] Mobile app (React Native)

## 📝 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For any questions or contributions, please contact the project maintainer.

## 📧 Support

For support, email support@lunox.com or open an issue in the repository.

---

**Built with ❤️ for Premium Streetwear**


