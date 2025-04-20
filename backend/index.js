import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import loginRoute from './routes/userLoginRoute.js'
import signupRoute from './routes/userRegistrationRoute.js'

dotenv.config();
const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/login", loginRoute);
app.use("/signup", signupRoute);









const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("Connected to database!");
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.log("Failed connecting to database!", error.message);
})