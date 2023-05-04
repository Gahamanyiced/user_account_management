import express from 'express';
import userRoutes from './user.route.js';
import authRoutes from './auth.route.js';
const routes = express();

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'This is User Account Management',
  });
});
routes.use('/api/v1/users', userRoutes);
routes.use('/api/v1/auth', authRoutes);
routes.get('*', (req, res) => {
  res.status(404).json({
    message: 'Page not found, try again',
  });
});

export default routes;
