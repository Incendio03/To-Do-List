import express from 'express';
import { createList, getUserLists } from '../controllers/listController.js';

const router = express.Router();

router.post('/', createList)
router.get('/:userId', getUserLists)

export default router;