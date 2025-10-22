import { Request, Response, NextFunction } from 'express'
import Review from '../models/review.model'

export const getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params
    const { page = 1, limit = 10 } = req.query

    const skip = (Number(page) - 1) * Number(limit)

    const [reviews, total] = await Promise.all([
      Review.find({ productId }).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Review.countDocuments({ productId }),
    ])

    // Calculate average rating
    const ratingStats = await Review.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ])

    res.json({
      success: true,
      data: reviews,
      stats: ratingStats[0] || { averageRating: 0, totalReviews: 0 },
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

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewData = req.body
    const review = new Review(reviewData)
    await review.save()

    res.status(201).json({ success: true, data: review })
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'You have already reviewed this product' })
    }
    next(error)
  }
}

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const review = await Review.findByIdAndUpdate(id, updateData, { new: true })

    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    res.json({ success: true, data: review })
  } catch (error) {
    next(error)
  }
}

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const review = await Review.findByIdAndDelete(id)

    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    res.json({ success: true, message: 'Review deleted successfully' })
  } catch (error) {
    next(error)
  }
}


