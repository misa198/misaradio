import { Router } from 'express';
import loginValidator from '../validators/auth/login';
import registerValidator from '../validators/auth/register';
import * as controller from '../controllers/auth';
import googleAuthValidator from '../validators/auth/googleAuth';
import changePasswordValidator from '../validators/auth/changePassword';

const router = Router();

router.post('/google', googleAuthValidator, controller.googleAuth);
router.post('/login', loginValidator, controller.login);
router.post('/register', registerValidator, controller.register);
router.post(
  '/change-password',
  changePasswordValidator,
  controller.changePassword,
);
router.get('/verify-email', controller.verifyEmail);

export default router;
