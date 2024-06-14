import express from "express";
const router = express.Router();
// import {
//   getAllTodo,
//   postCreateTodo,
//   updateTodo,
//   deleleTodo,
// } from "../controllers/todo";
const {
  getAllTodo,
  postCreateTodo,
  updateTodo,
  deleleTodo,
} = require("../controllers/todo");
router.get("/", getAllTodo);
router.post("/", postCreateTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleleTodo);

export { router as todo };
