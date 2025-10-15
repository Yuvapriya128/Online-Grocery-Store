import express from "express";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

router.get("/:User_ID", cartController.viewCart);
router.post("/:User_ID/add", cartController.addItem);
router.put("/:User_ID/update/:CartItem_ID", cartController.updateItem);
router.delete("/:User_ID/remove/:CartItem_ID", cartController.removeItem);
router.delete("/:User_ID/clear", cartController.clearCart);

export default router;
