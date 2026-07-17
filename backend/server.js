import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors()); // Allow all origins for simplicity in development
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("ShopEZ API Server is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`[ShopEZ Server] Running on http://localhost:${PORT}`);
});
