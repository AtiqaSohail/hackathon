import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/UserModel.mjs';
export const register = async (req, res) => {
    try {
      const { fullName, email, password, gender } = req.body;
  
      if (!fullName || !email || !password || !gender) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({ fullName, email, password: hashedPassword, gender });
  
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
export const login = async (req, res) => {
  try{
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ _id: user._id,name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: user._id, fullName: user.fullName, email: user.email, gender: user.gender }
  });
} catch (error) {
  console.error("Login error:", error);
  return res.status(500).json({ message: "Server error" });
}
}
