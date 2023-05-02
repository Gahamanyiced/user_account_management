import express from 'express';
import { checkUserByEmail } from '../middleware/user.middleware.js';
import authController from '../controllers/auth.controller.js';

const router = express();

router.post('/signup', checkUserByEmail, authController.signUp);

router.post('/login', authController.login);

export default router;
