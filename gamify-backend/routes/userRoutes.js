import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getLeaderboard, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/leaderboard', protect, getLeaderboard);
router.get('/profile', protect, getUserProfile);

export default router; // ✅ Ye line ensure karo