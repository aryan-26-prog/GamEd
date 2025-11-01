import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validation
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (!isLogin && !formData.name) {
        throw new Error("Name is required");
      }

      const API_URL = "http://127.0.0.1:5000/api/auth";

      if (isLogin) {
        // Login API call
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Save token to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        console.log("Login successful:", data);
        navigate("/home");

      } else {
        // Register API call
        const response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        // Save token to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        console.log("Registration successful:", data);
        navigate("/home");
      }

    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="container"
      style={{ paddingTop: "5rem", display: "flex", justifyContent: "center" }}
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: "420px", padding: "2rem", width: "100%" }}
      >
        <h2 style={{ marginTop: 0, textAlign: "center" }}>
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(255, 0, 0, 0.1)",
              color: "#ff6b6b",
              padding: "0.7rem",
              borderRadius: "10px",
              border: "1px solid rgba(255, 0, 0, 0.2)",
              marginBottom: "1rem",
              textAlign: "center",
              fontSize: "0.9rem"
            }}
          >
            {error}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}
        >
          {!isLogin && (
            <>
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                required 
                value={formData.name}
                onChange={handleChange}
                style={inputStyle} 
                disabled={loading}
              />
              <select 
                name="role"
                required 
                value={formData.role}
                onChange={handleChange}
                style={inputStyle}
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </>
          )}

          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            required 
            value={formData.email}
            onChange={handleChange}
            style={inputStyle} 
            disabled={loading}
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            required 
            value={formData.password}
            onChange={handleChange}
            style={inputStyle} 
            disabled={loading}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              disabled={loading}
            />
          )}

          <button 
            className="btn" 
            type="submit"
            disabled={loading}
            style={{
              ...btnStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <span>{isLogin ? "Login" : "Create Account"}</span>
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "var(--muted)",
            fontSize: "0.9rem",
          }}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => !loading && setIsLogin(!isLogin)}
            style={{ 
              color: "var(--accent2)", 
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        {/* Demo Credentials Info */}
        {isLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "0.8rem",
              color: "var(--muted)"
            }}
          >
            <strong>Demo Credentials:</strong>
            <div>Email: test@example.com</div>
            <div>Password: 123456</div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

const inputStyle = {
  padding: "0.7rem",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "1rem",
  outline: "none",
  transition: "all 0.3s ease",
};

const btnStyle = {
  padding: "0.7rem",
  borderRadius: "10px",
  border: "none",
  background: "var(--accent2)",
  color: "white",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
};