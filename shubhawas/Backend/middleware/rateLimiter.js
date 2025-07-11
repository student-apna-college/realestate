// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

 const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes"
});


export default apiLimiter