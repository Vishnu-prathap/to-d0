import { Todo } from "../models/todo";
import { Request, Response } from "express";
exports.getAllTodo = async (req: Request, res: Response) => {
  try {
    const getResponse = await Todo.find();
    res.status(200).json(getResponse);
  } catch (error: any) {
    res.status(404).json({
      message: "Todos not found",
      error: error.message,
    });
  }
};

exports.postCreateTodo = async (req: Request, res: Response) => {
  try {
    const createTodo = await Todo.create(req.body);
    res.status(200).json({ message: "Created Todo", createTodo });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot create todo",
      error: error.message,
    });
  }
};

exports.updateTodo = async (req: Request, res: Response) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.todoID,
      req.body
    );
    res.status(200).json({ message: "Update todo", updateTodo });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Cannot update todo", error: error.message });
  }
};

exports.deleleTodo = async (req: Request, res: Response) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(
      req.params.todoID,
      req.body
    );
    res.status(200).json({ message: "Deleted Todo", deleteTodo });
  } catch (error: any) {
    res
      .status(404)
      .json({ message: "Cannot delete todo", error: error.message });
  }
};
