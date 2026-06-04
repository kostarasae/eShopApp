import { Router } from 'express'
import { productController } from '../controllers/product.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', authMiddleware, productController.create);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.deleteById);

export default router;