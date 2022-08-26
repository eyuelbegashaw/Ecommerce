import express from "express";
const router = express.Router();

import {protect, admin} from "../middlewares/authMiddleware.js";
import {
  loginUser,
  registerUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

router.get("/", protect, admin, getUsers);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUser);
router.put("/profile", protect, updateUser);

export default router;
