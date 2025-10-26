import mongoose from 'mongoose'
import Product from './models/product.model'
import Category from './models/category.model'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/lunox_catalog'

const categories = [
  {
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Premium quality oversized and regular fit t-shirts',
    featured: true,
  },
  {
    name: 'Hoodies',
    slug: 'hoodies',
    description: 'Comfortable hoodies for all seasons',
    featured: true,
  },
  {
    name: 'Shirts',
    slug: 'shirts',
    description: 'Stylish casual and formal shirts',
    featured: false,
  },
  {
    name: 'Joggers',
    slug: 'joggers',
    description: 'Comfortable joggers for everyday wear',
    featured: true,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with our accessories',
    featured: false,
  },
]

const products = [
  {
    name: 'White Commitment Oversized T-Shirt',
    slug: 'white-commitment-t-shirt',
    description: 'Lunox White Commitment T-Shirt. Premium 100% cotton with minimal branding. 240 GSM fabric, screen printed. Oversized fit for ultimate comfort.',
    price: 1699,
    compareAtPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=800&fit=crop',
    ],
    category: 't-shirts',
    tags: ['oversized', 'white', 'cotton', 'casual', 'unisex'],
    variants: [
      { size: 'S', color: 'White', sku: 'WCT-WHT-S', stock: 15, price: 1699 },
      { size: 'M', color: 'White', sku: 'WCT-WHT-M', stock: 20, price: 1699 },
      { size: 'L', color: 'White', sku: 'WCT-WHT-L', stock: 25, price: 1699 },
      { size: 'XL', color: 'White', sku: 'WCT-WHT-XL', stock: 20, price: 1699 },
      { size: 'XXL', color: 'White', sku: 'WCT-WHT-XXL', stock: 10, price: 1699 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: true,
    gsm: 240,
    fabric: '100% Premium Cotton',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Cool iron if needed'],
  },
  {
    name: 'Black Essential Oversized T-Shirt',
    slug: 'black-essential-t-shirt',
    description: 'Classic black oversized tee. Essential piece for any wardrobe. Premium cotton, 240 GSM, screen printed design.',
    price: 1699,
    compareAtPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&h=800&fit=crop',
    ],
    category: 't-shirts',
    tags: ['oversized', 'black', 'essential', 'cotton', 'unisex'],
    variants: [
      { size: 'S', color: 'Black', sku: 'BET-BLK-S', stock: 18, price: 1699 },
      { size: 'M', color: 'Black', sku: 'BET-BLK-M', stock: 25, price: 1699 },
      { size: 'L', color: 'Black', sku: 'BET-BLK-L', stock: 30, price: 1699 },
      { size: 'XL', color: 'Black', sku: 'BET-BLK-XL', stock: 22, price: 1699 },
      { size: 'XXL', color: 'Black', sku: 'BET-BLK-XXL', stock: 12, price: 1699 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: true,
    gsm: 240,
    fabric: '100% Premium Cotton',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Cool iron if needed'],
  },
  {
    name: 'Grey Minimalist Oversized Tee',
    slug: 'grey-minimalist-tee',
    description: 'Minimalist grey oversized t-shirt with subtle branding. Perfect for everyday wear. 240 GSM premium cotton.',
    price: 1699,
    compareAtPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=800&fit=crop',
    ],
    category: 't-shirts',
    tags: ['oversized', 'grey', 'minimalist', 'cotton', 'unisex'],
    variants: [
      { size: 'S', color: 'Grey', sku: 'GMT-GRY-S', stock: 12, price: 1699 },
      { size: 'M', color: 'Grey', sku: 'GMT-GRY-M', stock: 20, price: 1699 },
      { size: 'L', color: 'Grey', sku: 'GMT-GRY-L', stock: 25, price: 1699 },
      { size: 'XL', color: 'Grey', sku: 'GMT-GRY-XL', stock: 18, price: 1699 },
      { size: 'XXL', color: 'Grey', sku: 'GMT-GRY-XXL', stock: 10, price: 1699 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Grey'],
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    gsm: 240,
    fabric: '100% Premium Cotton',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Cool iron if needed'],
  },
  {
    name: 'Navy Blue Classic Oversized T-Shirt',
    slug: 'navy-blue-classic-tee',
    description: 'Classic navy blue oversized tee. Versatile and stylish. Premium 240 GSM cotton with screen print.',
    price: 1699,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&h=800&fit=crop',
    ],
    category: 't-shirts',
    tags: ['oversized', 'navy', 'blue', 'cotton', 'unisex'],
    variants: [
      { size: 'S', color: 'Navy Blue', sku: 'NBT-NVY-S', stock: 15, price: 1699 },
      { size: 'M', color: 'Navy Blue', sku: 'NBT-NVY-M', stock: 22, price: 1699 },
      { size: 'L', color: 'Navy Blue', sku: 'NBT-NVY-L', stock: 28, price: 1699 },
      { size: 'XL', color: 'Navy Blue', sku: 'NBT-NVY-XL', stock: 20, price: 1699 },
      { size: 'XXL', color: 'Navy Blue', sku: 'NBT-NVY-XXL', stock: 12, price: 1699 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy Blue'],
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    gsm: 240,
    fabric: '100% Premium Cotton',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Cool iron if needed'],
  },
  {
    name: 'Olive Green Oversized Hoodie',
    slug: 'olive-green-hoodie',
    description: 'Cozy olive green oversized hoodie. Perfect for layering. 320 GSM heavy cotton blend with soft fleece lining.',
    price: 2499,
    compareAtPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691321-d7cfc4bbf6ab?w=800&h=800&fit=crop',
    ],
    category: 'hoodies',
    tags: ['hoodie', 'olive', 'green', 'oversized', 'warm', 'unisex'],
    variants: [
      { size: 'S', color: 'Olive Green', sku: 'OGH-OLV-S', stock: 10, price: 2499 },
      { size: 'M', color: 'Olive Green', sku: 'OGH-OLV-M', stock: 15, price: 2499 },
      { size: 'L', color: 'Olive Green', sku: 'OGH-OLV-L', stock: 20, price: 2499 },
      { size: 'XL', color: 'Olive Green', sku: 'OGH-OLV-XL', stock: 15, price: 2499 },
      { size: 'XXL', color: 'Olive Green', sku: 'OGH-OLV-XXL', stock: 8, price: 2499 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Olive Green'],
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: true,
    gsm: 320,
    fabric: '80% Cotton, 20% Polyester',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Do not iron print'],
  },
  {
    name: 'Black Essential Hoodie',
    slug: 'black-essential-hoodie',
    description: 'Classic black oversized hoodie. Wardrobe essential. Premium 320 GSM cotton blend with fleece interior.',
    price: 2499,
    compareAtPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop',
    ],
    category: 'hoodies',
    tags: ['hoodie', 'black', 'essential', 'oversized', 'warm', 'unisex'],
    variants: [
      { size: 'S', color: 'Black', sku: 'BEH-BLK-S', stock: 12, price: 2499 },
      { size: 'M', color: 'Black', sku: 'BEH-BLK-M', stock: 18, price: 2499 },
      { size: 'L', color: 'Black', sku: 'BEH-BLK-L', stock: 25, price: 2499 },
      { size: 'XL', color: 'Black', sku: 'BEH-BLK-XL', stock: 18, price: 2499 },
      { size: 'XXL', color: 'Black', sku: 'BEH-BLK-XXL', stock: 10, price: 2499 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    gsm: 320,
    fabric: '80% Cotton, 20% Polyester',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Do not iron print'],
  },
  {
    name: 'Charcoal Grey Joggers',
    slug: 'charcoal-grey-joggers',
    description: 'Comfortable charcoal grey joggers. Perfect for athleisure. Premium cotton blend with elastic waistband.',
    price: 1999,
    compareAtPrice: 2999,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612681621975-7bfb8c7d98fe?w=800&h=800&fit=crop',
    ],
    category: 'joggers',
    tags: ['joggers', 'grey', 'comfortable', 'athleisure', 'unisex'],
    variants: [
      { size: 'S', color: 'Charcoal Grey', sku: 'CGJ-GRY-S', stock: 10, price: 1999 },
      { size: 'M', color: 'Charcoal Grey', sku: 'CGJ-GRY-M', stock: 15, price: 1999 },
      { size: 'L', color: 'Charcoal Grey', sku: 'CGJ-GRY-L', stock: 20, price: 1999 },
      { size: 'XL', color: 'Charcoal Grey', sku: 'CGJ-GRY-XL', stock: 15, price: 1999 },
      { size: 'XXL', color: 'Charcoal Grey', sku: 'CGJ-GRY-XXL', stock: 8, price: 1999 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal Grey'],
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    gsm: 280,
    fabric: '70% Cotton, 30% Polyester',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Cool iron if needed'],
  },
  {
    name: 'Black Casual Joggers',
    slug: 'black-casual-joggers',
    description: 'Essential black joggers for everyday comfort. Premium cotton blend with tapered fit.',
    price: 1999,
    compareAtPrice: 2999,
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=800&fit=crop',
    ],
    category: 'joggers',
    tags: ['joggers', 'black', 'casual', 'comfortable', 'unisex'],
    variants: [
      { size: 'S', color: 'Black', sku: 'BCJ-BLK-S', stock: 12, price: 1999 },
      { size: 'M', color: 'Black', sku: 'BCJ-BLK-M', stock: 18, price: 1999 },
      { size: 'L', color: 'Black', sku: 'BCJ-BLK-L', stock: 22, price: 1999 },
      { size: 'XL', color: 'Black', sku: 'BCJ-BLK-XL', stock: 16, price: 1999 },
      { size: 'XXL', color: 'Black', sku: 'BCJ-BLK-XXL', stock: 10, price: 1999 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    gsm: 280,
    fabric: '70% Cotton, 30% Polyester',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Cool iron if needed'],
  },
]

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...')
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Category.deleteMany({})
    await Product.deleteMany({})
    console.log('✅ Existing data cleared')

    // Seed categories
    console.log('📁 Seeding categories...')
    const createdCategories = await Category.insertMany(categories)
    console.log(`✅ ${createdCategories.length} categories created`)

    // Seed products
    console.log('📦 Seeding products...')
    const createdProducts = await Product.insertMany(products)
    console.log(`✅ ${createdProducts.length} products created`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\nSummary:')
    console.log(`- Categories: ${createdCategories.length}`)
    console.log(`- Products: ${createdProducts.length}`)
    console.log(`- Total variants: ${products.reduce((sum, p) => sum + p.variants.length, 0)}`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run seed function
seedDatabase()

