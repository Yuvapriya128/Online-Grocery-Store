// routes/productRoutes.js
import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);
router.put("/:product_id", updateProduct);
router.delete("/:product_id", deleteProduct);
router.get("/:product_id", getProductById);

export default router;
