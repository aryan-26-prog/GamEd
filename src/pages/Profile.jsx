import React, { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

// Dummy profile stats
const user = {
  name: "Rohit Sharma",
  class: "Grade 9A",
  level: "Eco Enthusiast",
  xp: 1850,
  totalXP: 3000,
  profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
};

const progressData = [
  { week: "W1", xp: 200 },
  { week: "W2", xp: 450 },
  { week: "W3", xp: 850 },
  { week: "W4", xp: 1200 },
  { week: "W5", xp: 1850 },
];

const missionStats = [
  { type: "Completed", value: 15 },
  { type: "Pending", value: 5 },
  { type: "Failed", value: 2 },
];

const assignments = [
  { title: "Recycling Project", due: "25 Sept", status: "Completed" },
  { title: "Energy Audit Report", due: "28 Sept", status: "Pending" },
];

const upcomingMissions = [
  { title: "🌊 Water Conservation", due: "30 Sept 2025", xp: 120 },
  { title: "🌍 Green Innovation", due: "05 Oct 2025", xp: 150 },
];

const recentActivity = [
  "✅ Completed Plastic Audit",
  "⭐ Reached 1800 XP milestone",
  "🚀 Joined Energy Saver Mission",
];

// Achievements
const achievementsData = [
  { title: "🌱 Green Starter", desc: "Completed first eco mission" },
  { title: "♻️ Waste Warrior", desc: "Recycled 100+ items" },
  { title: "💡 Energy Saver", desc: "Saved 500 kWh energy" },
  { title: "🌍 Planet Protector", desc: "Reached Level 5" },
];

// Certificates
const certificatesData = [
  {
    title: "🌱 Eco Warrior",
    desc: "Completed 10 environment missions",
    date: "10 Sept 2025",
    img: "https://img.icons8.com/color/96/medal.png",
  },
  {
    title: "♻️ Recycling Champion",
    desc: "Led a campus-wide recycling drive",
    date: "18 Sept 2025",
    img: "https://img.icons8.com/color/96/trophy.png",
  },
  {
    title: "💡 Energy Saver",
    desc: "Saved 1000+ kWh in audit missions",
    date: "20 Sept 2025",
    img: "https://img.icons8.com/color/96/diploma.png",
  },
];

// Community Questions (dummy)
const initialQuestions = [
  {
    id: 1,
    user: "Student1",
    question: "How can I save water at home?",
    answers: [],
  },
  {
    id: 2,
    user: "Student2",
    question: "What is the best way to recycle plastic?",
    answers: [],
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [questions, setQuestions] = useState(initialQuestions);
  const [answerInputs, setAnswerInputs] = useState({}); // questionId: answer text
  const [newQuestion, setNewQuestion] = useState(""); // student question input

  const xpPercent = Math.round((user.xp / user.totalXP) * 100);

  // ✅ Generate PDF Certificate
  const generateCertificatePDF = (cert) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Certificate of Achievement", 60, 40);

    doc.setFontSize(16);
    doc.text(`This is proudly presented to`, 65, 60);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(user.name, 80, 80);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`${cert.title} - ${cert.desc}`, 30, 100, { maxWidth: 150 });

    doc.setFontSize(12);
    doc.text(`Date: ${cert.date}`, 30, 120);

    doc.save(`${cert.title}.pdf`);
  };

  // Teacher answer input handling
  const handleAnswerChange = (qId, value) => {
    setAnswerInputs({ ...answerInputs, [qId]: value });
  };

  const handleAddAnswer = (qId) => {
    if (!answerInputs[qId]) return;
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              answers: [
                ...q.answers,
                { user: "Teacher", text: answerInputs[qId] },
              ],
            }
          : q
      )
    );
    setAnswerInputs({ ...answerInputs, [qId]: "" });
  };

  // Student question input
  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    const nextId = questions.length + 1;
    setQuestions([
      ...questions,
      { id: nextId, user: "Student", question: newQuestion, answers: [] },
    ]);
    setNewQuestion("");
  };

  return (
    <section className="container" style={{ paddingTop: "6rem" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "700",
            background:
              "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          👤 My Profile
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Track your journey, achievements & certificates
        </p>
      </motion.div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {["overview", "achievements", "certificates", "community"].map(
          (tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn"
              style={{
                background:
                  activeTab === tab
                    ? "linear-gradient(90deg,var(--accent2),var(--accent3))"
                    : "rgba(255,255,255,0.05)",
                border:
                  activeTab === tab
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                color: "white",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          )
        )}
      </div>

      {/* ================== Overview Tab ================== */}
      {activeTab === "overview" && (
        <div>
          {/* Profile Card */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <img
                src={user.profilePic}
                alt="Profile"
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  border: "3px solid var(--accent1)",
                }}
              />
              <div>
                <h2 style={{ margin: 0 }}>{user.name}</h2>
                <p style={{ margin: 0, color: "var(--muted)" }}>{user.class}</p>
                <p style={{ margin: "6px 0 0", fontWeight: 600 }}>
                  ⭐ {user.level}
                </p>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: "8px solid var(--accent2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--accent2)",
                }}
              >
                {xpPercent}%
              </motion.div>
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                {user.xp}/{user.totalXP} XP
              </p>
            </div>
          </motion.div>

          {/* Charts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <motion.div className="card" style={{ padding: "1rem" }}>
              <h3>📈 XP Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="week" stroke="var(--muted)" />
                  <YAxis stroke="var(--muted)" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="xp"
                    stroke="var(--accent1)"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div className="card" style={{ padding: "1rem" }}>
              <h3>📊 Mission Stats</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={missionStats}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="type" stroke="var(--muted)" />
                  <YAxis stroke="var(--muted)" />
                  <Tooltip />
                  <Bar dataKey="value" fill="var(--accent2)" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Assignments + Upcoming Missions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <motion.div className="card" style={{ padding: "1.5rem" }}>
              <h3>📚 Assignments</h3>
              {assignments.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "0.8rem 1rem",
                    borderRadius: "10px",
                    marginBottom: "0.8rem",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{a.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                    Due: {a.due} • {a.status}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div className="card" style={{ padding: "1.5rem" }}>
              <h3>🚀 Upcoming Missions</h3>
              {upcomingMissions.map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "0.8rem 1rem",
                    borderRadius: "10px",
                    marginBottom: "0.8rem",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{m.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                    Due: {m.due} • {m.xp} XP
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div className="card" style={{ padding: "1.5rem" }}>
            <h3>🔔 Recent Activity</h3>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
              {recentActivity.map((n, i) => (
                <li
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    marginBottom: "0.6rem",
                  }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      {/* ================== Achievements Tab ================== */}
      {activeTab === "achievements" && (
        <motion.div className="card" style={{ padding: "2rem" }}>
          <h2>🏆 Achievements</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            {achievementsData.map((a, i) => (
              <motion.div
                key={i}
                className="card"
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "1.2rem",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <h3>{a.title}</h3>
                <p style={{ color: "var(--muted)" }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ================== Certificates Tab ================== */}
      {activeTab === "certificates" && (
        <motion.div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "1.8rem",
              background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            📜 Certificates & Rewards
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {certificatesData.map((c, i) => (
              <motion.div
                key={i}
                className="card"
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "1.5rem",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  style={{
                    width: "80px",
                    margin: "0 auto 1rem",
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
                  }}
                />
                <h3 style={{ margin: "0.5rem 0" }}>{c.title}</h3>
                <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
                  {c.desc}
                </p>
                <p style={{ fontSize: "0.9rem", color: "var(--accent2)" }}>
                  🗓 {c.date}
                </p>
                <motion.button
                  className="btn"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => generateCertificatePDF(c)}
                  style={{ marginTop: "1rem" }}
                >
                  📥 Download Certificate
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ================== Community Tab ================== */}
      {activeTab === "community" && (
        <motion.div className="card" style={{ padding: "2rem" }}>
          <h2>💬 Students & Teachers Discussion Board</h2>

          {/* Student Add Question */}
          <div style={{ margin: "1rem 0", display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
              }}
            />
            <motion.button
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddQuestion}
            >
              📝 Ask
            </motion.button>
          </div>

          {/* Questions List */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {questions.map((q) => (
              <motion.div
                key={q.id}
                className="card"
                whileHover={{ scale: 1.02 }}
                style={{ padding: "1rem", background: "rgba(255,255,255,0.05)" }}
              >
                <p style={{ fontWeight: "600" }}>👤 {q.user}</p>
                <p>{q.question}</p>

                {/* Answers */}
                {q.answers.length > 0 && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      paddingLeft: "1rem",
                      borderLeft: "2px solid var(--accent2)",
                    }}
                  >
                    {q.answers.map((a, i) => (
                      <p key={i} style={{ margin: "0.2rem 0" }}>
                        <strong>{a.user}:</strong> {a.text}
                      </p>
                    ))}
                  </div>
                )}

                {/* Teacher Answer Input */}
                <div style={{ marginTop: "0.8rem" }}>
                  <input
                    type="text"
                    placeholder="Teacher: Type your answer..."
                    value={answerInputs[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    style={{
                      width: "80%",
                      padding: "0.5rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      marginRight: "0.5rem",
                      background: "rgba(255,255,255,0.05)",
                      color: "white",
                    }}
                  />
                  <motion.button
                    className="btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddAnswer(q.id)}
                  >
                    ✅ Submit
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
