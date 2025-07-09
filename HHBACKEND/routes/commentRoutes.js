import express from 'express';
import {
  getCommentsByProduct,
  createProductComment,
  createSnackComment,
  getCommentsBySnack,
    getCommentsByRecipe,
    createRecipeComment,
    deleteComment
} from '../controllers/commentController.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.get('/product/:id', getCommentsByProduct);
router.post('/product/:id', createProductComment);


router.get('/recipe/:recipeId', getCommentsByRecipe);
router.post('/recipe/:recipeId', createRecipeComment);
router.get('/snack/:snackId', getCommentsBySnack);
router.post('/recipe/:recipeId', createRecipeComment);

router.post('/snack/:snackId', upload.single('image'), createSnackComment);
router.delete('/:id', deleteComment); 
export default router;
