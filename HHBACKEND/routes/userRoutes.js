import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsers); 
router.get("/me", protect, getProfile);         
router.put("/me", protect, updateProfile);
router.get('/logout', protect, logoutUser);
export default router;
