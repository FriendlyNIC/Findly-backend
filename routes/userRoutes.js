import express from 'express';
const router = express.Router();
import {
  getUserProfile,
  updateUserProfile,
  switchUserRole,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.put('/switch-role', protect, switchUserRole);

export default router;