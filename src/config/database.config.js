import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI not found, please add a MONGO_URI");
}

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
};

export default connect;