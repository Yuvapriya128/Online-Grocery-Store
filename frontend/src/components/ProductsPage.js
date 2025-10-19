import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.User_ID : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const res = await axios.post(`/cart/${userId}/add`, {
        product_id: product.Product_ID,
        product_name: product.Product_Name,
        quantity: 1,
        total_price: product.Price,
      });
      setMessage(res.data.message || "Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("Failed to add to cart");
    }
  };

  return (
    <div className="products-page">
      <h2>Products</h2>

      {message && <p className="message">{message}</p>}

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.Product_ID}>
              <img src={product.Image_URL} alt={product.Product_Name} />
              <h3>{product.Product_Name}</h3>
              <p>{product.Description}</p>
              <p className="price">₹{product.Price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
