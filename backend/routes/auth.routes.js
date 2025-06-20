import express from "express";
import {
    login,
    logout,
    signup,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth,
    getUserProfile
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.post("/profile", protectRoute, getUserProfile);

export default router;