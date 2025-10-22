import { Router } from 'express'
import * as productController from '../controllers/product.controller'

const router = Router()

router.get('/', productController.getProducts)
router.get('/search', productController.searchProducts)
router.get('/featured', productController.getFeaturedProducts)
router.get('/bestsellers', productController.getBestsellers)
router.get('/new-arrivals', productController.getNewArrivals)
router.get('/:slug', productController.getProductBySlug)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router


