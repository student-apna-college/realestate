import express from 'express';
import   { getallcontact, contactController,}  from '../controllers/contactController.js';
import  { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.post('/contact-form', protect, contactController, authorize('superadmin'));
router.get('/getall-contact',protect, authorize('superadmin'), getallcontact)

export default router;
