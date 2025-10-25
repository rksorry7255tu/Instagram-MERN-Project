import mongoose from "mongoose";
import { MONGO_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstane = await mongoose.connect(
      `${process.env.MONGODB_URI}/${MONGO_NAME}`
    );
    console.log("MongoDB conneted Successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
