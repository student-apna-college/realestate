import express from 'express';
import { createCompany, deleteCompany,  getAllCompany,  updateCompany,   } from '../controllers/companyController.js';
import { authOptional, protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import multer from 'multer';
import { companyFormController } from '../controllers/companyFormController.js';
import fs from 'fs';


const companyUploadPath = 'uploads/company-images/';
if (!fs.existsSync(companyUploadPath)) {
  fs.mkdirSync(companyUploadPath, { recursive: true });
}

const companyStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, companyUploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: companyStorage });;
const router = express.Router();
router.post('/', protect, authorize('superadmin'), upload.single('image'), createCompany);


// Get All Shops (For SuperAdmin & Public User View)
router.get('/all', authOptional, getAllCompany)

router.put('/:id', protect, upload.single('image'), updateCompany);
router.delete('/:id', protect, deleteCompany);

router.post('/companyform', companyFormController);






// Total number of products Total number of cancelled orders Total number of delivered orders Total delivered amount  Total cancelled amount







export default router;