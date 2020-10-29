import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';
import { checkAuth, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(checkAuth, admin, deleteProduct);

export default router;
