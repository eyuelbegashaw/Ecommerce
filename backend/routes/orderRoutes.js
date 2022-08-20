import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import {protect, admin} from "../middlewares/authMiddleware.js";

router.get("/", admin, getOrders);
router.post("/", protect, addOrderItems);
router.get("/myorder", protect, getMyOrders);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, updateOrderToDelivered);
router.get("/:id", protect, getOrderById);

export default router;
