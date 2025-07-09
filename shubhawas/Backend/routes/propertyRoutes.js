import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {  
  createProperty,
  deleteProperty,
  updateProperty,
  getPropertyById,
  getPropertiesByCompany} from '../controllers/propertyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { getAdminCompanyDetails } from '../controllers/authController.js';


const router = express.Router();

const uploadPath = 'uploads/property/';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

router.post(
  '/',
  protect,
  authorize('admin'),
  upload.array('images', 10),
  createProperty
);
router.get('/company/:companyId', getPropertiesByCompany);




// Update product (Admin only)
router.put('/:id', protect, authorize('admin'),  upload.array('images', 10), updateProperty);

// Delete product (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteProperty);

router.get(
  '/:adminId/details',
  protect,
  authorize('superadmin', 'admin'),
  getAdminCompanyDetails
);

export default router;
