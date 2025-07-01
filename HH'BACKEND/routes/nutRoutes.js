import express from 'express';
import { getAllNuts, getNutById, createNut } from '../controllers/nutController.js';

const router = express.Router();

router.get('/', getAllNuts);
router.get('/:id', getNutById);
router.post('/', createNut); 

export default router;
