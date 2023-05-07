import express from 'express';
import { authorize, protect } from '../middleware/auth.middleware.js';
import userController from '../controllers/user.controller.js';
import { checkUploadImageFile, checkUploadImageFileFormat } from '../middleware/user.middleware.js';

const router = express();

router
  .route('/')
  .get(protect, authorize('admin', 'user'), userController.getAllUsers);

router
  .route('/:id')
  .get(protect, authorize('admin', 'user'), userController.getUser)
  .patch(protect, authorize('admin', 'user'),checkUploadImageFile,checkUploadImageFileFormat('jpg','png'), userController.updateUser)
  .delete(protect, authorize('admin', 'user'), userController.softDeleteUser);

router
  .route('/identifier-info/:id')
  .patch(
    protect,
    authorize('admin', 'user'),checkUploadImageFile,checkUploadImageFileFormat('jpg','png'),
    userController.updateUserIdentifierInfo
  );

export default router;
