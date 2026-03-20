import express from "express";
import { getProducts, seedProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/seed", seedProducts);

export default router;
