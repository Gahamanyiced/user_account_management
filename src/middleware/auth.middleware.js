import { getUserById } from '../services/user.service';
import { decoding } from '../utils/token';

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
