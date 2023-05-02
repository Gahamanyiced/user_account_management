import { matchPassword } from '../utils/comparePassword';
import { hashPassword } from '../utils/password';
import { getToken } from '../utils/token';
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
      const { password } = req.body;
      const foundUser = req.user;
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
      id = foundUser._id;
      role = foundUser.role;
      const token = getToken({ id, role });

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
        data: { foundUser, token },
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
