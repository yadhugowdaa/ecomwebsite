import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

export default mongoose.model<IReview>('Review', ReviewSchema)


