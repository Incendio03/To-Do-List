import express from 'express';
import dbConnection from './config/dbConfig.js';
import cors from 'cors'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import loginRoute from './routes/userLoginRoute.js';
import signupRoute from './routes/userRegistrationRoute.js';
import userRoute from './routes/userRoute.js';
import listRoute from './routes/listRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/users", userRoute);
app.use('/lists', listRoute);

//Connect to database before starting server
const startServer = async () => {
  try{
    await dbConnection();

    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
  }
};

startServer();