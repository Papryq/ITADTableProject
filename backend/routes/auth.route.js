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
  getOrders,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/orders", getOrders);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/orders", addOrder);

router.delete("/orders/:orderNumber", deleteOrder);

router.put("/orders/:orderNumber", updateOrder);


export default router;
