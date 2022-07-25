import express from "express";
const router = express.Router();

//Controllers
import {getProducts, getProduct} from "../controllers/productController.js";

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
