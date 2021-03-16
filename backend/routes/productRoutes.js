const express = require('express');

const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/productController.js');
const { checkAuth, admin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').get(getProducts).post(checkAuth, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id/reviews').post(checkAuth, createProductReview);
router
  .route('/:id')
  .get(getProductById)
  .delete(checkAuth, admin, deleteProduct)
  .put(checkAuth, admin, updateProduct);

module.exports = router;
