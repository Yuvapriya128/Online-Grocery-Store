import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Product_Name: "",
    Category: "",
    Price: "",
    Image: "",
    Description: "",
  });
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewProduct({ ...newProduct, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProductId) {
        // Update existing product
        await axios.put(`/api/products/${editingProductId}`, {
          ...newProduct,
          Price: Number(newProduct.Price),
        });
        alert("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("/api/products", {
          ...newProduct,
          Price: Number(newProduct.Price),
        });
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

  const toggleStock = async (product) => {
    try {
      await axios.put(`/api/products/${product.Product_ID}`, {
        In_Stock: !product.In_Stock,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
          <button type="submit">{editingProductId ? "Update Product" : "Add Product"}</button>
        </form>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h3>All Products</h3>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="product-cards">
            {filteredProducts.map((product) => (
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
