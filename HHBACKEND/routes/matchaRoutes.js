import express from 'express';
import {
  getAllMatcha,
  getMatchaById,
  createMatcha
} from '../controllers/matchaController.js';

const router = express.Router();

router.get('/', getAllMatcha);
router.get('/:id', getMatchaById);
router.post('/', createMatcha); 

export default router;
