import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

export default function MissionCard({
  title,
  desc,
  badge,
  points,
  progress = null,
  image = "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
  category = "Environment",
  deadline = "30 Sept 2025",
  type = "Team", 
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="card"
      style={{
        padding: "1.5rem",
        borderRadius: "var(--radius)",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Thumbnail */}
      <img
        src={image}
        alt="mission"
        style={{
          width: "70px",
          marginBottom: "1rem",
          filter: "drop-shadow(0 0 10px rgba(0,0,0,0.3))",
        }}
      />

      {/* Category */}
      <span
        style={{
          fontSize: "0.8rem",
          background: "rgba(255,255,255,0.1)",
          padding: "0.25rem 0.7rem",
          borderRadius: "20px",
          color: "var(--accent2)",
          fontWeight: "600",
          alignSelf: "flex-start",
          marginBottom: "0.6rem",
        }}
      >
        📂 {category}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: "700",
          background:
            "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: "var(--muted)",
          fontSize: "0.95rem",
          lineHeight: "1.5rem",
          flexGrow: 1,
        }}
      >
        {desc}
      </p>

      {/* Badge + XP + Type */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.85rem",
            background: "rgba(255,255,255,0.1)",
            padding: "0.35rem 0.8rem",
            borderRadius: "20px",
            color: "var(--accent2)",
            fontWeight: "600",
          }}
        >
          🏅 {badge}
        </span>
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: "700",
            color: "var(--accent3)",
          }}
        >
          ⭐ {points} XP
        </span>
        <span
          style={{
            fontSize: "0.85rem",
            background: "rgba(255,255,255,0.15)",
            padding: "0.3rem 0.7rem",
            borderRadius: "20px",
            color: "white",
          }}
        >
          {type === "Team" ? "👥 Team Mission" : "🧑 Solo Mission"}
        </span>
      </div>

      {/* Deadline */}
      <p
        style={{
          marginTop: "0.8rem",
          fontSize: "0.85rem",
          color: "orange",
          fontWeight: "600",
        }}
      >
        ⏳ Due: {deadline}
      </p>

      {/* Progress Bar */}
      {progress !== null && (
        <div style={{ marginTop: "0.8rem" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              height: "8px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg,var(--accent1),var(--accent2))",
                borderRadius: "8px",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              marginTop: "0.3rem",
              textAlign: "right",
              color: "var(--muted)",
            }}
          >
            {progress}% Complete
          </p>
        </div>
      )}

      {/* Join Button */}
      <Link to="/submit-mission" style={{ textDecoration: "none" }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1rem",
            border: "none",
            borderRadius: "8px",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
          }}
        >
          🚀 Join Mission
        </motion.button>
      </Link>
    </motion.div>
  );
}
