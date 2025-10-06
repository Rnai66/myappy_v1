import express from "express";
import { makePayment, getMyPayments } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:orderId", protect, makePayment);
router.get("/my", protect, getMyPayments);

export default router;
