import { Request, Response, NextFunction } from 'express'
import Category from '../models/category.model'
import Product from '../models/product.model'
import slugify from 'slugify'

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find().sort({ name: 1 })

    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ category: category.slug })
        return {
          ...category.toObject(),
          productCount,
        }
      })
    )

    res.json({ success: true, data: categoriesWithCount })
  } catch (error) {
    next(error)
  }
}

export const getFeaturedCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find({ featured: true }).sort({ name: 1 })
    res.json({ success: true, data: categories })
  } catch (error) {
    next(error)
  }
}

export const getCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await Category.findOne({ slug })

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const productCount = await Product.countDocuments({ category: slug })

    res.json({
      success: true,
      data: {
        ...category.toObject(),
        productCount,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryData = req.body
    categoryData.slug = slugify(categoryData.name, { lower: true, strict: true })

    const category = new Category(categoryData)
    await category.save()

    res.status(201).json({ success: true, data: category })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updateData = req.body

    if (updateData.name) {
      updateData.slug = slugify(updateData.name, { lower: true, strict: true })
    }

    const category = await Category.findByIdAndUpdate(id, updateData, { new: true })

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.json({ success: true, data: category })
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const category = await Category.findByIdAndDelete(id)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.json({ success: true, message: 'Category deleted successfully' })
  } catch (error) {
    next(error)
  }
}


