import React, { useEffect, useState } from "react";
import axios from "../axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.User_ID;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      if (!userId) {
        alert("Please login first!");
        return;
      }

      // Auto-create cart if not exists
      await axios.post(`/cart/${userId}/add`, {
        Product_ID: product.product_id,
        Quantity: 1,
      });

      alert(`✅ ${product.product_name} added to cart!`);
    } catch (err) {
      console.error("❌ Error adding to cart:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add to cart");
    }
  };

  return (
    <div className="products-page">
      <h2>🛍 Products</h2>
      <div className="products-list" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p.product_id}
            className="product-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={p.image}
              alt={p.product_name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3>{p.product_name}</h3>
            <p>₹{p.price}</p>
            <button
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f8bbd0",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
