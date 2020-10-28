import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
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
router
  .route('/:id')
  .delete(checkAuth, admin, deleteUser)
  .get(checkAuth, admin, getUserById)
  .put(checkAuth, admin, updateUser);

export default router;
