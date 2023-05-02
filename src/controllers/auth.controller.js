import User from '../models/User.js';
import { addUser } from '../services/user.service.js';
import { hashPassword, matchPassword } from '../utils/password.js';
import { getToken } from '../utils/token.js';

export class AuthController {
  async signUp(req, res) {
    try {
      const { password, ...rest } = req.body;
      const foundUser = req.user;
      if (foundUser) {
        return res.status(409).json({
          message: 'User already exists',
        });
      }
      const hashedPassword = await hashPassword(password);
      const newUser = {
        ...rest,
        password: hashedPassword,
      };
      const user = await addUser(newUser);
      const { password: userPassword, ...userWithoutPassword } =
        user.toObject();
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'user added successfully',
        data: { user: userWithoutPassword },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to add user',
        error: error.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ email }).select('+password');
      if (!foundUser) {
        return res.status(401).json({
          message: 'Invalid credentials',
        });
      }
      const isMatch = await matchPassword(password, foundUser.password);
      if (!isMatch) {
        return res.status(401).json({
          message: 'Invalid credentials',
        });
      }
      const id = foundUser._id;
      const token = getToken(id);      
      const options = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      if (process.env.NODE_ENV === 'production') {
        options.secure = true;
      }
      res.status(200).cookie('token', token, options).json({
        success: true,
        status: 200,
        data: { token },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to login',
        error: error.message,
      });
    }
  }
}
const authController = new AuthController();
export default authController;
