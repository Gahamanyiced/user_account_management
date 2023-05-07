import User from '../models/User.js';

export const getAllUsers = async () => {
  const users = await User.find({ isActive: true });
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findOne({
    _id: id,
    isActive: true,
  });
  if (!user) {
    res.status(404).json({
      message: 'User not found',
    });
  }
  return user;
};

export const addUser = async (user) => {
  const createdUser = await User.create(user);
  return createdUser;
};

export const updateUserService = async (update, id) => {
  const updateUser = await User.findByIdAndUpdate(id, update, { new: true });
  if (!updateUser) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  return updateUser;
};

export const softDeleteUserService = async (id) => {
  const deleteUser = await User.findByIdAndUpdate(id, {
    new: true,
    isActive: false,
    deleteAt: new Date(),
  });
  if (!deleteUser) {
    res.status(404).json({
      message: 'User not found',
    });
  }
  return deleteUser;
};
