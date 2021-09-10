import { Router } from 'express';
import * as controller from '../controllers/auth';

const router = Router();

router.post('/google', controller.googleAuth);

export default router;
