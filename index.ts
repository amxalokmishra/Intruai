import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);

mongoose
  .connect('mongodb://localhost:27017/intruai')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
