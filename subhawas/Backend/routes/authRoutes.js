import express from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
import apiLimiter from '../middleware/rateLimiter.js'





router.post('/register', register, apiLimiter);
router.post('/login', login, apiLimiter);
router.get('/me', protect, getMe);

router.post('/logout',logout)

export default router;