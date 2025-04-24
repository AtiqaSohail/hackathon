import express from "express";
 import { checkIn, checkOut, getAttendance } from "../controllers/attendanceController.mjs";
 import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/check-in", protect, checkIn);
router.post("/check-out", protect, checkOut);
router.get("/", protect, getAttendance);

export default router;
