import { todo } from "./routes/todo";
import express from "express";
import { Request, Response } from "express";
import auth from "./routes/auth";
require("dotenv").config();

import { connectDB } from "./config/db";

const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) =>
  res.send("Server up and running")
);
app.use("/api/auth", auth);

app.use("/api/todo", todo);
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
