// src/pages/Games.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

// ================= GAME 1: Recycle Sorter =================
function RecycleSorter() {
  const [score, setScore] = useState(0);
  const items = [
    { id: 1, name: "Plastic Bottle", type: "recycle" },
    { id: 2, name: "Banana Peel", type: "trash" },
    { id: 3, name: "Newspaper", type: "recycle" },
  ];

  const handleDrop = (item, binType) => {
    if (item.type === binType) {
      setScore(score + 1);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>♻️ Recycle Sorter</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("item", item.name)}
            whileDrag={{ scale: 1.2 }}
            style={{
              padding: "1rem",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              cursor: "grab",
            }}
          >
            {item.name}
          </motion.div>
        ))}
      </div>
      <div style={{ marginTop: "2rem", display: "flex", gap: "3rem", justifyContent: "center" }}>
        <DropBin label="♻️ Recycle" binType="recycle" items={items} handleDrop={handleDrop} />
        <DropBin label="🗑 Trash" binType="trash" items={items} handleDrop={handleDrop} />
      </div>
      <h3 style={{ marginTop: "1.5rem" }}>⭐ Score: {score}</h3>
    </div>
  );
}

function DropBin({ label, binType, items, handleDrop }) {
  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        const itemName = e.dataTransfer.getData("item");
        const item = items.find((i) => i.name === itemName);
        if (item) handleDrop(item, binType);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        width: "120px",
        height: "120px",
        border: "3px dashed var(--accent1)",
        borderRadius: "10px",
        textAlign: "center",
        lineHeight: "120px",
      }}
    >
      {label}
    </div>
  );
}

// ================= GAME 2: Energy Saver Quiz =================
function EnergySaverQuiz() {
  const questions = [
    { q: "What saves more energy?", options: ["LED Bulb", "Incandescent Bulb"], answer: "LED Bulb" },
    { q: "Best time to run washing machine?", options: ["Peak Hours", "Off-Peak Hours"], answer: "Off-Peak Hours" },
  ];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (opt) => {
    if (opt === questions[current].answer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>⚡ Energy Saver Quiz</h2>
      <p>{questions[current].q}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {questions[current].options.map((opt, i) => (
          <motion.button key={i} className="btn" whileHover={{ scale: 1.05 }} onClick={() => handleAnswer(opt)}>
            {opt}
          </motion.button>
        ))}
      </div>
      <h3 style={{ marginTop: "1rem" }}>⭐ Score: {score}</h3>
    </div>
  );
}

// ================= GAME 3: Carbon Runner (AI assisted) =================
function CarbonRunner() {
  const scenarios = [
    { id: 1, q: "How will you travel to school?", options: ["Car", "Cycle", "Bus"], aiBest: "Cycle" },
    { id: 2, q: "What do you do with leftovers?", options: ["Throw Away", "Compost", "Fridge"], aiBest: "Compost" },
  ];
  const [step, setStep] = useState(0);
  const [footprint, setFootprint] = useState(100);

  const chooseOption = (opt) => {
    const best = scenarios[step].aiBest;
    if (opt === best) setFootprint(footprint - 20);
    else setFootprint(footprint - 5);
    if (step + 1 < scenarios.length) setStep(step + 1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🏃 Carbon Runner</h2>
      <h4>🌍 Carbon Footprint: {footprint} pts</h4>
      <p>{scenarios[step].q}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {scenarios[step].options.map((opt, i) => (
          <motion.button key={i} className="btn" whileHover={{ scale: 1.05 }} onClick={() => chooseOption(opt)}>
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ================= GAME 4: AI Quiz Master =================
function AIQuizMaster() {
  const [question, setQuestion] = useState("Loading AI question...");
  const [answer, setAnswer] = useState("");

  const getAIQuestion = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ai-quiz"); // FastAPI/Django backend
      const data = await res.json();
      setQuestion(data.question);
    } catch (err) {
      setQuestion("⚠️ AI backend not running. Start server to fetch questions.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🤖 AI Quiz Master</h2>
      <p>{question}</p>
      <motion.button className="btn" onClick={getAIQuestion} whileHover={{ scale: 1.05 }}>
        🔄 Get AI Question
      </motion.button>
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px", marginRight: "0.5rem" }}
        />
        <motion.button className="btn" whileHover={{ scale: 1.05 }}>
          ✅ Submit
        </motion.button>
      </div>
    </div>
  );
}

// ================= MAIN GAMES HUB =================
export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

  const gamesList = [
    { key: "recycle", title: "♻️ Recycle Sorter", desc: "Drag items into the right bin", comp: <RecycleSorter /> },
    { key: "quiz", title: "⚡ Energy Saver Quiz", desc: "Quick eco-quiz", comp: <EnergySaverQuiz /> },
    { key: "carbon", title: "🏃 Carbon Runner", desc: "AI suggests best eco choices", comp: <CarbonRunner /> },
    { key: "aiquiz", title: "🤖 AI Quiz Master", desc: "Get AI-generated questions", comp: <AIQuizMaster /> },
  ];

  return (
    <section className="container" style={{ paddingTop: "6rem", textAlign: "center" }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "700",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          🎮 Eco Games Hub
        </h1>
        <p style={{ color: "var(--muted)" }}>Play fun eco-games & learn with AI 🌍</p>
      </motion.div>

      {/* Game Selector */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {gamesList.map((g) => (
          <motion.div
            key={g.key}
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ padding: "1.2rem", cursor: "pointer" }}
            onClick={() => setActiveGame(g.key)}
          >
            <h3>{g.title}</h3>
            <p>{g.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Game Area */}
      <div style={{ marginTop: "3rem" }}>
        {activeGame ? gamesList.find((g) => g.key === activeGame).comp : <p>👉 Choose a game to start!</p>}
      </div>
    </section>
  );
}
