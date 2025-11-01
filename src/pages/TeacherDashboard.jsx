import React, { useState, useEffect } from "react";
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
  const [user, setUser] = useState(null);
  const [backendMissions, setBackendMissions] = useState([]);
  const [realSubmissions, setRealSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // 🎯 Missions
  const [showForm, setShowForm] = useState(false);
  const [newMission, setNewMission] = useState({ 
    title: "", 
    description: "", 
    points: "", 
    status: "Active",
    difficulty: "medium",
    category: "environment",
    instructions: "Complete the mission as described"
  });

  // 🔔 Notifications
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (userData) {
        setUser(JSON.parse(userData));
      }

      // Fetch missions from backend
      const missionsResponse = await fetch('http://localhost:5000/api/missions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (missionsResponse.ok) {
        const missionsData = await missionsResponse.json();
        setBackendMissions(missionsData.missions || []);
        
        // Extract submissions from missions
        const allSubmissions = [];
        missionsData.missions.forEach(mission => {
          mission.submissions.forEach(submission => {
            if (submission.status === 'pending') {
              allSubmissions.push({
                ...submission,
                missionId: mission._id,
                missionTitle: mission.title,
                missionPoints: mission.points
              });
            }
          });
        });
        setRealSubmissions(allSubmissions);
      }

      // Fetch notifications
      await fetchNotifications();

    } catch (error) {
      console.error('Error fetching backend data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/missions?pending=true', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Create notifications from pending submissions
        const newNotifications = [];
        data.missions?.forEach(mission => {
          mission.submissions?.forEach(submission => {
            if (submission.status === 'pending') {
              newNotifications.push({
                id: submission._id,
                text: `${submission.student?.name || 'Student'} submitted "${mission.title}"`,
                read: false,
                missionId: mission._id,
                submissionId: submission._id
              });
            }
          });
        });
        setNotifications(newNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Handle mission creation - Backend integration
  const handleAddMission = async (e) => {
    e.preventDefault();
    
    if (!newMission.title || !newMission.description || !newMission.points) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const missionData = {
        title: newMission.title,
        description: newMission.description,
        instructions: newMission.instructions,
        points: parseInt(newMission.points),
        difficulty: newMission.difficulty,
        category: newMission.category,
        isActive: newMission.status === "Active"
      };

      console.log('Creating mission:', missionData);

      const response = await fetch('http://localhost:5000/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(missionData)
      });

      const data = await response.json();

      if (data.success) {
        // Add to backend missions
        setBackendMissions([...backendMissions, data.mission]);
        
        // Reset form
        setNewMission({ 
          title: "", 
          description: "", 
          points: "", 
          status: "Active",
          difficulty: "medium",
          category: "environment",
          instructions: "Complete the mission as described"
        });
        setShowForm(false);
        alert('🎉 Mission created successfully!');
        
        // Refresh data
        fetchBackendData();
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (error) {
      console.error('Mission creation error:', error);
      alert('⚠️ Failed to create mission. Check console for details.');
    }
  };

  // Handle mission deletion
  const handleDeleteMission = async (missionId) => {
    if (!confirm('Are you sure you want to delete this mission?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/missions/${missionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Remove from state
        setBackendMissions(backendMissions.filter(mission => mission._id !== missionId));
        alert('Mission deleted successfully!');
      } else {
        const data = await response.json();
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Delete mission error:', error);
      alert('Failed to delete mission');
    }
  };

  // Handle submission approval/rejection
  const handleSubmissionAction = async (missionId, submissionId, action) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = action === 'approve' ? 'approve' : 'reject';
      
      const response = await fetch(`http://localhost:5000/api/missions/${missionId}/${endpoint}/${submissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          feedback: action === 'approve' ? 'Great work! Mission approved.' : 'Please improve your submission.'
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(action === 'approve' ? 
          `✅ Mission approved! ${data.pointsAwarded} XP awarded to student.` : 
          '❌ Mission rejected.'
        );
        
        // Refresh data
        fetchBackendData();
        fetchNotifications();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Submission action error:', error);
      alert('Failed to process submission');
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleInputChange = (e) => {
    setNewMission({
      ...newMission,
      [e.target.name]: e.target.value
    });
  };

  // Generate reports data
  const generateReports = () => {
    const studentReports = [];
    const classReports = {};
    
    backendMissions.forEach(mission => {
      mission.submissions.forEach(submission => {
        if (submission.status === 'approved' && submission.student) {
          const studentName = submission.student.name || 'Unknown Student';
          const studentClass = '9A'; // You can add class field to user model
          
          // Student reports
          if (!studentReports.find(s => s.name === studentName)) {
            studentReports.push({
              name: studentName,
              class: studentClass,
              missions: 1,
              xp: submission.pointsAwarded || mission.points
            });
          } else {
            const student = studentReports.find(s => s.name === studentName);
            student.missions += 1;
            student.xp += submission.pointsAwarded || mission.points;
          }
          
          // Class reports
          if (!classReports[studentClass]) {
            classReports[studentClass] = {
              class: studentClass,
              totalXP: submission.pointsAwarded || mission.points,
              studentCount: 1
            };
          } else {
            classReports[studentClass].totalXP += submission.pointsAwarded || mission.points;
            classReports[studentClass].studentCount += 1;
          }
        }
      });
    });

    // Calculate average XP for classes
    const classReportsArray = Object.values(classReports).map(cls => ({
      ...cls,
      avgXP: Math.round(cls.totalXP / cls.studentCount)
    }));

    return { studentReports, classReports: classReportsArray };
  };

  const { studentReports, classReports } = generateReports();

  // Generate chart data from missions
  const progressData = [
    { week: "Week 1", points: 300 },
    { week: "Week 2", points: 500 },
    { week: "Week 3", points: 800 },
    { week: "Week 4", points: 1200 },
  ];

  // Generate leaderboard from user data (you'll need to implement this API)
  const leaderboard = [
    { rank: 1, class: "9A", points: 3450 },
    { rank: 2, class: "8B", points: 2980 },
    { rank: 3, class: "7C", points: 2440 },
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: 'var(--muted)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--accent2)',
            borderTop: '3px solid transparent',
            borderRadius: '50%'
          }}
        />
      </div>
    );
  }

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
          <p style={{ color: "var(--muted)" }}>
            {user ? `Welcome, ${user.name}!` : "Manage missions, submissions, and student progress"}
          </p>
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
              {notifications.length > 0 ? (
                notifications.map((n) => (
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
                ))
              ) : (
                <p style={{ color: "var(--muted)", textAlign: "center" }}>No new notifications</p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        {["overview", "missions", "submissions", "reports"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="btn"
            style={{
              background: activeTab === tab ? "var(--accent2)" : "rgba(255,255,255,0.1)",
              textTransform: "capitalize"
            }}
          >
            {tab === "overview" ? "📊 Overview" : 
             tab === "missions" ? "🎯 Missions" :
             tab === "submissions" ? "📩 Submissions" :
             "📝 Reports"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
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
              <h3>🏆 Class Leaderboard</h3>
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

          {/* Quick Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "1.5rem" }}>
              <h3 style={{ color: "var(--accent1)", fontSize: "2.5rem", margin: "0.5rem 0" }}>{backendMissions.length}</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>Total Missions</p>
            </motion.div>
            <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: "center", padding: "1.5rem" }}>
              <h3 style={{ color: "var(--accent2)", fontSize: "2.5rem", margin: "0.5rem 0" }}>{realSubmissions.length}</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>Pending Submissions</p>
            </motion.div>
            <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ textAlign: "center", padding: "1.5rem" }}>
              <h3 style={{ color: "var(--accent3)", fontSize: "2.5rem", margin: "0.5rem 0" }}>{studentReports.length}</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>Active Students</p>
            </motion.div>
          </div>
        </>
      )}

      {/* Missions Tab */}
      {activeTab === "missions" && (
        <motion.div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>🎯 Mission Management</h3>
            <button className="btn" onClick={() => setShowForm(true)}>➕ Add Mission</button>
          </div>
          
          {backendMissions.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "0.6rem" }}>Title</th>
                  <th>Description</th>
                  <th>Points</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Submissions</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {backendMissions.map((mission) => (
                  <tr key={mission._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "0.6rem" }}>{mission.title}</td>
                    <td style={{ padding: "0.6rem" }}>{mission.description}</td>
                    <td style={{ padding: "0.6rem" }}>{mission.points}</td>
                    <td style={{ padding: "0.6rem", textTransform: 'capitalize' }}>{mission.difficulty}</td>
                    <td style={{ padding: "0.6rem", textTransform: 'capitalize' }}>{mission.category}</td>
                    <td style={{ padding: "0.6rem" }}>{mission.submissions?.length || 0}</td>
                    <td style={{ 
                      padding: "0.6rem", 
                      color: mission.isActive ? "limegreen" : "orange", 
                      fontWeight: "600" 
                    }}>
                      {mission.isActive ? "Active" : "Inactive"}
                    </td>
                    <td style={{ padding: "0.6rem" }}>
                      <button className="btn" style={{ marginRight: "0.5rem" }}>Edit</button>
                      <button 
                        className="btn" 
                        style={{ background: "crimson" }} 
                        onClick={() => handleDeleteMission(mission._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--muted)" }}>
              <h4>No missions created yet</h4>
              <p>Create your first mission to get started!</p>
              <button className="btn" onClick={() => setShowForm(true)}>Create First Mission</button>
            </div>
          )}
        </motion.div>
      )}

      {/* Submissions Tab */}
      {activeTab === "submissions" && (
        <motion.div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3>📩 Student Submissions</h3>
          {realSubmissions.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "0.6rem" }}>Student</th>
                  <th>Mission</th>
                  <th>Points</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {realSubmissions.map((submission) => (
                  <tr key={submission._id} style={{ textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <td style={{ padding: "0.6rem" }}>{submission.student?.name || 'Unknown Student'}</td>
                    <td>{submission.missionTitle}</td>
                    <td>{submission.missionPoints} XP</td>
                    <td>{new Date(submission.submittedAt).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="btn" 
                        style={{ marginRight: "0.5rem" }} 
                        onClick={() => handleSubmissionAction(submission.missionId, submission._id, 'approve')}
                      >
                        ✅ Approve
                      </button>
                      <button 
                        className="btn" 
                        style={{ background: "crimson" }} 
                        onClick={() => handleSubmissionAction(submission.missionId, submission._id, 'reject')}
                      >
                        ❌ Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--muted)" }}>
              <h4>No pending submissions</h4>
              <p>Student submissions will appear here for review.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <motion.div className="card" style={{ padding: "1.5rem" }}>
          <h2>📝 Reports</h2>
          
          <h3 style={{ marginTop: "1rem" }}>👩‍🎓 Student Reports</h3>
          {studentReports.length > 0 ? (
            <>
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
            </>
          ) : (
            <p style={{ color: "var(--muted)", textAlign: "center" }}>No student data available</p>
          )}

          <h3 style={{ marginTop: "2rem" }}>🏫 Class Reports</h3>
          {classReports.length > 0 ? (
            <>
              <table style={{ width: "100%", marginBottom: "1rem", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.1)" }}>
                    <th style={{ padding: "0.6rem" }}>Class</th>
                    <th>Total XP</th>
                    <th>Avg XP</th>
                    <th>Students</th>
                  </tr>
                </thead>
                <tbody>
                  {classReports.map((c) => (
                    <tr key={c.class} style={{ textAlign: "center" }}>
                      <td>{c.class}</td>
                      <td>{c.totalXP}</td>
                      <td>{c.avgXP}</td>
                      <td>{c.studentCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn" onClick={() => downloadCSV(classReports, "class_reports.csv")}>⬇️ Download Class Report</button>
            </>
          ) : (
            <p style={{ color: "var(--muted)", textAlign: "center" }}>No class data available</p>
          )}
        </motion.div>
      )}

      {/* Add Mission Modal */}
      {showForm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <motion.div className="card" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} style={{ padding: "2rem", maxWidth: "500px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>Add New Mission</h3>
              <button className="btn" style={{ background: "gray" }} onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleAddMission} style={{ display: "grid", gap: "1rem" }}>
              <input 
                type="text" 
                name="title"
                placeholder="Mission Title *" 
                value={newMission.title} 
                onChange={handleInputChange} 
                required 
                style={inputStyle}
              />
              <textarea 
                name="description"
                placeholder="Mission Description *" 
                value={newMission.description} 
                onChange={handleInputChange} 
                required 
                rows="3"
                style={{...inputStyle, resize: 'vertical'}}
              />
              <textarea 
                name="instructions"
                placeholder="Instructions for students *" 
                value={newMission.instructions} 
                onChange={handleInputChange} 
                required 
                rows="3"
                style={{...inputStyle, resize: 'vertical'}}
              />
              <input 
                type="number" 
                name="points"
                placeholder="Points *" 
                value={newMission.points} 
                onChange={handleInputChange} 
                required 
                min="10"
                max="1000"
                style={inputStyle}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted)" }}>Difficulty</label>
                  <select 
                    name="difficulty"
                    value={newMission.difficulty} 
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted)" }}>Category</label>
                  <select 
                    name="category"
                    value={newMission.category} 
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="environment">Environment</option>
                    <option value="coding">Coding</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="language">Language</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>
              </div>
              <select 
                name="status"
                value={newMission.status} 
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" className="btn" style={{ background: "gray" }} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn">🚀 Create Mission</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  fontSize: '1rem'
};