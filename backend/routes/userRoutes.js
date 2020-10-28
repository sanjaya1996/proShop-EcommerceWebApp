import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, checkAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(checkAuth, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(checkAuth, getUserProfile)
  .put(checkAuth, updateUserProfile);

export default router;
