import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy chart data
const progressData = [
  { week: "Week 1", points: 300 },
  { week: "Week 2", points: 500 },
  { week: "Week 3", points: 800 },
  { week: "Week 4", points: 1200 },
];

// Dummy leaderboard
const leaderboard = [
  { rank: 1, class: "9A", points: 3450 },
  { rank: 2, class: "8B", points: 2980 },
  { rank: 3, class: "7C", points: 2440 },
];

// Dummy reports
const studentReports = [
  { name: "Riya Verma", class: "9A", missions: 5, xp: 540 },
  { name: "Arjun Singh", class: "9A", missions: 4, xp: 460 },
  { name: "Priya Sharma", class: "9A", missions: 3, xp: 390 },
];

const classReports = [
  { class: "9A", totalXP: 3450, avgXP: 320 },
  { class: "8B", totalXP: 2980, avgXP: 310 },
  { class: "7C", totalXP: 2440, avgXP: 280 },
];

// 📥 CSV Download Helper
const downloadCSV = (data, filename) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  data.forEach((row) => {
    csvRows.push(Object.values(row).join(","));
  });
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};


export default function TeacherDashboard() {
  // 🎯 Missions
  const [missions, setMissions] = useState([
    { title: "🌱 Tree Plantation", desc: "Plant 5 saplings near school.", points: 100, status: "Active" },
    { title: "♻️ Plastic Audit", desc: "Collect & record plastic waste.", points: 80, status: "Active" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newMission, setNewMission] = useState({ title: "", desc: "", points: "", status: "Active" });

  const handleAddMission = (e) => {
    e.preventDefault();
    if (!newMission.title || !newMission.desc || !newMission.points) return;
    setMissions([...missions, { ...newMission, points: Number(newMission.points) }]);
    setNewMission({ title: "", desc: "", points: "", status: "Active" });
    setShowForm(false);
  };

  const handleDeleteMission = (index) => {
    setMissions(missions.filter((_, i) => i !== index));
  };

  // 🔔 Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Riya completed 🌱 Tree Plantation mission.", read: false },
    { id: 2, text: "Arjun submitted ♻️ Plastic Audit for review.", read: false },
    { id: 3, text: "Priya earned 120 XP from 💡 Energy Saver mission.", read: true },
  ]);
  const [showNotifs, setShowNotifs] = useState(false);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // 📩 Student Submissions
  const [submissions, setSubmissions] = useState([
    { id: 1, student: "Riya Verma", mission: "🌱 Tree Plantation", status: "Pending" },
    { id: 2, student: "Arjun Singh", mission: "♻️ Plastic Audit", status: "Pending" },
    { id: 3, student: "Priya Sharma", mission: "💡 Energy Saver", status: "Pending" },
  ]);

  const handleSubmission = (id, action) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: action } : s)));
  };

  return (
    <section className="container" style={{ paddingTop: "6rem" }}>
      {/* Header with Notifications */}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              background: "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginBottom: "0.5rem",
            }}
          >
            📊 Teacher Dashboard
          </h1>
          <p style={{ color: "var(--muted)" }}>Manage missions, submissions, leaderboard, chat & reports</p>
        </div>

        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <button className="btn" style={{ position: "relative" }} onClick={() => setShowNotifs(!showNotifs)}>
            🔔 Notifications
            {notifications.some((n) => !n.read) && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "6px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "0.7rem",
                  padding: "2px 5px",
                }}
              >
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showNotifs && (
            <div
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                width: "300px",
                background: "rgba(0,0,0,0.9)",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                zIndex: 1000,
              }}
            >
              <h4 style={{ margin: "0 0 0.8rem", color: "var(--accent2)" }}>Recent Alerts</h4>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    marginBottom: "0.6rem",
                    padding: "0.5rem",
                    borderRadius: "6px",
                    background: n.read ? "rgba(255,255,255,0.05)" : "rgba(0,255,0,0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: n.read ? "var(--muted)" : "white", fontSize: "0.9rem" }}>{n.text}</span>
                  {!n.read && (
                    <button
                      className="btn"
                      style={{ background: "transparent", fontSize: "0.75rem", padding: "0.2rem 0.5rem", color: "var(--accent2)" }}
                      onClick={() => handleMarkAsRead(n.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Weekly Progress + Leaderboard */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Chart */}
        <motion.div className="card" style={{ padding: "1.5rem" }} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h3>📈 Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="week" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="points" stroke="var(--accent2)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Leaderboard */}
        <motion.div className="card" style={{ padding: "1.5rem" }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <h3>🏆 Leaderboard</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {leaderboard.map((item) => (
              <li key={item.rank} style={{ marginBottom: "0.8rem", padding: "0.6rem 0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "white" }}>{item.rank}. Class {item.class}</span>
                <span style={{ color: "var(--accent2)", fontWeight: "600" }}>{item.points} pts</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Student Submissions */}
      <motion.div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3>📩 Student Submissions</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.1)" }}>
              <th style={{ padding: "0.6rem" }}>Student</th>
              <th>Mission</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} style={{ textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <td style={{ padding: "0.6rem" }}>{s.student}</td>
                <td>{s.mission}</td>
                <td style={{ color: s.status === "Approved" ? "limegreen" : s.status === "Rejected" ? "crimson" : "orange", fontWeight: "600" }}>
                  {s.status}
                </td>
                <td>
                  {s.status === "Pending" ? (
                    <>
                      <button className="btn" style={{ marginRight: "0.5rem" }} onClick={() => handleSubmission(s.id, "Approved")}>✅ Approve</button>
                      <button className="btn" style={{ background: "crimson" }} onClick={() => handleSubmission(s.id, "Rejected")}>❌ Reject</button>
                    </>
                  ) : (
                    <span style={{ color: "var(--muted)" }}>No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Mission Management */}
      <motion.div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3>🎯 Mission Management</h3>
          <button className="btn" onClick={() => setShowForm(true)}>➕ Add Mission</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <th style={{ padding: "0.6rem" }}>Title</th>
              <th>Description</th>
              <th>Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((m, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.6rem" }}>{m.title}</td>
                <td style={{ padding: "0.6rem" }}>{m.desc}</td>
                <td style={{ padding: "0.6rem" }}>{m.points}</td>
                <td style={{ padding: "0.6rem", color: m.status === "Active" ? "limegreen" : "orange", fontWeight: "600" }}>{m.status}</td>
                <td style={{ padding: "0.6rem" }}>
                  <button className="btn" style={{ marginRight: "0.5rem" }}>Edit</button>
                  <button className="btn" style={{ background: "crimson" }} onClick={() => handleDeleteMission(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* ➕ Add Mission Modal */}
      {showForm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <motion.div className="card" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} style={{ padding: "2rem", maxWidth: "500px", width: "100%" }}>
            <h3>Add New Mission</h3>
            <form onSubmit={handleAddMission} style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
              <input type="text" placeholder="Title" value={newMission.title} onChange={(e) => setNewMission({ ...newMission, title: e.target.value })} required />
              <textarea placeholder="Description" value={newMission.desc} onChange={(e) => setNewMission({ ...newMission, desc: e.target.value })} required />
              <input type="number" placeholder="Points" value={newMission.points} onChange={(e) => setNewMission({ ...newMission, points: e.target.value })} required />
              <select value={newMission.status} onChange={(e) => setNewMission({ ...newMission, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" className="btn" style={{ background: "gray", marginRight: "0.5rem" }} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn">Add</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      

      {/* 📝 Reports */}
      <motion.div className="card" style={{ padding: "1.5rem" }}>
        <h2>📝 Reports</h2>
        <h3 style={{ marginTop: "1rem" }}>👩‍🎓 Student Reports</h3>
        <table style={{ width: "100%", marginBottom: "1rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.1)" }}>
              <th style={{ padding: "0.6rem" }}>Name</th>
              <th>Class</th>
              <th>Missions</th>
              <th>XP</th>
            </tr>
          </thead>
          <tbody>
            {studentReports.map((s) => (
              <tr key={s.name} style={{ textAlign: "center" }}>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>{s.missions}</td>
                <td>{s.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={() => downloadCSV(studentReports, "student_reports.csv")}>⬇️ Download Student Report</button>

        <h3 style={{ marginTop: "2rem" }}>🏫 Class Reports</h3>
        <table style={{ width: "100%", marginBottom: "1rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.1)" }}>
              <th style={{ padding: "0.6rem" }}>Class</th>
              <th>Total XP</th>
              <th>Avg XP</th>
            </tr>
          </thead>
          <tbody>
            {classReports.map((c) => (
              <tr key={c.class} style={{ textAlign: "center" }}>
                <td>{c.class}</td>
                <td>{c.totalXP}</td>
                <td>{c.avgXP}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={() => downloadCSV(classReports, "class_reports.csv")}>⬇️ Download Class Report</button>
      </motion.div>
    </section>
  );
}
