import User from '../models/User.js';
import { addUser, updateUserService } from '../services/user.service.js';
import { generateOtp } from '../utils/otp.js';
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
      const otp = parseInt(generateOtp(6));

      await User.findByIdAndUpdate(id, { otp }, { new: true });

      res.status(200).json({
        success: true,
        status: 200,
        message: 'Login successful',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to login',
        error: error.message,
      });
    }
  }
  async verifyOTp(req, res) {
    try {
      const { otp } = req.body;
      const foundUser = req.user;

      if (!foundUser) {
        return res.status(401).json({
          message: 'Invalid credential',
        });
      }
      if (otp != foundUser.otp) {
        return res.status(400).json({ message: 'Wrong OTP' });
      }
      const id = foundUser.id;
      await User.findByIdAndUpdate(id, { otp: null }, { new: true });
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
        message: 'Unable to verify token',
        error: error.message,
      });
    }
  }
  async logout(req, res) {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
    });
    res.status(200).json({
      message: 'Logout successfully',
    });
  }
}
const authController = new AuthController();
export default authController;
