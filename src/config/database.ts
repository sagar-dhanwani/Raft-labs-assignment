// src/config/database.ts
import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/graphql-api", {
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
};
