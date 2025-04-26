import express from 'express';
import { getUserProfile, getUserByUsername } from '../controllers/userController.js';

const router = express.Router();

router.get("/", getUserByUsername);
router.get("/:id", getUserProfile);

export default router;