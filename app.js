import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './src/routers/index.js'
import cloudinaryUpload from './src/utils/cloudinary.js';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import colors from 'colors';
import { connectDB } from './src/config/db.js';

const app = express();

//Load env vars
dotenv.config({ path: './src/config/config.env' });

//connect to Database
connectDB();

//connect to cloudinary
cloudinaryUpload();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//File upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//Sanitize data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent xss attacks
app.use(xss());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);
// Prevent http param pollution
app.use(hpp());
//Enable CORS
app.use(cors());
app.use(routes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // close server & exit process
  server.close(() => process.exit(1));
});
