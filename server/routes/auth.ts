import { Router } from 'express';
import * as controller from '../controllers/auth';
import googleAuthValidator from '../validators/auth/googleAuth';

const router = Router();

router.post('/google', googleAuthValidator, controller.googleAuth);

export default router;
