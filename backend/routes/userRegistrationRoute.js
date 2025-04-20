import express from 'express';
import { registerUser } from '../controllers/userSignUpController.js';

const router = express.Router();

router.post('/', registerUser)

export default router;