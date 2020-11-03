import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { checkAuth, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(checkAuth, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id/reviews').post(checkAuth, createProductReview);
router
  .route('/:id')
  .get(getProductById)
  .delete(checkAuth, admin, deleteProduct)
  .put(checkAuth, admin, updateProduct);

export default router;
