import { Request, Response } from 'express'
import { query } from '../db/init'

// Get all active products (public)
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, collection, limit } = req.query

    let sql = `
      SELECT p.*, 
        json_agg(DISTINCT jsonb_build_object(
          'id', pc.id,
          'color_name', pc.color_name,
          'color_code', pc.color_code,
          'stock', pc.stock
        )) FILTER (WHERE pc.id IS NOT NULL) as colors,
        json_agg(DISTINCT jsonb_build_object(
          'id', pi.id,
          'image_url', pi.image_url,
          'is_primary', pi.is_primary
        )) FILTER (WHERE pi.id IS NOT NULL) as images,
        json_agg(DISTINCT jsonb_build_object(
          'size', ps.size,
          'stock', ps.stock
        )) FILTER (WHERE ps.id IS NOT NULL) as sizes
      FROM products p
      LEFT JOIN product_colors pc ON p.id = pc.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN product_sizes ps ON p.id = ps.product_id
      WHERE p.is_active = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (category) {
      sql += ` AND p.category = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (collection) {
      sql += ` AND p.collection = $${paramIndex}`
      params.push(collection)
      paramIndex++
    }

    sql += ` GROUP BY p.id ORDER BY p.created_at DESC`

    if (limit) {
      sql += ` LIMIT $${paramIndex}`
      params.push(parseInt(limit as string))
    }

    const result = await query(sql, params)

    // Transform to match frontend format
    const products = result.rows.map(product => ({
      _id: product.id.toString(),
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: parseFloat(product.price),
      category: product.category,
      collection: product.collection,
      stock: product.stock,
      images: product.images?.map((img: any) => img.image_url).filter(Boolean) || [],
      colors: product.colors?.filter((c: any) => c.id) || [],
      sizes: product.sizes?.map((s: any) => s.size).filter(Boolean) || [],
      inStock: product.stock > 0,
    }))

    res.json({ success: true, data: products })
  } catch (error: any) {
    console.error('Error fetching products:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}

// Get product by slug (public)
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params

    const result = await query(`
      SELECT p.*, 
        json_agg(DISTINCT jsonb_build_object(
          'id', pc.id,
          'color_name', pc.color_name,
          'color_code', pc.color_code,
          'stock', pc.stock
        )) FILTER (WHERE pc.id IS NOT NULL) as colors,
        json_agg(DISTINCT jsonb_build_object(
          'id', pi.id,
          'image_url', pi.image_url,
          'is_primary', pi.is_primary,
          'order_index', pi.order_index
        )) FILTER (WHERE pi.id IS NOT NULL) as images,
        json_agg(DISTINCT jsonb_build_object(
          'size', ps.size,
          'stock', ps.stock
        )) FILTER (WHERE ps.id IS NOT NULL) as sizes
      FROM products p
      LEFT JOIN product_colors pc ON p.id = pc.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN product_sizes ps ON p.id = ps.product_id
      WHERE p.slug = $1 AND p.is_active = true
      GROUP BY p.id
    `, [slug])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' })
    }

    const product = result.rows[0]
    
    // Sort images by order_index
    const sortedImages = (product.images || [])
      .filter((img: any) => img.id)
      .sort((a: any, b: any) => a.order_index - b.order_index)
      .map((img: any) => img.image_url)

    const transformedProduct = {
      _id: product.id.toString(),
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: parseFloat(product.price),
      category: product.category,
      collection: product.collection,
      stock: product.stock,
      images: sortedImages,
      colors: product.colors?.filter((c: any) => c.id) || [],
      sizes: product.sizes?.map((s: any) => s.size).filter(Boolean) || [],
      inStock: product.stock > 0,
    }

    res.json({ success: true, data: transformedProduct })
  } catch (error: any) {
    console.error('Error fetching product:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}

