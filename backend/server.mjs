import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import authRoutes from './routes/authRoutes.mjs'; 
import attendanceRoutes from './routes/attendanceRoutes.mjs';
import leaveRoutes from './routes/leaveRoutes.mjs';
import profileRoutes from './routes/profileRoutes.mjs';
import salaryRoutes from './routes/salaryRoutes.mjs';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
	cors({
		origin: ['http://localhost:5173'," http://hackathon-nine-puce.vercel.app"],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);
app.use(express.json());
app.use((req, res, next) => {
	console.log(`📢 Incoming: ${req.method} ${req.originalUrl}`);
	next();
  });
 
  
// Routes
app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/leave', leaveRoutes);
app.use('/profile', profileRoutes);
app.use('/salary',salaryRoutes)
// MongoDB Connection
mongoose.connect('mongodb+srv://atiqasohail37:zohahihi@atiqa1.frtcd.mongodb.net/BACKEND?retryWrites=true&w=majority&appName=Atiqa1') 
   
  .then(() => console.log(chalk.bold.bgGreen('MongoDB connected')))
  .catch((err) => console.error(chalk.bold.bgRed('Mongo Error:'), err));
  
// Start server
app.listen(PORT, () => {
  console.log((chalk.bold.bgYellow `Server running on http://localhost:${PORT}`));
});
