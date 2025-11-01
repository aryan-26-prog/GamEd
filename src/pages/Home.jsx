import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import MissionCard from "../components/MissionCard";
import Leaderboard from "../components/Leaderboard";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [missions, setMissions] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    missionsCompleted: 0,
    studentsEngaged: 0,
    treesPlanted: 0,
    xpEarned: 0
  });

  // Check authentication and load data
  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        navigate('/auth');
        return;
      }

      setUser(JSON.parse(userData));
      await loadHomeData();
    } catch (error) {
      console.error('Error loading home data:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const loadHomeData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Load missions
      const missionsResponse = await fetch('http://localhost:5000/api/missions?limit=3', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (missionsResponse.ok) {
        const missionsData = await missionsResponse.json();
        setMissions(missionsData.missions || []);
      }

      // Load leaderboard (you'll need to create this API endpoint)
      const leadersResponse = await fetch('http://localhost:5000/api/users/leaderboard?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (leadersResponse.ok) {
        const leadersData = await leadersResponse.json();
        setLeaders(leadersData.leaders || []);
      } else {
        // Fallback sample data
        setLeaders([
          { name: "Class 9A", points: 3450 },
          { name: "Class 8B", points: 2980 },
          { name: "Class 7C", points: 2440 },
        ]);
      }

      // Load stats (you'll need to create this API endpoint)
      const statsResponse = await fetch('http://localhost:5000/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

    } catch (error) {
      console.error('Error loading data:', error);
      // Set fallback data
      setMissions([
        {
          _id: "1",
          title: "🌱 Tree Planting Drive",
          description: "Plant 5 saplings in your campus or nearby park.",
          points: 120,
          difficulty: "medium",
          category: "environment"
        },
        {
          _id: "2", 
          title: "♻️ Plastic Audit",
          description: "Collect & record 10 plastic items for recycling.",
          points: 80,
          difficulty: "easy",
          category: "recycling"
        },
        {
          _id: "3",
          title: "💡 Energy Saver",
          description: "Report 3 lights/fans turned off after class.",
          points: 60,
          difficulty: "easy",
          category: "energy"
        },
      ]);
    }
  };

  const handleMissionClick = (missionId) => {
    navigate(`/mission/${missionId}`);
  };

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
    <>
      {/* Hero Section */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Hero user={user} />

        {/* Floating Blur Backgrounds */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "var(--accent2)",
            filter: "blur(80px)",
            zIndex: 0,
            opacity: 0.3,
          }}
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "15%",
            right: "15%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "var(--accent3)",
            filter: "blur(100px)",
            zIndex: 0,
            opacity: 0.25,
          }}
        />
      </div>

      {/* Active Missions */}
      <section className="container" style={{ paddingBottom: "5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ marginBottom: "2rem" }}
        >
          <h2 className="h1" style={{ fontSize: "2rem", margin: 0 }}>
            🚀 Active Missions
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            Complete missions, earn XP, and level up your eco-profile
          </p>
        </motion.div>

        {missions.length > 0 ? (
          <div className="grid grid-3" style={{ marginBottom: "3rem" }}>
            {missions.map((mission, i) => (
              <motion.div
                key={mission._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                }}
                style={{
                  willChange: "transform",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => handleMissionClick(mission._id)}
              >
                <MissionCard 
                  title={mission.title}
                  desc={mission.description}
                  points={mission.points}
                  difficulty={mission.difficulty}
                  category={mission.category}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
            style={{ 
              textAlign: 'center', 
              padding: '3rem',
              background: 'rgba(255,255,255,0.05)'
            }}
          >
            <h3 style={{ color: 'var(--muted)' }}>No missions available</h3>
            <p>Check back later for new missions!</p>
          </motion.div>
        )}

        {/* Impact Counter */}
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            padding: "2.5rem",
            marginBottom: "4rem",
            textAlign: "center",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: "18px",
          }}
        >
          <h2
            style={{
              fontSize: "2.2rem",
              marginBottom: "1.2rem",
              background:
                "linear-gradient(90deg,var(--accent1),var(--accent2))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            🌍 Our Collective Impact
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2rem",
              marginTop: "1rem",
            }}
          >
            {[
              { number: `${stats.missionsCompleted}+`, label: "Missions Completed" },
              { number: `${stats.studentsEngaged}+`, label: "Students Engaged" },
              { number: `${stats.treesPlanted}+`, label: "Trees Planted" },
              { number: `${stats.xpEarned}+`, label: "XP Earned" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  padding: "1.5rem",
                  borderRadius: "var(--radius)",
                  willChange: "transform",
                  transition: "transform 0.3s ease",
                }}
                whileHover={{ scale: 1.03 }}
              >
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "var(--accent2)",
                  }}
                >
                  {stat.number}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "1rem" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", alignItems: "start" }}>
          {/* Featured Course Card */}
          <motion.div
            className="card"
            style={{ padding: "1.8rem" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Course"
              style={{
                width: "90px",
                marginBottom: "1.2rem",
                filter: "drop-shadow(0 0 12px rgba(0,0,0,0.4))",
              }}
            />
            <h3 style={{ marginTop: 0, fontSize: "1.4rem" }}>
              📘 Featured Courses, Articles, Tools
            </h3>
            <p className="lead" style={{ marginBottom: "1.2rem" }}>
              Learn Courses with micro-lessons, quizzes,
              and a practical mission to audit waste in your campus.
            </p>
            <Link to="/courses">
              <motion.button
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Learning Hub
              </motion.button>
            </Link>
          </motion.div>

          {/* Leaderboard Section */}
          <motion.div
            className="card"
            style={{ padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Leaderboard items={leaders} />
            <Link to="/leaderboard" style={{ alignSelf: "flex-start" }}>
              <motion.button
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Leaderboard
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* User Progress Card */}
        {user && (
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              margin: "2rem 0",
              padding: "2rem",
              background: "linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(146, 84, 222, 0.1))",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <h3 style={{ marginTop: 0 }}>🎯 Your Progress</h3>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent2)" }}>
                  {user.level}
                </div>
                <div style={{ color: "var(--muted)" }}>Level</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent1)" }}>
                  {user.points}
                </div>
                <div style={{ color: "var(--muted)" }}>Points</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  background: "rgba(255,255,255,0.1)", 
                  borderRadius: "10px",
                  height: "10px",
                  overflow: "hidden"
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(user.points % 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, var(--accent1), var(--accent2))",
                      borderRadius: "10px"
                    }}
                  />
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  marginTop: "0.5rem",
                  fontSize: "0.8rem",
                  color: "var(--muted)"
                }}>
                  <span>Level {user.level}</span>
                  <span>{user.points % 100}/100 XP to next level</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Final CTA */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            margin: "2rem",
            padding: "2.5rem",
            textAlign: "center",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-30%",
              left: "-30%",
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle at center, var(--accent1), transparent 70%)",
              opacity: 0.15,
              zIndex: 0,
            }}
          />
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              background: "linear-gradient(90deg,var(--accent2),var(--accent3))",
              WebkitBackgroundClip: "text",
              color: "transparent",
              position: "relative",
              zIndex: 1,
            }}
          >
            🌟 Be the Change, Start Today!
          </h2>
          <p
            style={{
              color: "var(--muted)",
              marginBottom: "1.8rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            With GameEd, every mission you complete contributes to a better
            planet. Learn, grow, and inspire others. Your journey starts here.
          </p>
          <Link to="/dailyquiz">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="btn"
              style={{ position: "relative", zIndex: 1 }}
            >
              📊 Daily Quiz
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}