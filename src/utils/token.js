import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config/config.env' });

export const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY || 'loginTokenKey', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  return token;
};
export const decoding = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET || 'loginTokenKey');
  return payload;
};
