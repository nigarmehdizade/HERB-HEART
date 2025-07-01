import express from 'express';
import { createNutReview, getReviewsByNutId, deleteReview } from '../controllers/nutReviewController.js';

const router = express.Router();

router.post('/', createNutReview); 
router.get('/:nutId', getReviewsByNutId); 
router.delete('/:id', deleteReview); 

export default router;
