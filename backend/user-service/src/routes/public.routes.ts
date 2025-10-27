import { Router } from 'express'
import * as publicProductController from '../controllers/public.product.controller'

const router = Router()

// Public product routes (no authentication required)
router.get('/products', publicProductController.getAllProducts)
router.get('/products/slug/:slug', publicProductController.getProductBySlug)

export default router

