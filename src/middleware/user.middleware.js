import User from '../models/User.js';

export const checkUserExistByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({
      email,
      isActive: true,
    });

    req.user = foundUser;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to check user by email',
      error: error.message,
    });
  }
};
