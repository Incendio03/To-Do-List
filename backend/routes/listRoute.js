import express from 'express';
import { createList, getUserLists, editList } from '../controllers/listController.js';

const router = express.Router();

router.post('/', createList)
router.put('/:id', editList)
router.get('/user/:userId', getUserLists)

export default router;