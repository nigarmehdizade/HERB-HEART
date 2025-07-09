import express from "express";
import { getBasket, addToBasket, removeFromBasket } from "../controllers/basketController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getBasket);
router.post("/add", protect, addToBasket);
router.delete("/remove", protect, removeFromBasket);

export default router;