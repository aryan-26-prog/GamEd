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

// Dummy students data
const studentsData = [
  { name: "Aryan Sharma", class: "9A", missions: 12, xp: 1200, progress: 80 },
  { name: "Priya Verma", class: "8B", missions: 9, xp: 980, progress: 65 },
  { name: "Rohit Singh", class: "7C", missions: 7, xp: 700, progress: 50 },
  { name: "Ananya Gupta", class: "9A", missions: 15, xp: 1500, progress: 95 },
  { name: "Kabir Mehta", class: "8B", missions: 5, xp: 520, progress: 35 },
];

// Dummy assignments
const assignmentsData = [
  {
    title: "🌱 Environmental Essay",
    deadline: "20 Sept 2025",
    status: "Pending",
    xp: 100,
  },
  {
    title: "♻️ Recycling Project",
    deadline: "25 Sept 2025",
    status: "Completed",
    xp: 150,
  },
  {
    title: "💡 Energy Audit Report",
    deadline: "28 Sept 2025",
    status: "Pending",
    xp: 120,
  },
];

// Dummy XP progress chart
const xpData = [
  { week: "W1", xp: 300 },
  { week: "W2", xp: 600 },
  { week: "W3", xp: 900 },
  { week: "W4", xp: 1500 },
];

// Dummy upcoming missions
const upcomingMissionsData = [
  {
    title: "🌍 Water Conservation Challenge",
    desc: "Save at least 10 liters of water daily for a week.",
    deadline: "30 Sept 2025",
    xp: 120,
  },
  {
    title: "🌿 Green Innovation Idea",
    desc: "Submit an idea to reduce and reuse campus waste.",
    deadline: "05 Oct 2025",
    xp: 150,
  },
  {
    title: "🔌 Energy Saver Drive",
    desc: "Turn off unused devices and record energy savings.",
    deadline: "10 Oct 2025",
    xp: 200,
  },
];

export default function Students() {
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [assignments, setAssignments] = useState(assignmentsData);
  const [notifications, setNotifications] = useState([
    "🌱 Aryan completed Tree Plantation",
    "♻️ Priya submitted Recycling Project",
    "💡 Rohit started Energy Audit Report",
  ]);
  const [upcomingMissions, setUpcomingMissions] = useState(
    upcomingMissionsData.map((m) => ({ ...m, reminderSet: false }))
  );

  // Filtered students
  const filteredStudents = studentsData.filter((s) => {
    return (
      (filterClass === "All" || s.class === filterClass) &&
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Mark assignment as completed
  const handleCompleteAssignment = (index) => {
    const updated = [...assignments];
    updated[index].status = "Completed";
    setAssignments(updated);

    setNotifications([
      `${updated[index].title} marked as Completed ✅`,
      ...notifications,
    ]);
  };

  // Set Reminder for upcoming missions
  const handleSetReminder = (index) => {
    const updated = [...upcomingMissions];
    updated[index].reminderSet = true;
    setUpcomingMissions(updated);

    setNotifications([
      `🔔 Reminder set for ${updated[index].title}`,
      ...notifications,
    ]);
  };

  return (
    <section className="container" style={{ paddingTop: "6rem" }}>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "700",
            background:
              "linear-gradient(90deg,var(--accent1),var(--accent2),var(--accent3))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          👩‍🎓 Students Dashboard
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Track student progress, assignments & reports
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { label: "Total Students", value: studentsData.length },
          {
            label: "Avg XP",
            value: `${Math.round(
              studentsData.reduce((a, s) => a + s.xp, 0) / studentsData.length
            )}`,
          },
          { label: "Top Class", value: "9A" },
          {
            label: "Pending Assignments",
            value: assignments.filter((a) => a.status === "Pending").length,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ textAlign: "center", padding: "1rem" }}
          >
            <h2 style={{ color: "var(--accent2)", margin: 0 }}>{stat.value}</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "0.7rem 1rem",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
          }}
        />
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <option value="All">All Classes</option>
          <option value="9A">Class 9A</option>
          <option value="8B">Class 8B</option>
          <option value="7C">Class 7C</option>
        </select>
      </div>

      {/* Students Table */}
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "3rem",
        }}
      >
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.1)" }}>
            <th style={{ padding: "1rem", textAlign: "left" }}>Name</th>
            <th>Class</th>
            <th>Missions</th>
            <th>XP</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <td style={{ padding: "1rem" }}>{s.name}</td>
              <td style={{ textAlign: "center" }}>{s.class}</td>
              <td style={{ textAlign: "center" }}>{s.missions}</td>
              <td style={{ textAlign: "center", color: "var(--accent2)" }}>
                {s.xp}
              </td>
              <td style={{ width: "200px", padding: "0.8rem" }}>
                <div
                  style={{
                    height: "8px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background:
                        "linear-gradient(90deg, var(--accent1), var(--accent2))",
                    }}
                  />
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Assignments Section */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <h2 style={{ marginBottom: "1rem" }}>📚 Student Assignments</h2>
        <div
          style={{
            display: "grid",
            gap: "1.2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {assignments.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "1.2rem",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>{a.title}</h3>
              <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
                Deadline: {a.deadline}
              </p>
              <p
                style={{
                  marginBottom: "0.5rem",
                  color: a.status === "Completed" ? "limegreen" : "orange",
                  fontWeight: "600",
                }}
              >
                {a.status}
              </p>
              <p style={{ color: "var(--accent2)", marginBottom: "0.8rem" }}>
                XP: {a.xp}
              </p>
              {a.status === "Pending" && (
                <button
                  className="btn"
                  onClick={() => handleCompleteAssignment(i)}
                >
                  ✅ Mark Completed
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ✅ Upcoming Missions Section */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <h2 style={{ marginBottom: "1rem" }}>🚀 Upcoming Missions</h2>
        <div
          style={{
            display: "grid",
            gap: "1.2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {upcomingMissions.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "1.2rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>{m.title}</h3>
              <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
                {m.desc}
              </p>
              <p style={{ color: "orange", fontWeight: "600" }}>
                Deadline: {m.deadline}
              </p>
              <p style={{ color: "var(--accent2)", marginBottom: "0.5rem" }}>
                XP: {m.xp}
              </p>
              <button
                className="btn"
                disabled={m.reminderSet}
                onClick={() => handleSetReminder(i)}
                style={{
                  background: m.reminderSet
                    ? "gray"
                    : "linear-gradient(90deg,var(--accent1),var(--accent2))",
                  cursor: m.reminderSet ? "not-allowed" : "pointer",
                }}
              >
                {m.reminderSet ? "✅ Reminder Set" : "🔔 Set Reminder"}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* XP Progress Chart + Notifications */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Chart */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ padding: "1.5rem" }}
        >
          <h3>📈 XP Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={xpData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="week" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="xp"
                stroke="var(--accent2)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Notifications */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ padding: "1.5rem" }}
        >
          <h3>🔔 Recent Activity</h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            {notifications.map((n, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  marginBottom: "0.6rem",
                }}
              >
                {n}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
