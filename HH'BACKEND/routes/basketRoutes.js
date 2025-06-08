import express from 'express'
import {
  addToBasket,
  getBasket,
  updateBasketItem,
  removeFromBasket
} from '../controllers/basketController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, addToBasket)
router.get('/', protect, getBasket)
router.put('/:itemId', protect, updateBasketItem)
router.delete('/:itemId', protect, removeFromBasket)

export default router
