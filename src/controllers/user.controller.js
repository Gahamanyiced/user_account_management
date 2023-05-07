import {
  getUserById,
  getAllUsers,
  updateUserService,
  softDeleteUserService,
} from '../services/user.service.js';
export class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await getAllUsers();
      return res.status(200).json({
        success: true,
        status: 200,
        count: users.length,
        message: 'Users fetched successfully',
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to fetch users',
        error: error.message,
      });
    }
  }
  async getUser(req, res) {
    try {
      const user = await getUserById(req.params.id);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to fetch user',
        error: error.message,
      });
    }
  }
  async updateUser(req, res) {
    try {
      if (req.results) {
        const imageFile = req.results;
        await updateUserService(
          { photo: imageFile.secure_url, ...req.body },
          req.params.id
        );
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'User updated successfully',
          data: {
            id: req.params.id,
            profileImage: imageFile.secure_url,
            ...req.body,
          },
        });
      } else {
        await updateUserService(req.body, req.params.id);
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'User updated successfully',
          data: {
            id: req.params.id,
            ...req.body,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to update user',
        error: error.message,
      });
    }
  }
  async updateUserIdentifierInfo(req, res) {
    try {
      if (req.results) {
        const imageFile = req.results;
        await updateUserService(
          { documentImage: imageFile.secure_url, ...req.body },
          req.params.id
        );
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'User identifier information updated successfully',
          data: {
            id: req.params.id,
            documentImage: imageFile.secure_url,
            ...req.body,
          },
        });
      } else {
        await updateUserService(req.body, req.params.id);
        return res.status(200).json({
          success: true,
          status: 200,
          message: 'User identifier information updated successfully',
          data: {
            id: req.params.id,
            ...req.body,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to update user identifier information',
        error: error.message,
      });
    }
  }
  async softDeleteUser(req, res) {
    try {
      await softDeleteUserService(req.params.id);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'User deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to delete  user',
        error: error.message,
      });
    }
  }
}
const userController = new UserController();
export default userController;
