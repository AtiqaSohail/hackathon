import express from 'express';
import { getSalary, updateSalary } from '../controllers/salaryController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', protect, getSalary);
router.put('/', protect, updateSalary);

export default router;
