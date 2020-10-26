import express from 'express';

import checkAuth from '../middleware/authMiddleware.js';
import { addOrderItems } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(checkAuth, addOrderItems);

export default router;
