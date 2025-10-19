import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import './LoginPage.css';

export default function Login() {
  const navigate = useNavigate();

  const [user_email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", { user_email, password });
      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.Role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err.response);
      alert("Login failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={user_email}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          New user? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
