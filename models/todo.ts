import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const TodoSchema = new mongoose.Schema(
  {
    todoID: { type: "String", default: uuidv4 },
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    completeDate: { type: "Date", required: true },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("todo", TodoSchema);
// export { Todo };
