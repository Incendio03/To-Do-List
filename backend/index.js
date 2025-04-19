import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Import routes
// import authRoutes from './routes/auth.js';
// import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("Connected to database!");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(() => {
  console.log("Failed connecting to database!");
})