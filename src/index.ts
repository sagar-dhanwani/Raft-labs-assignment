// src/index.ts
import app from "./app";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Connect to database
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
