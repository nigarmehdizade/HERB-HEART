
import express from 'express';
import { getAllSeeds, createSeed, getSeedById } from '../controllers/seedsController.js';

const router = express.Router();

router.get('/', getAllSeeds);
router.post('/', createSeed);
router.get('/:id', getSeedById);

export default router;
