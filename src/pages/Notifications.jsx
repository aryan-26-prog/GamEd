import React from "react";
import { motion } from "framer-motion";

const sampleNotifications = [
  { id: 1, type: "mission", text: "🌱 You completed Tree Plantation Mission!", time: "2h ago", read: false },
  { id: 2, type: "course", text: "📘 New course available: Climate Action Basics", time: "5h ago", read: true },
  { id: 3, type: "leaderboard", text: "🏆 Your class 9A just reached 1st place!", time: "1d ago", read: false },
  { id: 4, type: "reminder", text: "⏳ Plastic Audit Mission deadline tomorrow!", time: "2d ago", read: true },
];

export default function Notifications() {
  return (
    <section className="container" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "2rem",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: "2rem",
          background: "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        🔔 Notifications
      </motion.h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {sampleNotifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
            style={{
              padding: "1rem 1.2rem",
              borderRadius: "12px",
              background: n.read ? "rgba(255,255,255,0.05)" : "rgba(34,197,94,0.1)",
              borderLeft: n.read ? "3px solid var(--accent2)" : "3px solid limegreen",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
            }}
          >
            <p style={{ margin: 0, fontSize: "1rem", color: "white" }}>{n.text}</p>
            <small style={{ color: "var(--muted)" }}>{n.time}</small>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
