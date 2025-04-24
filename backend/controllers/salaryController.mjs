import Salary from '../models/salaryModel.mjs';
import Joi from 'joi';

// Validation schema
const salaryValidation = Joi.object({
  basic: Joi.number().min(0).required(),
  bonuses: Joi.number().min(0).optional(),
  deductions: Joi.number().min(0).optional(),
  netSalary: Joi.number().min(0).required(),
});

// Get salary details for logged-in user
export const getSalary = async (req, res) => {
  try {
    const salary = await Salary.findOne({ userId: req.user._id });
    if (!salary) return res.status(404).json({ message: 'Salary details not found' });

    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update or create salary details
export const updateSalary = async (req, res) => {
  try {
    const { error } = salaryValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const salaryData = { ...req.body, updatedAt: new Date() };

    const salary = await Salary.findOneAndUpdate(
      { userId: req.user._id },
      salaryData,
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Salary updated', salary });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
