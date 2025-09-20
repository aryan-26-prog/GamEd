import React from "react";
import { motion } from "framer-motion";

export default function Leaderboard({ items }) {
  return (
    <motion.div
      className="card"
      style={{
        padding: "1.5rem",
        borderRadius: "var(--radius)",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3
        style={{
          marginBottom: "1rem",
          fontSize: "1.3rem",
          fontWeight: "700",
          background:
            "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        🏆 Class Leaderboard
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map((item, i) => {
          const medal =
            i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🎖️";

          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                background:
                  i === 0
                    ? "linear-gradient(90deg, gold, orange)"
                    : i === 1
                    ? "linear-gradient(90deg, silver, gray)"
                    : i === 2
                    ? "linear-gradient(90deg, #cd7f32, #8b4513)"
                    : "rgba(255,255,255,0.05)",
                color: i <= 2 ? "black" : "white",
                fontWeight: "600",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{medal}</span>
                {item.name}
              </span>
              <span style={{ color: "var(--accent2)" }}>{item.points} XP</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
