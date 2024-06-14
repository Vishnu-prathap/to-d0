import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
export interface Iuser extends Document {
  _id: string;
  uid: string;
  name: string;
  email: string;
  password: string;
  comparePassword: (enteredPassword: string) => boolean;
}

const userSchema = new Schema<Iuser>({
  uid: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/***The next few lines checks if the password isModified and if that is false,
 * it will hash the input password and then add it psuedorandom variables to it
 * and encrypt it
 *
 *  **/
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(20);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
