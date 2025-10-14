// controllers/productController.js

import Product from "../models/productModel.js";

// 📦 Get all products
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      console.log("📦 Products:", products); // debug log
      res.status(200).json(
        products.map(p => ({
          Product_ID: p.product_id,
          Product_Name: p.product_name,
          Category: p.category,
          Price: p.price,
          Image: p.image,
          Description: p.description,
          In_Stock: p.in_stock
        }))
      );
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      res.status(400).json({ error: err.message });
    }
  };
  

// 📦 Add new product
export const addProduct = async (req, res) => {
  try {
    const { product_name, category, price, image, description } = req.body;
    const product_id = "P" + Date.now();

    const product = await Product.create({
      product_id,
      product_name,
      category,
      price,
      image,
      description
    });

    res.status(201).json({
      message: "Product added successfully",
      product: { Product_ID: product.product_id }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📦 Update a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { product_id: req.params.product_id },
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📦 Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      product_id: req.params.product_id,
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get single product by ID
export const getProductById = async (req, res) => {
    try {
      const product = await Product.findOne({ product_id: req.params.product_id }).select(
        "-__v -_id"
      );
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({
        Product_ID: product.product_id,
        Product_Name: product.product_name,
        Category: product.category,
        Price: product.price,
        Image: product.image,
        Description: product.description,
        In_Stock: product.in_stock,
      });
    } catch (err) {
      console.error("❌ Error fetching product:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
