import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
};