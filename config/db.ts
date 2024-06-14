import mongoose from "mongoose";

const mongoDB = process.env.MONGODB_URL!;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { connectDB };
