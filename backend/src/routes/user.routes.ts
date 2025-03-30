import express from "express";
import { getUserProfile } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// GET logged-in user's profile (Protected Route)
router.get("/me", protect, getUserProfile);

export default router;
