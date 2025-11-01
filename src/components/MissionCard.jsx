import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

export default function MissionCard({
  title,
  desc,
  points,
  difficulty,
  category = "environment",
  missionId,
  userRole = "student",
  isActive = true,
  image = null,
  deadline = null,
  submissionsCount = 0
}) {
  const navigate = useNavigate();

  // Category icons mapping
  const categoryIcons = {
    environment: "🌱",
    coding: "💻", 
    math: "📐",
    science: "🔬",
    language: "📚",
    creative: "🎨",
    recycling: "♻️",
    energy: "💡",
    default: "🎯"
  };

  // Difficulty colors
  const difficultyColors = {
    easy: "limegreen",
    medium: "orange", 
    hard: "crimson"
  };

  // Difficulty labels
  const difficultyLabels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard"
  };

  // Default images based on category
  const defaultImages = {
    environment: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
    coding: "https://cdn-icons-png.flaticon.com/512/1006/1006363.png",
    math: "https://cdn-icons-png.flaticon.com/512/2103/2103795.png",
    science: "https://cdn-icons-png.flaticon.com/512/684/684809.png",
    language: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
    creative: "https://cdn-icons-png.flaticon.com/512/1055/1055666.png",
    recycling: "https://cdn-icons-png.flaticon.com/512/1055/1055666.png",
    energy: "https://cdn-icons-png.flaticon.com/512/993/993734.png",
    default: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
  };

  // ✅ SIMPLE CLICK HANDLER - Direct submit page
  const handleCardClick = () => {
    navigate(`/mission/${missionId}/submit`);
  };

  const getCategoryDisplay = (cat) => {
    const categoryMap = {
      environment: "Environment",
      coding: "Coding",
      math: "Mathematics", 
      science: "Science",
      language: "Language",
      creative: "Creative",
      recycling: "Recycling",
      energy: "Energy"
    };
    return categoryMap[cat] || cat;
  };

  const getMissionImage = () => {
    return image || defaultImages[category] || defaultImages.default;
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="card"
      style={{
        padding: "1.5rem",
        borderRadius: "var(--radius)",
        background: isActive ? "rgba(255,255,255,0.06)" : "rgba(128,128,128,0.1)",
        backdropFilter: "blur(12px)",
        boxShadow: isActive ? "0 6px 18px rgba(0,0,0,0.25)" : "0 4px 12px rgba(128,128,128,0.2)",
        cursor: isActive ? "pointer" : "not-allowed",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(128,128,128,0.3)",
        opacity: isActive ? 1 : 0.7,
        position: "relative"
      }}
      onClick={isActive ? handleCardClick : undefined}
    >
      {/* Inactive Overlay */}
      {!isActive && (
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(255,0,0,0.8)",
          color: "white",
          padding: "0.3rem 0.6rem",
          borderRadius: "12px",
          fontSize: "0.7rem",
          fontWeight: "bold",
          zIndex: 2
        }}>
          INACTIVE
        </div>
      )}

      {/* Thumbnail */}
      <img
        src={getMissionImage()}
        alt="mission"
        style={{
          width: "70px",
          marginBottom: "1rem",
          filter: isActive ? "drop-shadow(0 0 10px rgba(0,0,0,0.3))" : "grayscale(100%)",
          opacity: isActive ? 1 : 0.5
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
        {categoryIcons[category] || categoryIcons.default} {getCategoryDisplay(category)}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: "700",
          background: isActive 
            ? "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))"
            : "linear-gradient(90deg,gray,darkgray)",
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
          color: isActive ? "var(--muted)" : "gray",
          fontSize: "0.95rem",
          lineHeight: "1.5rem",
          flexGrow: 1,
        }}
      >
        {desc}
      </p>

      {/* Difficulty + XP */}
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
            background: `rgba(${difficultyColors[difficulty] || 'var(--accent2)'}, 0.2)`,
            padding: "0.35rem 0.8rem",
            borderRadius: "20px",
            color: difficultyColors[difficulty] || "var(--accent2)",
            fontWeight: "600",
            border: `1px solid ${difficultyColors[difficulty] || 'var(--accent2)'}`
          }}
        >
          ⚡ {difficultyLabels[difficulty] || difficulty}
        </span>

        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: "700",
            color: isActive ? "var(--accent3)" : "gray",
          }}
        >
          ⭐ {points} XP
        </span>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={isActive ? { scale: 1.05 } : {}}
        whileTap={isActive ? { scale: 0.95 } : {}}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          border: "none",
          borderRadius: "8px",
          background: isActive 
            ? "linear-gradient(90deg,var(--accent1),var(--accent2))"
            : "linear-gradient(90deg,gray,darkgray)",
          color: "white",
          fontWeight: "600",
          cursor: isActive ? "pointer" : "not-allowed",
          width: "100%",
          opacity: isActive ? 1 : 0.6
        }}
        onClick={isActive ? handleCardClick : undefined}
      >
        {isActive ? "🚀 Submit Mission" : "❌ Mission Inactive"}
      </motion.button>

      {/* Click Info */}
      {isActive && (
        <div style={{
          marginTop: "0.8rem",
          padding: "0.5rem",
          background: "rgba(0,255,0,0.1)",
          border: "1px solid rgba(0,255,0,0.2)",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <p style={{
            margin: 0,
            fontSize: "0.8rem",
            color: "limegreen",
            fontWeight: "600"
          }}>
            Click to submit and earn {points} XP!
          </p>
        </div>
      )}
    </motion.div>
  );
}