// routes/superAdminRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { superAdminController,  createAdmin,
  updateAdmin,
  deleteAdmin,
 
 
  getAllAdmins,
  

  createCompany,
  updateCompany,
  deleteCompany,
  getAllCompany,
  getAllProperty} from '../controllers/superAdminController.js'

const router = express.Router();

router.get('/companys/:companyId/analytics', protect, authorize('superadmin'), superAdminController);
router.post('/create-admin', protect, authorize('superadmin'), createAdmin);
router.put('/update-admin/:id', protect, authorize('superadmin'), updateAdmin);
router.delete('/delete-admin/:id', protect, authorize('superadmin'), deleteAdmin);
router.post('/create-', protect, authorize('superadmin'), createCompany);
router.put('/update-company/:id', protect, authorize('superadmin'), updateCompany);
router.delete('/delete-company/:id', protect, authorize('superadmin'), deleteCompany);
router.get('/admins', protect, authorize('superadmin'), getAllAdmins);
router.get('/companys', protect, authorize('superadmin'),getAllCompany);
router.get('/property', protect, authorize('superadmin'), getAllProperty);


export default router;
