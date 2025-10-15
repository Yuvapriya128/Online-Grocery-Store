import express from "express";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/", orderController.placeOrder);
router.get("/:User_ID", orderController.viewOrders);
router.put("/:Order_ID/status", orderController.updateOrderStatus);

export default router;
