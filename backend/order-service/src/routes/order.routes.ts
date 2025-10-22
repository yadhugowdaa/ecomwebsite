import { Router } from 'express'
import * as orderController from '../controllers/order.controller'

const router = Router()

router.post('/', orderController.createOrder)
router.get('/user/:userId', orderController.getUserOrders)
router.get('/:orderNumber', orderController.getOrderByNumber)
router.put('/:id/status', orderController.updateOrderStatus)
router.put('/:id/tracking', orderController.updateTrackingNumber)
router.delete('/:id', orderController.cancelOrder)

export default router


