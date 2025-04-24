import Leave from '../models/leaveModel.mjs';
import Joi from 'joi';

// Joi schema for validation
const leaveValidation = Joi.object({
  leaveType: Joi.string().valid('Sick', 'Casual', 'Annual', 'Other').required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).required(),
  reason: Joi.string().optional(),
});


// Apply leave request
export const applyLeave = async (req, res) => {
  try {
    console.log("Decoded user from middleware:", req.user); // ✅
    console.log("Body:", req.body); // ✅

    const { error } = leaveValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { leaveType, startDate, endDate, reason } = req.body;
    const userId = req.user._id || req.user.id;

    const newLeave = new Leave({
      userId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave applied successfully', leave: newLeave });
  } catch (err) {
    console.error("Apply leave error:", err); // ✅ LOG IT!
    res.status(500).json({ message: 'Server error', error: err.message }); // ✅ Show real error
  }
};

// Get all leaves for logged-in user
export const getLeaves = async (req, res) => {
  try {
    const userId = req.user._id;
    const leaves = await Leave.find({ userId });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
