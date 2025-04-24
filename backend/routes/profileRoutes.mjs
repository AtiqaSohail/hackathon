import express from 'express';
import { protect } from '../middleware/authMiddleware.mjs';
import { getProfile, updateProfile } from '../controllers/profileController.mjs';

const router = express.Router();

// Protected routes
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

export default router;