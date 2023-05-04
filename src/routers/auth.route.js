import express from 'express';
import { checkUserExistByEmail } from '../middleware/user.middleware.js';

import authController from '../controllers/auth.controller.js';
import {
  forgotPasswordValidation,
  loginValidation,
  resetPasswordValidation,
  signUpValidation,
  verifyOTpValidation,
} from '../validations/auth.validation.js';
import {
  checkUserExist,
  generateResetToken,
} from '../middleware/auth.middleware.js';

const router = express();

router
  .route('/signup')
  .post(signUpValidation, checkUserExistByEmail, authController.signUp);

router.route('/login').post(loginValidation, authController.login);

router.route('/logout').get(authController.logout);

router
  .route('/forgot-password')
  .post(
    forgotPasswordValidation,
    checkUserExist,
    generateResetToken,
    authController.forgotPassword
  );

router
  .route('/reset-password/:resettoken')
  .patch(resetPasswordValidation, authController.resetPassword);

router
  .route('/verify-otp')
  .post(verifyOTpValidation, checkUserExistByEmail, authController.verifyOTp);

export default router;
