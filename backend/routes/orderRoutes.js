import express from 'express';

import { checkAuth } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(checkAuth, addOrderItems);
router.route('/myorders').get(checkAuth, getMyOrders);
router.route('/:id').get(checkAuth, getOrderById);
router.route('/:id/pay').put(checkAuth, updateOrderToPaid);

export default router;
