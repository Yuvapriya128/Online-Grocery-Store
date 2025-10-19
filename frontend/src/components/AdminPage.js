import React, { useEffect, useState } from "react";
import axios from "../axios"; // import the Axios instance
import './AdminPage.css';
export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Product_Name: "",
    Category: "",
    Price: "",
    Image: "",
    Description: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewProduct({ ...newProduct, [id]: value });
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      product_name: newProduct.Product_Name,
      category: newProduct.Category,
      price: Number(newProduct.Price),
      image: newProduct.Image,
      description: newProduct.Description,
    };

    try {
      if (editingProductId) {
        // Update product
        await axios.put(`/products/${editingProductId}`, payload);
        alert("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("/products", payload);
        alert("Product added successfully!");
      }

      // Reset form
      setNewProduct({
        Product_Name: "",
        Category: "",
        Price: "",
        Image: "",
        Description: "",
      });
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Make sure you are an admin.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setNewProduct({
      Product_Name: product.Product_Name,
      Category: product.Category,
      Price: product.Price,
      Image: product.Image,
      Description: product.Description,
    });
    setEditingProductId(product.Product_ID);
  };

  // Toggle stock
  const toggleStock = async (product) => {
    try {
      await axios.put(`/products/${product.Product_ID}`, {
        in_stock: !product.In_Stock,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div className="wrapper admin-page">
      <h2>Admin Dashboard</h2>

      {/* Add / Edit Product Form */}
      <div className="add-product-form">
        <h3>{editingProductId ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="Product_Name"
            placeholder="Product Name"
            value={newProduct.Product_Name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="Category"
            placeholder="Category"
            value={newProduct.Category}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            id="Price"
            placeholder="Price"
            value={newProduct.Price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="Image"
            placeholder="Image URL"
            value={newProduct.Image}
            onChange={handleChange}
          />
          <input
            type="text"
            id="Description"
            placeholder="Description"
            value={newProduct.Description}
            onChange={handleChange}
          />
          <button type="submit">
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h3>All Products</h3>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="product-cards">
            {products.map((product) => (
              <div className="product-card" key={product.Product_ID}>
                <img
                  src={
                    product.Image ||
                    "https://images.unsplash.com/photo-1580910051071-cb3f8a05f8b6?auto=format&fit=crop&w=150&q=80"
                  }
                  alt={product.Product_Name}
                  className="product-image"
                />
                <h4>{product.Product_Name}</h4>
                <p className="category">{product.Category}</p>
                <p className="price">₹{product.Price}</p>
                <p className="description">{product.Description}</p>
                <div className="stock">
                  <label>
                    In Stock:{" "}
                    <input
                      type="checkbox"
                      checked={product.In_Stock}
                      onChange={() => toggleStock(product)}
                    />
                  </label>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.Product_ID)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
