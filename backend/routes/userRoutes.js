const express = require('express');
const {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} = require('../controllers/userController.js');
const { admin, checkAuth } = require('../middleware/authMiddleware.js');

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

module.exports = router;
