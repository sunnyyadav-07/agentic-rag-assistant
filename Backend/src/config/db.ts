import mongoose from "mongoose";
import { config } from "./config.js";

export async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error in connecting DB");
    process.exit(1);
  }
}
