import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // demo auth for now
    setTimeout(() => {
      navigate("/home");
    }, 500);
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

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}
        >
          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" required style={inputStyle} />
              <select required style={inputStyle}>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </>
          )}

          <input type="email" placeholder="Email" required style={inputStyle} />
          <input type="password" placeholder="Password" required style={inputStyle} />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              style={inputStyle}
            />
          )}

          <button className="btn" type="submit">
            {isLogin ? "Login" : "Create Account"}
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
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "var(--accent2)", cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
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
};
