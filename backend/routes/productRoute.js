import express from "express";
import { getProducts, seedProducts, getProductById, addProduct, deleteProduct } from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", isAuthenticated, addProduct);
router.delete("/:id", isAuthenticated, deleteProduct);
router.post("/seed", seedProducts);

export default router;
