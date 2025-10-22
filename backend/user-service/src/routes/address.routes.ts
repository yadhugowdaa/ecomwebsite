import { Router } from 'express'
import * as addressController from '../controllers/address.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)

router.get('/', addressController.getAddresses)
router.post('/', addressController.createAddress)
router.put('/:id', addressController.updateAddress)
router.delete('/:id', addressController.deleteAddress)
router.put('/:id/default', addressController.setDefaultAddress)

export default router


