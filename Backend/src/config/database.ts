import config from "./config";
import mongoose from "mongoose";
const MongoURI = config.MONGO_URI;

const connectToDB = async function() {
    try {
        mongoose.connect(MongoURI);
        console.log("Successfully connect to MongoDB database");
        
    } catch (error) {
        console.error("Error connecting to MongoDB :", error)
    }
}

export default connectToDB;