import User from "../models/user";
import { Request, Response } from "express";
import { clearToken, generateToken } from "../utils/authUtills";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
  } catch (error: any) {
    res.status(400).json({ message: "No users found", error: error.message });
  }
};
const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "The user already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res
      .status(400)
      .json({ message: "An error occurred in creating the user" });
  }
};
const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    res.status(401).json({ message: "User not found / password is incorrect" });
  }
};
const logoutUser = async (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "User logged out" });
};

export { getAllUser, registerUser, authenticateUser, logoutUser };
