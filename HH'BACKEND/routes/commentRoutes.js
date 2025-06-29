import express from 'express';
import { createComment, getCommentsByRecipe } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment); 
router.get('/:recipeId', getCommentsByRecipe); 

export default router;
