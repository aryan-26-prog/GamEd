import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ✅ Dummy Data
const allTimeStudents = [
  { name: "Riya Verma", xp: 3200, badge: "🌍 Eco Champion", badgeDesc: "Top contributor in eco actions" },
  { name: "Arjun Singh", xp: 2850, badge: "🌱 Green Hero", badgeDesc: "Planted 50+ trees" },
  { name: "Mehul Jain", xp: 2500, badge: "💡 Energy Saver", badgeDesc: "Saved 1000+ kWh energy" },
  { name: "Priya Sharma", xp: 2300, badge: "🚰 Water Guardian", badgeDesc: "Reported 10+ water leaks" },
  { name: "Karan Patel", xp: 2000, badge: "♻️ Recycler", badgeDesc: "Led 20+ recycling drives" },
];

const weeklyWinners = [
  { name: "Riya Verma", xp: 1200, badge: "🔥 Streak Master", badgeDesc: "Completed missions daily" },
  { name: "Mehul Jain", xp: 980, badge: "⚡ Fast Learner", badgeDesc: "Quickly climbed leaderboard" },
  { name: "Arjun Singh", xp: 950, badge: "🌱 Eco Hero", badgeDesc: "Excellent in eco initiatives" },
];

const monthlyWinners = [
  { name: "Priya Sharma", xp: 3000, badge: "🌟 Star Performer", badgeDesc: "Outstanding month-long performance" },
  { name: "Riya Verma", xp: 2800, badge: "🌍 Climate Warrior", badgeDesc: "Led climate change awareness" },
  { name: "Karan Patel", xp: 2600, badge: "♻️ Recycler Pro", badgeDesc: "Recycled 500+ kg plastic" },
];

// ✅ Top Classes
const topClasses = [
  { class: "Grade 9A", xp: 7650 },
  { class: "Grade 8B", xp: 6900 },
  { class: "Grade 10C", xp: 6400 },
  { class: "Grade 7A", xp: 5900 },
];

// ✅ Trends for Top 3
const trendsData = [
  { week: "W1", Riya: 300, Arjun: 250, Mehul: 200 },
  { week: "W2", Riya: 600, Arjun: 480, Mehul: 400 },
  { week: "W3", Riya: 900, Arjun: 720, Mehul: 650 },
  { week: "W4", Riya: 1200, Arjun: 950, Mehul: 880 },
];

export default function Leaderboard() {
  const [tab, setTab] = useState("all");
  const [hoveredBadge, setHoveredBadge] = useState(null);

  const renderList = (list) =>
    list.map((item, i) => {
      const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🎖️";
      return (
        <motion.div
          key={item.name}
          whileHover={{ scale: 1.03, y: -3 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.9rem 1.2rem",
            borderRadius: "12px",
            marginBottom: "0.8rem",
            background:
              i === 0
                ? "linear-gradient(90deg,gold,orange)"
                : i === 1
                ? "linear-gradient(90deg,silver,gray)"
                : i === 2
                ? "linear-gradient(90deg,#cd7f32,#8b4513)"
                : "rgba(255,255,255,0.05)",
            color: i <= 2 ? "black" : "white",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontSize: "1.2rem" }}>{medal}</span>
            {item.name}
            <span
              style={{ fontSize: "0.9rem", cursor: "pointer" }}
              onMouseEnter={() => setHoveredBadge(item.badge)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              {item.badge}
            </span>
          </span>
          <span style={{ color: "var(--accent2)" }}>{item.xp} XP</span>

          {/* Tooltip */}
          {hoveredBadge === item.badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: "absolute",
                top: "-45px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.85)",
                padding: "0.5rem 0.8rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
                color: "white",
                zIndex: 10,
              }}
            >
              {item.badgeDesc}
            </motion.div>
          )}
        </motion.div>
      );
    });

  return (
    <section className="container" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      {/* ✅ Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "800",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          🏆 Leaderboard & Trends
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Celebrate top performers, classes & winners 🚀
        </p>
      </motion.div>

      {/* ✅ Tabs for Leaderboard */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        {["all", "weekly", "monthly"].map((t) => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              margin: "0 0.5rem",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              background:
                tab === t
                  ? "linear-gradient(90deg,var(--accent1),var(--accent2))"
                  : "rgba(255,255,255,0.08)",
              color: tab === t ? "white" : "var(--muted)",
              transition: "0.3s ease",
            }}
          >
            {t === "all" ? "🌍 All-Time" : t === "weekly" ? "📅 Weekly" : "📆 Monthly"}
          </motion.button>
        ))}
      </div>

      {/* ✅ Leaderboard List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "650px", margin: "0 auto 3rem" }}
      >
        {tab === "all" && renderList(allTimeStudents)}
        {tab === "weekly" && renderList(weeklyWinners)}
        {tab === "monthly" && renderList(monthlyWinners)}
      </motion.div>

      {/* ✅ Top Classes */}
      <motion.div
        className="card"
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ padding: "1.5rem", marginBottom: "2.5rem" }}
      >
        <h2 style={{ marginBottom: "1rem" }}>🏫 Top Classes</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {topClasses.map((c, i) => (
            <motion.li
              key={c.class}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.7rem 1rem",
                marginBottom: "0.6rem",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                fontWeight: "600",
              }}
            >
              <span>
                #{i + 1} {c.class}
              </span>
              <span>⚡ {c.xp} XP</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* ✅ XP Growth Trends */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ padding: "2rem", marginTop: "2.5rem" }}
      >
        <h3 style={{ marginBottom: "1rem" }}>📈 XP Growth Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="week" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="Riya" stroke="gold" strokeWidth={3} />
            <Line type="monotone" dataKey="Arjun" stroke="limegreen" strokeWidth={3} />
            <Line type="monotone" dataKey="Mehul" stroke="dodgerblue" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ✅ Insights Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          marginTop: "2.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "1.2rem",
            background: "linear-gradient(135deg,var(--accent2),var(--accent3))",
            color: "white",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>🌟 Most Active Student</h3>
          <p style={{ marginTop: "6px" }}>Riya Verma (3200 XP)</p>
        </div>
        <div
          style={{
            padding: "1.2rem",
            background: "linear-gradient(135deg,var(--accent1),var(--accent2))",
            color: "white",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>🚀 Fastest Growing Class</h3>
          <p style={{ marginTop: "6px" }}>Grade 9A (7650 XP)</p>
        </div>
      </motion.div>
    </section>
  );
}
