import User from '../models/User.js';

export const getAllUsers = async () => {
  const users = await User.find({ isActive: true });
  return users;
};

export const getUserById = async (id) => {
  return await User.findOne({
    _id: id,
    isActive: true,
  });
};

export const addUser = async (user) => {
  const createdUser = await User.create(user);
  return createdUser
};

export const updateUserService = async (update, id) => {
  const updateUser = await User.findByIdAndUpdate(id, update, { new: true });
  return updateUser;
};

export const softDeleteUserService = async (id) => {
  const deleteUser = await User.findByIdAndUpdate(id, {
    new: true,
    isActive: false,
    deleteAt: new Date(),
  });
  return deleteUser;
};
