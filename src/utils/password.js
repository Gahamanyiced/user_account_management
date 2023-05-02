import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const matchPassword = async (password, user_password) => {
  return await bcrypt.compare(password, user_password);
};
