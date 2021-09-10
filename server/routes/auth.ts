import { Router } from 'express';
import * as controller from '../controllers/auth';
import changePasswordValidator from '../validators/auth/changePassword';
import forgotPasswordRequestValidator from '../validators/auth/forgotPassword';
import googleAuthValidator from '../validators/auth/googleAuth';
import loginValidator from '../validators/auth/login';
import registerValidator from '../validators/auth/register';

const router = Router();

router.post(
  '/change-password',
  changePasswordValidator,
  controller.changePassword,
);
router.post('/google', googleAuthValidator, controller.googleAuth);
router.post('/login', loginValidator, controller.login);
router.post('/register', registerValidator, controller.register);
router.post(
  '/forgot-password',
  forgotPasswordRequestValidator,
  controller.forgotPasswordRequest,
);
router.get('/forgot-password', controller.verifyForgotPassword);
router.get('/verify-email', controller.verifyEmail);

export default router;
