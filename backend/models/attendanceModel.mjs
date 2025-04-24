import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  checkIn: {
    type: Date,
    default: null,
  },
  checkOut: {
    type: Date,
    default: null,
  },
  date: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
