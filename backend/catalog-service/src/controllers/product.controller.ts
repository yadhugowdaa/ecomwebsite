import { Request, Response, NextFunction } from 'express'
import Product from '../models/product.model'
import slugify from 'slugify'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      category,
      subcategory,
      minPrice,
      maxPrice,
      sizes,
      colors,
      tags,
      inStock,
      sort = 'createdAt',
      page = 1,
      limit = 20,
    } = req.query

    const query: any = {}

    if (category) query.category = category
    if (subcategory) query.subcategory = subcategory
    if (inStock === 'true') query.inStock = true
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    if (sizes) query.sizes = { $in: Array.isArray(sizes) ? sizes : [sizes] }
    if (colors) query.colors = { $in: Array.isArray(colors) ? colors : [colors] }
    if (tags) query.tags = { $in: Array.isArray(tags) ? tags : [tags] }

    const sortOptions: any = {}
    switch (sort) {
      case 'price-asc':
        sortOptions.price = 1
        break
      case 'price-desc':
        sortOptions.price = -1
        break
      case 'newest':
        sortOptions.createdAt = -1
        break
      default:
        sortOptions.createdAt = -1
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOptions).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ])

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, page = 1, limit = 20 } = req.query

    if (!q) {
      return res.status(400).json({ error: 'Search query required' })
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [products, total] = await Promise.all([
      Product.find({ $text: { $search: q as string } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments({ $text: { $search: q as string } }),
    ])

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getFeaturedProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({ featured: true }).limit(8)
    res.json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}

export const getBestsellers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({ bestseller: true }).limit(8)
    res.json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}

export const getNewArrivals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({ newArrival: true }).sort({ createdAt: -1 }).limit(8)
    res.json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const product = await Product.findOne({ slug })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body
    productData.slug = slugify(productData.name, { lower: true, strict: true })

    const product = new Product(productData)
    await product.save()

    res.status(201).json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updateData = req.body

    if (updateData.name) {
      updateData.slug = slugify(updateData.name, { lower: true, strict: true })
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    next(error)
  }
}


