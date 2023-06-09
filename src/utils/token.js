import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET || 'loginTokenKey', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  return token;
};
export const decoding = async (token) => {
  const payload = await jwt.verify(token, process.env.JWT_SECRET || 'loginTokenKey');

  return payload;
};
