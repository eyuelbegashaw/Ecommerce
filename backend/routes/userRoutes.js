import express from "express";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";
import {loginUser, registerUser, getUser, updateUser} from "../controllers/userController.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUser);
router.put("/profile", protect, updateUser);

export default router;
