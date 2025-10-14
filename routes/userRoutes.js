import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:user_id", getUserProfile);
router.put("/:user_id", updateUserProfile);


export default router;
