import { Router } from 'express';
import loginValidator from '../validators/auth/login';
import registerValidator from '../validators/auth/register';
import * as controller from '../controllers/auth';
import googleAuthValidator from '../validators/auth/googleAuth';

const router = Router();

router.post('/google', googleAuthValidator, controller.googleAuth);
router.post('/login', loginValidator, controller.login);
router.post('/register', registerValidator, controller.register);

export default router;
