import { Response } from 'express'
import { AuthRequest } from '../middleware/admin.middleware'
import { query } from '../db/init'

// Get all products
export const getAllProducts = async (req: AuthRequest, res: Response) => {
  try {
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
          'color_id', pi.color_id,
          'is_primary', pi.is_primary,
          'order_index', pi.order_index
        )) FILTER (WHERE pi.id IS NOT NULL) as images
      FROM products p
      LEFT JOIN product_colors pc ON p.id = pc.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `)

    res.json({ success: true, data: result.rows })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get single product
export const getProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const productResult = await query('SELECT * FROM products WHERE id = $1', [id])

    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const colorsResult = await query(
      'SELECT * FROM product_colors WHERE product_id = $1',
      [id]
    )

    const imagesResult = await query(
      'SELECT * FROM product_images WHERE product_id = $1 ORDER BY order_index',
      [id]
    )

    const sizesResult = await query(
      'SELECT * FROM product_sizes WHERE product_id = $1',
      [id]
    )

    const product = {
      ...productResult.rows[0],
      colors: colorsResult.rows,
      images: imagesResult.rows,
      sizes: sizesResult.rows,
    }

    res.json({ success: true, data: product })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Create product
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, description, price, category, collection, stock, colors, images, sizes } = req.body

    // Create product
    const productResult = await query(
      `INSERT INTO products (name, slug, description, price, category, collection, stock, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
       RETURNING *`,
      [name, slug, description, price, category, collection, stock || 0]
    )

    const product = productResult.rows[0]

    // Add colors if provided
    if (colors && colors.length > 0) {
      for (const color of colors) {
        await query(
          'INSERT INTO product_colors (product_id, color_name, color_code, stock) VALUES ($1, $2, $3, $4)',
          [product.id, color.color_name, color.color_code, color.stock || 0]
        )
      }
    }

    // Add images if provided
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await query(
          'INSERT INTO product_images (product_id, color_id, image_url, is_primary, order_index) VALUES ($1, $2, $3, $4, $5)',
          [product.id, images[i].color_id || null, images[i].image_url, images[i].is_primary || false, i]
        )
      }
    }

    // Add sizes if provided
    if (sizes && sizes.length > 0) {
      for (const size of sizes) {
        await query(
          'INSERT INTO product_sizes (product_id, color_id, size, stock) VALUES ($1, $2, $3, $4)',
          [product.id, size.color_id || null, size.size, size.stock || 0]
        )
      }
    }

    res.status(201).json({ success: true, data: product })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Update product
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { name, slug, description, price, category, collection, stock, is_active } = req.body

    const result = await query(
      `UPDATE products 
       SET name = $1, slug = $2, description = $3, price = $4, 
           category = $5, collection = $6, stock = $7, is_active = $8, updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [name, slug, description, price, category, collection, stock, is_active, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Delete product
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ success: true, message: 'Product deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Add color to product
export const addProductColor = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params
    const { color_name, color_code, stock } = req.body

    const result = await query(
      'INSERT INTO product_colors (product_id, color_name, color_code, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [productId, color_name, color_code, stock || 0]
    )

    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Delete color
export const deleteProductColor = async (req: AuthRequest, res: Response) => {
  try {
    const { colorId } = req.params

    await query('DELETE FROM product_colors WHERE id = $1', [colorId])

    res.json({ success: true, message: 'Color deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Add image to product
export const addProductImage = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params
    const { image_url, color_id, is_primary, order_index } = req.body

    const result = await query(
      'INSERT INTO product_images (product_id, color_id, image_url, is_primary, order_index) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [productId, color_id || null, image_url, is_primary || false, order_index || 0]
    )

    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Delete image
export const deleteProductImage = async (req: AuthRequest, res: Response) => {
  try {
    const { imageId } = req.params

    await query('DELETE FROM product_images WHERE id = $1', [imageId])

    res.json({ success: true, message: 'Image deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get dashboard stats
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const productsCount = await query('SELECT COUNT(*) as count FROM products')
    const ordersCount = await query('SELECT COUNT(*) as count FROM orders')
    const usersCount = await query('SELECT COUNT(*) as count FROM users WHERE role = $1', ['customer'])
    const totalRevenue = await query('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE payment_status = $1', ['completed'])

    const recentOrders = await query(`
      SELECT o.*, u.first_name, u.last_name, u.email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `)

    const lowStockProducts = await query(`
      SELECT * FROM products WHERE stock < 10 ORDER BY stock ASC LIMIT 10
    `)

    res.json({
      success: true,
      data: {
        stats: {
          products: productsCount.rows[0].count,
          orders: ordersCount.rows[0].count,
          customers: usersCount.rows[0].count,
          revenue: parseFloat(totalRevenue.rows[0].total),
        },
        recentOrders: recentOrders.rows,
        lowStockProducts: lowStockProducts.rows,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

