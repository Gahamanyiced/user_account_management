import { getUserById } from '../services/user.service.js';
import { decoding } from '../utils/token.js';
import crypto from 'crypto';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      message: 'Not authorize to access this route',
    });
  }
  try {
    const decoded = await decoding(token);
    req.user = await getUserById(decoded.id);
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Error while decoding user token',
      error: error.message,
    });
  }
};
//Grant access to specific roles
export const authorize = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: `User role ${req.user.role} is not authorized to access this route`,
        });
      }
      next();
    };
  } catch (error) {
    return res.status(500).json({
      message: 'Error while authorizing user role',
      error: error.message,
    });
  }
};

export const generateResetToken = async (req, res, next) => {
  try {
    const foundUser = req.user;
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const id = foundUser.id;
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await User.findByIdAndUpdate(
      id,
      {
        resetPasswordToken,
        resetPasswordExpire,
      },
      { new: true }
    );

    req.resetToken = resetToken;
    req.user = foundUser;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Unable to generate reset token',
      error: error.message,
    });
  }
};
export const checkUserExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({
      email,
      isActive: true,
    });
    if (!foundUser) {
      return res.status(404).json({
        message: 'There is no user with that email',
      });
    }
    req.user = foundUser;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to check user by email',
      error: error.message,
    });
  }
};
