import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProductsPage from "./components/ProductsPage";
import AdminPage from "./components/AdminPage";
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
function App() {
  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />

      {/* Main Routes */}
      <div style={{ minHeight: "80vh" }}> {/* ensures footer is at bottom */}
        <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/pripol" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/admin" element={<AdminPage />} /> {/* ✅ AdminPage route */}
</Routes>
      </div>

      {/* Footer will appear on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
