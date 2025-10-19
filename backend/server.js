import express from "express";
import dotenv from "dotenv";
import cors from "cors";              // ✅ for CORS
import connectDB from "./config/db.js"; // MongoDB connection

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());           // ✅ allow cross-origin requests
app.use(express.json());   // ✅ parse JSON body

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
