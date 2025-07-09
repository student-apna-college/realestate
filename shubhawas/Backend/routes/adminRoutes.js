import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { getAdminCompanyDetails } from '../controllers/adminController.js';
// import { updateOrderStatus } from '../controllers/adminController.js';


const router = express.Router();
// routes/adminRoutes.js
router.get('/:adminId/details', protect, authorize('superadmin', 'admin'), getAdminCompanyDetails);
// router.get('/orders', protect, authorize('admin', 'superadmin'), getOrdersForAdmin);



// router.patch('/orders/:orderId/status', protect, authorize('admin', 'superadmin'), updateOrderStatus);


export default router;
