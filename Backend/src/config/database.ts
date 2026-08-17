import config from "./config";
import mongoose from "mongoose";
const MONGO_URI = config.MONGO_URI;

const connectToDB = async (): Promise<void> =>{
    try {
        mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB Database successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
};

export default connectToDB;