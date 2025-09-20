import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Dummy Quiz Data 
const quizData = [
  {
    q: "Which of these is renewable energy?",
    options: ["Coal", "Solar", "Oil", "Gas"],
    answer: "Solar",
  },
  {
    q: "What is the best way to recycle plastic bottles?",
    options: ["Burn them", "Reuse or recycle bins", "Throw in garbage", "Bury"],
    answer: "Reuse or recycle bins",
  },
  {
    q: "Which activity saves the most water?",
    options: [
      "Shower for 15 mins",
      "Brushing teeth with tap open",
      "Rainwater harvesting",
      "Car wash daily",
    ],
    answer: "Rainwater harvesting",
  },
];

export default function DailyQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(
    parseInt(localStorage.getItem("quizStreak")) || 0
  );
  const [showResult, setShowResult] = useState(false);

  // AI Suggestion Placeholder
  const [aiTip, setAiTip] = useState("");

  useEffect(() => {
    if (showResult) {
      if (score <= 1) {
        setAiTip("⚡ Focus on Recycling basics for tomorrow’s quiz.");
      } else if (score === quizData.length) {
        setAiTip("🌟 Perfect score! Tomorrow, get ready for advanced topics.");
      } else {
        setAiTip("📚 You’re good, but revise Water Conservation.");
      }

      // Update streak
      const today = new Date().toDateString();
      const lastAttempt = localStorage.getItem("lastAttempt");

      if (lastAttempt === today) {
        setAiTip("✅ Already attempted today!");
      } else {
        localStorage.setItem("lastAttempt", today);
        setStreak(streak + 1);
        localStorage.setItem("quizStreak", streak + 1);
      }
    }
  }, [showResult]);

  const handleAnswer = (option) => {
    if (option === quizData[currentQ].answer) {
      setScore(score + 1);
    }
    const nextQ = currentQ + 1;
    if (nextQ < quizData.length) {
      setCurrentQ(nextQ);
    } else {
      setShowResult(true);
    }
  };

  return (
    <section className="container" style={{ paddingTop: "6rem" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
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
          📖 Daily Quiz
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Test your eco-knowledge & maintain your streak 🌱
        </p>
      </motion.div>

      {!showResult ? (
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <h3>{quizData[currentQ].q}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            {quizData[currentQ].options.map((opt, i) => (
              <motion.button
                key={i}
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="card"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <h2>🎉 Quiz Completed!</h2>
          <p>
            Score: <strong>{score}</strong> / {quizData.length}
          </p>
          <p>🔥 Streak: {streak} days</p>
          <p style={{ marginTop: "1rem", color: "var(--accent2)" }}>{aiTip}</p>
        </motion.div>
      )}
    </section>
  );
}
