import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
} from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

export default router;