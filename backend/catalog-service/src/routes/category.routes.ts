import { Router } from 'express'
import * as categoryController from '../controllers/category.controller'

const router = Router()

router.get('/', categoryController.getCategories)
router.get('/featured', categoryController.getFeaturedCategories)
router.get('/:slug', categoryController.getCategoryBySlug)
router.post('/', categoryController.createCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

export default router


