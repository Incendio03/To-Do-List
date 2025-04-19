import express from 'express';
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

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ToDo List API' });
});

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});