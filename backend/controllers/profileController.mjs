import { Profile } from '../models/profileModel.mjs';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', '-password');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { phone, address, department, position } = req.body;

    // Update profile with user id
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { phone, address, department, position },
      { new: true, upsert: true } // Create a new profile if one doesn't exist
    );

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};