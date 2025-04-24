import express from 'express';
import { register, login } from '../controllers/authController.mjs';
import { registerSchema, loginSchema } from '../validators/authValidator.mjs';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    await registerSchema.validateAsync(req.body);
    await register(req, res); // make sure it's awaited too if async
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    await loginSchema.validateAsync(req.body);
    await login(req, res); // again, await just to be safe
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
