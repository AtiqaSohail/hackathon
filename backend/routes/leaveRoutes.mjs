import express from 'express';
import { applyLeave, getLeaves } from '../controllers/leaveController.mjs';
// import { verifyToken } from '../middleware/authMiddleware.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/apply', protect, applyLeave);
router.get('/my-leaves', protect, getLeaves);

export default router;
