import express from 'express';

import { admin, checkAuth } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDeliverd,
  updateOrderToPaid,
} from '../controllers/orderController.js';

const router = express.Router();

router
  .route('/')
  .post(checkAuth, addOrderItems)
  .get(checkAuth, admin, getOrders);
router.route('/myorders').get(checkAuth, getMyOrders);
router.route('/:id').get(checkAuth, getOrderById);
router.route('/:id/pay').put(checkAuth, updateOrderToPaid);
router.route('/:id/deliver').put(checkAuth, admin, updateOrderToDeliverd);

export default router;
