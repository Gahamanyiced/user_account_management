import express from 'express';
import userController from '../controllers/user.controller.js';
import { checkUserByEmail } from '../middleware/user.middleware.js';


const router = express();

// router.post('/register',checkUserByEmail,userController.signUp)
export default router;
