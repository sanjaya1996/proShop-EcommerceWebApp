const express = require('express');

const { admin, checkAuth } = require('../middleware/authMiddleware.js');
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDeliverd,
  updateOrderToPaid,
} = require('../controllers/orderController.js');

const router = express.Router();

router
  .route('/')
  .post(checkAuth, addOrderItems)
  .get(checkAuth, admin, getOrders);
router.route('/myorders').get(checkAuth, getMyOrders);
router.route('/:id').get(checkAuth, getOrderById);
router.route('/:id/pay').put(checkAuth, updateOrderToPaid);
router.route('/:id/deliver').put(checkAuth, admin, updateOrderToDeliverd);

module.exports = router;
