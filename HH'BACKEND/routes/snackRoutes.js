import express from 'express';
import { createSnack, getAllSnacks, getSnackById } from '../controllers/snackController.js';

const router = express.Router();

router.post('/', createSnack);
router.get('/', getAllSnacks);
router.get('/:id', getSnackById);

export default router;
