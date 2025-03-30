import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
