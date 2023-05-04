import express from 'express';
import { checkUserExistByEmail } from '../middleware/user.middleware.js';
import authController from '../controllers/auth.controller.js';
import {
  loginValidation,
  signUpValidation,
  verifyOTpValidation,
} from '../validations/auth.validation.js';

const router = express();

router
  .route('/signup')
  .post(signUpValidation, checkUserExistByEmail, authController.signUp);

router.route('/login').post(loginValidation, authController.login);

router.route('/logout').get(authController.logout);

router
  .route('/verify-otp')
  .post(verifyOTpValidation, checkUserExistByEmail, authController.verifyOTp);

export default router;
