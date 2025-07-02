import express from 'express';
import {
  createDriedFruit,
  getAllDriedFruits,
  getDriedFruitById,
  addDriedFruitReview,
  deleteDriedFruitReview
} from '../controllers/driedFruitController.js';

const router = express.Router();

router.post('/', createDriedFruit);
router.get('/', getAllDriedFruits);
router.get('/:id', getDriedFruitById);
router.post('/:id/reviews', addDriedFruitReview);         
router.delete('/:id/reviews/:reviewId', deleteDriedFruitReview); 

export default router;
