import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String },
  address: { type: String },
  department: { type: String },
  position: { type: String },
}, { timestamps: true });

export const Profile = mongoose.model('Profile', profileSchema);