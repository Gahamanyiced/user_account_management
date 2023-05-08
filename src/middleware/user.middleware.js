import User from '../models/User.js';
import cloudinary from 'cloudinary';

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
export const checkUploadImageFile = async (req, res, next) => {
  if (req.files) {
    const file = req.files.image_file;
    cloudinary.uploader.upload(file.tempFilePath, async (results, err) => {
      if (err) {
        res.status(500).json({
          message: 'Unable to upload image file',
          error: err,
        });
      }
      req.results = results;
      next();
    });
  } else {
    next();
  }
};

export const checkUploadImageFileFormat = (...extensions) => {
  return (req, res, next) => {
    if (req.results) {
      const results = req.results;
      console.log(results);
      if (!extensions.includes(results.format)) {
        return res.status(405).json({
          message: `Only ${extensions} format is allowed`,
        });
      } else {
        req.results = results;
        next();
      }
    } else {
      next();
    }
  };
};
