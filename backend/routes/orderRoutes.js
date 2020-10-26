import express from 'express';

import checkAuth from '../middleware/authMiddleware.js';
import { addOrderItems, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(checkAuth, addOrderItems);
router.route('/:id').get(checkAuth, getOrderById);

export default router;
