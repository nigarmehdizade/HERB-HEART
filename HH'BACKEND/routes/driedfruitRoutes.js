import express from 'express';
import { createDriedFruit, getAllDriedFruits, getDriedFruitById } from '../controllers/driedFruitController.js';

const router = express.Router();

router.post('/', createDriedFruit);
router.get('/', getAllDriedFruits);
router.get('/:id', getDriedFruitById);

export default router;
