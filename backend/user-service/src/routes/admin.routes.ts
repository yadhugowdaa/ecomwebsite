import { Router } from 'express'
import { isAdmin } from '../middleware/admin.middleware'
import * as productController from '../controllers/admin.product.controller'
import * as orderController from '../controllers/admin.order.controller'
import * as contentController from '../controllers/admin.content.controller'

const router = Router()

// Apply admin middleware to all routes
router.use(isAdmin)

// Dashboard
router.get('/dashboard/stats', productController.getDashboardStats)

// Product routes
router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getProduct)
router.post('/products', productController.createProduct)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)

// Product color routes
router.post('/products/:productId/colors', productController.addProductColor)
router.delete('/colors/:colorId', productController.deleteProductColor)

// Product image routes
router.post('/products/:productId/images', productController.addProductImage)
router.delete('/images/:imageId', productController.deleteProductImage)

// Order routes
router.get('/orders', orderController.getAllOrders)
router.get('/orders/:id', orderController.getOrder)
router.put('/orders/:id', orderController.updateOrderStatus)
router.delete('/orders/:id', orderController.deleteOrder)

// Content routes
router.get('/content', contentController.getAllContent)
router.get('/content/:section', contentController.getContentBySection)
router.post('/content', contentController.updateContent)
router.delete('/content/:section', contentController.deleteContent)

export default router

