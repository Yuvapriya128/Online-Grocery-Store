import express from "express";
import dotenv from "dotenv";      // ✅ 1. import dotenv
dotenv.config();                  // ✅ 2. load .env BEFORE anything else

import connectDB from "./config/db.js"; // ✅ 3. import DB connection
connectDB();                      // ✅ 4. connect

const app = express();
app.use(express.json());

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
