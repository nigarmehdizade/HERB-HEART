import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsers); 
router.get("/me", protect, getProfile);         
router.put("/me", protect, updateProfile);

export default router;
