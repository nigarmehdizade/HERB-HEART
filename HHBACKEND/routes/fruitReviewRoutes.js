// backend/routes/fruitReviewRoutes.js
import express from 'express';
import { createReview, getReviewsByFruit, deleteReview } from '../controllers/fruitReviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/:fruitId', getReviewsByFruit);
router.delete('/:id', deleteReview);

export default router;
