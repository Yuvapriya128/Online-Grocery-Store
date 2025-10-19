import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.User_ID : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(res.data.map(p => p.Category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.Category === category));
    }
  };

  const addToCart = async (product) => {
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const res = await axios.post(`/cart/${userId}/add`, {
        Product_ID: product.Product_ID,
        Quantity: 1,
      });
      setMessage(res.data.message || "Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage(err.response?.data?.error || "Failed to add to cart");
    }
  };

  return (
    <div className="products-page">
      <h2>Products</h2>

      {/* Category Filter */}
      <div className="category-filter">
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.Product_ID}>
              <img src={product.Image} alt={product.Product_Name} />
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
