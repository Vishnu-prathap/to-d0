import express from "express";

import {
  registerUser,
  authenticateUser,
  logoutUser,
  getAllUser,
} from "../controllers/auth";

const router = express.Router();
router.get("/users", getAllUser);
router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.post("/logout", logoutUser);

export { router as auth };
