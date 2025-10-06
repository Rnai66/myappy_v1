import express from "express";
import { registerUser, loginUser, getProfile, getUsers } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/users", getUsers);

export default router;
