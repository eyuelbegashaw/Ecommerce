import express from "express";
const router = express.Router();

import {protect, admin} from "../middlewares/authMiddleware.js";
import {
  loginUser,
  registerUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUsers,
} from "../controllers/userController.js";

router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);
router.put("/:id", protect, admin, updateUsers);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUser);
router.put("/profile", protect, updateUser);

export default router;
