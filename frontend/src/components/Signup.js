import React, { useState } from "react";
import axios from "../axios";
import { useNavigate, Link } from "react-router-dom";
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    password: "",
    role: "customer",
    phone_no: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", formData);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input name="user_name" placeholder="Name" onChange={handleChange} required />
          <input name="user_email" placeholder="Email" type="email" onChange={handleChange} required />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <input name="phone_no" placeholder="Phone Number" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <select name="role" onChange={handleChange} value={formData.role}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Signup</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
