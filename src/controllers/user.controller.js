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
      const user = await getUserById(req.user.id);
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
      const user = req.user;
      await updateUserService(req.body, user.id);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'User updated successfully',
        data: { id: user.id, ...req.body },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to update user',
        error: error.message,
      });
    }
  }
  async softDeleteUser(req, res) {
    try {
      const user = req.user;
      await softDeleteUserService(user.id);
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
