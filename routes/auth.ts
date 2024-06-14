import express from "express";

import {
  registerUser,
  authenticateUser,
  logoutUser,
} from "../controllers/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/logout", logoutUser);

export default router;
