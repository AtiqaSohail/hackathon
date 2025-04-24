import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  basic: { type: Number, required: true },
  bonuses: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;
