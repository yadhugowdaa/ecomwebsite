import mongoose, { Schema, Document } from 'mongoose'

export interface IProductVariant {
  size: string
  color: string
  sku: string
  stock: number
  price?: number
}

export interface IProduct extends Document {
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  subcategory?: string
  tags: string[]
  variants: IProductVariant[]
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  bestseller: boolean
  newArrival: boolean
  gsm?: number
  fabric?: string
  care?: string[]
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    images: [{ type: String }],
    category: { type: String, required: true, index: true },
    subcategory: { type: String, index: true },
    tags: [{ type: String, index: true }],
    variants: [
      {
        size: { type: String, required: true },
        color: { type: String, required: true },
        sku: { type: String, required: true, unique: true },
        stock: { type: Number, required: true, min: 0 },
        price: { type: Number, min: 0 },
      },
    ],
    sizes: [{ type: String }],
    colors: [{ type: String }],
    inStock: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false, index: true },
    bestseller: { type: Boolean, default: false, index: true },
    newArrival: { type: Boolean, default: false, index: true },
    gsm: { type: Number },
    fabric: { type: String },
    care: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' })
ProductSchema.index({ price: 1 })
ProductSchema.index({ category: 1, subcategory: 1 })

export default mongoose.model<IProduct>('Product', ProductSchema)


