import express from "express";

import {
  checkAuth,
  login,
  logout,
  signup,
  verifyEmail,
  addOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/orders", addOrder);
router.delete("/orders", deleteOrder);
router.put("/orders", updateOrder);

export default router;
