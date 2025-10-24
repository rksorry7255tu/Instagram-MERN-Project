import mongoose from "mongoose";
import { MONGODB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${MONGODB_NAME}`
    );
    console.log("MongoDB connected successfully!!");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
