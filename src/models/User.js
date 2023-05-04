import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      default: 'no-photo.jpng',
    },
    name: String,
    gender: String,
    email: String,
    age: Number,
    dateOfBirth: Date,
    maritalStatus: {
      type: String,
      enum: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'],
    },
    nationality: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    identifierNumber: String,
    documentImage: {
      type: String,
      default: 'no-photo.jpg',
    },
    accountStatus: {
      type: String,
      enum: ['UNVERIFIED', 'PENDING VERIFICATION', 'VERIFIED'],
      default: 'UNVERIFIED',
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    otp: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
