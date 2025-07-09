import express from "express";
import { generate2FA, verify2FA, disable2FA } from "../controllers/2faController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/setup", protect, generate2FA);

router.post("/verify", protect, verify2FA);


router.post("/disable", protect, disable2FA);

export default router;
