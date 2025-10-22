import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  description: string
  image?: string
  parentCategory?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    image: { type: String },
    parentCategory: { type: String },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ICategory>('Category', CategorySchema)


