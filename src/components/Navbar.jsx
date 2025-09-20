import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Determine what buttons to show
  const showLoginButton = location.pathname === "/";
  const showAllButtons = location.pathname !== "/" && location.pathname !== "/auth";

  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "🌱 New mission assigned!", read: false },
    { id: 2, text: "📘 You enrolled in Climate Action course.", read: true },
    { id: 3, text: "🏆 Leaderboard updated, your class is #1!", read: false },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <nav
      className="container"
      style={{
        padding: "1rem 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg,var(--accent1),var(--accent3))",
            boxShadow: "0 8px 30px rgba(12,24,48,0.5)",
          }}
        >
          <strong style={{ fontSize: 18, color: "white" }}>GE</strong>
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>GameEd</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Gamified learning</div>
        </div>
      </Link>

      {/* Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Landing page → only Login */}
        {showLoginButton && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to="/auth">
              <button className="btn">Login</button>
            </Link>
          </motion.div>
        )}

        {/* Auth page → no buttons */}
        {showAllButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            {/* Profile → Teacher → Student → Rewards → Bell */}
            <Link to="/profile">
              <button className="btn">Profile</button>
            </Link>
            <Link to="/dashboard">
              <button className="btn">Teacher Dashboard</button>
            </Link>
            <Link to="/students">
              <button className="btn">Student Dashboard</button>
            </Link>
            <Link to="/rewards">
              <button className="btn">Rewards</button>
            </Link>
            <Link to="/games">
              <button className="btn">Games</button>
            </Link>

            {/* Notifications Bell */}
            <div style={{ position: "relative" }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "white",
                  position: "relative",
                }}
              >
                🔔
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-10px",
                      background: "red",
                      color: "white",
                      fontSize: "0.7rem",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontWeight: "700",
                    }}
                  >
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </motion.div>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: "2.2rem",
                      right: 0,
                      width: "280px",
                      background: "rgba(0,0,0,0.85)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: "1rem",
                      color: "white",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                      zIndex: 2000,
                    }}
                  >
                    {notifications.map((n) => (
                      <motion.div
                        key={n.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => markAsRead(n.id)}
                        style={{
                          margin: "0.5rem 0",
                          padding: "0.5rem 0.8rem",
                          fontSize: "0.9rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          border: n.read ? "1px solid transparent" : "1px solid limegreen",
                          background: n.read ? "rgba(255,255,255,0.05)" : "rgba(0,255,0,0.1)",
                          fontWeight: n.read ? "400" : "600",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {n.text}
                      </motion.div>
                    ))}

                    <Link
                      to="/notifications"
                      style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: "0.7rem",
                        color: "var(--accent2)",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      View All →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
