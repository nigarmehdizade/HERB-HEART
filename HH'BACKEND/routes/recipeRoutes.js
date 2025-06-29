
import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe
} from "../controllers/recipeController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", protect, isAdmin, createRecipe); 

export default router;
