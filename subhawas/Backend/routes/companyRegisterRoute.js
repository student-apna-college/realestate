import express from 'express';
import { getCompanyFormQuery,   } from '../controllers/companyFormController.js';
import { companyFormController } from '../controllers/companyFormController.js';
const router = express.Router();

router.post('/companyform', companyFormController);
router.get('/getcompany-query',getCompanyFormQuery)

export default router;
