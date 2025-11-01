import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "🌱 New mission assigned!", read: false },
    { id: 2, text: "📘 You enrolled in Climate Action course.", read: true },
    { id: 3, text: "🏆 Leaderboard updated, your class is #1!", read: false },
  ]);

  // Check if user is logged in
  useEffect(() => {
    checkAuth();
  }, [location]);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
        
        // Optional: Verify token with backend
        try {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            // Token invalid, logout user
            logout();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload(); // Refresh to update state
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Determine what buttons to show
  const showLoginButton = location.pathname === "/" && !user;
  const showAuthButtons = location.pathname !== "/auth" && !user;
  const showUserButtons = user;

  // Get user display info
  const getUserDisplayInfo = () => {
    if (!user) return null;
    
    return {
      name: user.name || 'User',
      points: user.points || 0,
      level: user.level || 1,
      role: user.role || 'student',
      initial: user.name ? user.name.charAt(0).toUpperCase() : 'U'
    };
  };

  const userInfo = getUserDisplayInfo();

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
        to={user ? "/home" : "/"}
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
        {/* Landing page → only Login when no user */}
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

        {/* Show auth buttons when not logged in */}
        {showAuthButtons && location.pathname !== "/" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link to="/auth">
              <button className="btn">Login / Register</button>
            </Link>
          </motion.div>
        )}

        {/* User is logged in - show all buttons */}
        {showUserButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            {/* User Info */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent2), var(--accent1))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                {userInfo?.initial}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                  {userInfo?.name}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                  Lvl {userInfo?.level} • {userInfo?.points} pts
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons based on role */}
            <Link to="/profile">
              <button className="btn" style={{ padding: "0.5rem 1rem" }}>Profile</button>
            </Link>

            {(user.role === 'teacher' || user.role === 'admin') && (
              <Link to="/dashboard">
                <button className="btn" style={{ padding: "0.5rem 1rem" }}>Teacher Dashboard</button>
              </Link>
            )}

            <Link to="/students">
              <button className="btn" style={{ padding: "0.5rem 1rem" }}>Student Dashboard</button>
            </Link>

            <Link to="/rewards">
              <button className="btn" style={{ padding: "0.5rem 1rem" }}>Rewards</button>
            </Link>

            <Link to="/games">
              <button className="btn" style={{ padding: "0.5rem 1rem" }}>Games</button>
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

            {/* Logout Button */}
            <motion.button
              className="btn"
              onClick={logout}
              style={{ 
                padding: "0.5rem 1rem",
                background: "rgba(255,0,0,0.2)",
                border: "1px solid rgba(255,0,0,0.3)"
              }}
              whileHover={{ 
                scale: 1.05,
                background: "rgba(255,0,0,0.3)"
              }}
            >
              Logout
            </motion.button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            Loading...
          </div>
        )}
      </div>
    </nav>
  );
}