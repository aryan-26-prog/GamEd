// src/pages/Games.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ================= GAME 1: Enhanced Recycle Sorter =================
function RecycleSorter() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState([]);

  const itemTypes = [
    { name: "Plastic Bottle", type: "recycle", emoji: "🧴" },
    { name: "Banana Peel", type: "trash", emoji: "🍌" },
    { name: "Newspaper", type: "recycle", emoji: "📰" },
    { name: "Glass Jar", type: "recycle", emoji: "🫙" },
    { name: "Pizza Box", type: "trash", emoji: "🍕" },
    { name: "Aluminum Can", type: "recycle", emoji: "🥫" },
    { name: "Battery", type: "hazard", emoji: "🔋" },
    { name: "Coffee Cup", type: "trash", emoji: "☕" }
  ];

  const generateItems = useCallback(() => {
    const count = 3 + level;
    const shuffled = [...itemTypes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((item, index) => ({
      ...item,
      id: `${level}-${index}`,
      position: { x: Math.random() * 300, y: 0 }
    }));
  }, [level]);

  useEffect(() => {
    setItems(generateItems());
    setFeedback(`Level ${level} - Sort the items!`);
  }, [level, generateItems]);

  const handleDrop = (item, binType) => {
    if (gameOver) return;

    if (item.type === binType) {
      setScore(score + 10 * level);
      setFeedback(`✅ Correct! ${item.name} goes in ${binType} bin!`);
      
      // Remove item and check level completion
      const remainingItems = items.filter(i => i.id !== item.id);
      setItems(remainingItems);
      
      if (remainingItems.length === 0) {
        setLevel(level + 1);
      }
    } else {
      setLives(lives - 1);
      setFeedback(`❌ Wrong! ${item.name} should not go in ${binType} bin!`);
      
      if (lives - 1 === 0) {
        setGameOver(true);
        setFeedback(`Game Over! Final Score: ${score}`);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setLevel(1);
    setItems(generateItems());
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>♻️ Recycle Sorter</h2>
      
      {/* Game Stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1rem" }}>
        <div>⭐ Score: {score}</div>
        <div>❤️ Lives: {lives}</div>
        <div>🎯 Level: {level}</div>
      </div>

      {/* Feedback */}
      <motion.div
        key={feedback}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "1rem", minHeight: "24px" }}
      >
        {feedback}
      </motion.div>

      {gameOver ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <h3>Game Over!</h3>
          <motion.button className="btn" onClick={resetGame} whileHover={{ scale: 1.1 }}>
            🔄 Play Again
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Draggable Items */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "1rem", 
            flexWrap: "wrap",
            minHeight: "100px",
            marginBottom: "2rem"
          }}>
            <AnimatePresence>
              {items.map((item) => (
                <DraggableItem 
                  key={item.id} 
                  item={item} 
                  onDrop={handleDrop}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Drop Bins */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <DropBin label="♻️ Recycle" binType="recycle" color="#4CAF50" />
            <DropBin label="🗑 Trash" binType="trash" color="#FF9800" />
            <DropBin label="⚠️ Hazard" binType="hazard" color="#F44336" />
          </div>
        </>
      )}
    </div>
  );
}

function DraggableItem({ item, onDrop }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileDrag={{ scale: 1.2, zIndex: 1000 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        const binElement = document.elementFromPoint(info.point.x, info.point.y);
        if (binElement?.dataset?.bintype) {
          onDrop(item, binElement.dataset.bintype);
        }
      }}
      style={{
        padding: "1rem",
        background: isDragging ? "var(--accent1)" : "rgba(255,255,255,0.1)",
        borderRadius: "12px",
        cursor: "grab",
        border: `2px solid ${isDragging ? "var(--accent2)" : "transparent"}`,
        userSelect: "none"
      }}
      whileHover={{ scale: 1.05 }}
    >
      {item.emoji} {item.name}
    </motion.div>
  );
}

function DropBin({ label, binType, color }) {
  const [isOver, setIsOver] = useState(false);

  return (
    <motion.div
      data-bintype={binType}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={() => setIsOver(false)}
      style={{
        width: "120px",
        height: "120px",
        border: `3px ${isOver ? "solid" : "dashed"} ${color}`,
        borderRadius: "15px",
        textAlign: "center",
        lineHeight: "120px",
        background: isOver ? `${color}20` : "transparent",
        transition: "all 0.2s ease"
      }}
      whileHover={{ scale: 1.05 }}
    >
      {label}
    </motion.div>
  );
}

// ================= GAME 2: Enhanced Energy Saver Quiz =================
function EnergySaverQuiz() {
  const questions = [
    { 
      q: "Which saves more energy?", 
      options: ["LED Bulb", "Incandescent Bulb"], 
      answer: "LED Bulb",
      explanation: "LED bulbs use 75% less energy and last 25x longer!"
    },
    { 
      q: "Best time to run washing machine?", 
      options: ["Peak Hours", "Off-Peak Hours"], 
      answer: "Off-Peak Hours",
      explanation: "Off-peak hours reduce strain on the grid and are often cheaper!"
    },
    { 
      q: "What's the ideal thermostat setting in winter?", 
      options: ["68°F (20°C)", "72°F (22°C)", "65°F (18°C)"], 
      answer: "68°F (20°C)",
      explanation: "Each degree lower can save 3% on heating costs!"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (opt) => {
    if (opt === questions[current].answer) {
      setScore(score + 1);
    }
    setShowExplanation(questions[current].explanation);

    setTimeout(() => {
      setShowExplanation("");
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowExplanation("");
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>⚡ Energy Saver Quiz</h2>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="card">
          <h3>Quiz Completed! 🎉</h3>
          <p>Your score: {score} out of {questions.length}</p>
          <motion.button className="btn" onClick={resetQuiz} whileHover={{ scale: 1.05 }}>
            🔄 Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>⚡ Energy Saver Quiz</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <p>Question {current + 1} of {questions.length}</p>
        <div style={{ 
          width: "100%", 
          background: "rgba(255,255,255,0.1)", 
          borderRadius: "10px",
          margin: "0.5rem 0"
        }}>
          <div style={{ 
            width: `${((current + 1) / questions.length) * 100}%`, 
            height: "8px", 
            background: "var(--accent1)",
            borderRadius: "10px",
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>

      <motion.div
        key={current}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="card"
        style={{ marginBottom: "1.5rem" }}
      >
        <h3>{questions[current].q}</h3>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {questions[current].options.map((opt, i) => (
            <motion.button 
              key={i} 
              className="btn" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(opt)}
              disabled={showExplanation !== ""}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              padding: "1rem",
              background: "rgba(76, 175, 80, 0.2)",
              borderRadius: "10px",
              border: "1px solid #4CAF50"
            }}
          >
            💡 {showExplanation}
          </motion.div>
        )}
      </AnimatePresence>

      <h3 style={{ marginTop: "1rem" }}>⭐ Score: {score}</h3>
    </div>
  );
}

// ================= GAME 3: Enhanced Carbon Runner =================
function CarbonRunner() {
  const scenarios = [
    { 
      id: 1, 
      q: "How will you travel to school?", 
      options: ["Car", "Cycle", "Bus"], 
      aiBest: "Cycle",
      explanation: "Cycling produces zero emissions and is great exercise!"
    },
    { 
      id: 2, 
      q: "What do you do with leftovers?", 
      options: ["Throw Away", "Compost", "Fridge"], 
      aiBest: "Compost",
      explanation: "Composting reduces methane from landfills and creates natural fertilizer!"
    },
    { 
      id: 3, 
      q: "Choose your lunch:", 
      options: ["Beef Burger", "Veggie Wrap", "Chicken Salad"], 
      aiBest: "Veggie Wrap",
      explanation: "Plant-based meals have a much lower carbon footprint than meat!"
    }
  ];

  const [step, setStep] = useState(0);
  const [footprint, setFootprint] = useState(100);
  const [showResult, setShowResult] = useState("");
  const [gameCompleted, setGameCompleted] = useState(false);

  const chooseOption = (opt) => {
    const best = scenarios[step].aiBest;
    let newFootprint = footprint;
    let message = "";

    if (opt === best) {
      newFootprint -= 25;
      message = "🎉 Excellent choice! " + scenarios[step].explanation;
    } else {
      newFootprint -= 8;
      message = `⚠️ Good, but ${best} would be better! ` + scenarios[step].explanation;
    }

    setFootprint(newFootprint);
    setShowResult(message);

    setTimeout(() => {
      setShowResult("");
      if (step + 1 < scenarios.length) {
        setStep(step + 1);
      } else {
        setGameCompleted(true);
      }
    }, 3000);
  };

  const getFootprintColor = (value) => {
    if (value >= 70) return "#4CAF50";
    if (value >= 40) return "#FF9800";
    return "#F44336";
  };

  const resetGame = () => {
    setStep(0);
    setFootprint(100);
    setShowResult("");
    setGameCompleted(false);
  };

  if (gameCompleted) {
    const rating = footprint >= 70 ? "Eco Champion! 🌍" : footprint >= 40 ? "Good Effort! 👍" : "Needs Improvement 📚";
    
    return (
      <div style={{ textAlign: "center" }}>
        <h2>🏃 Carbon Runner</h2>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="card">
          <h3>Game Completed! 🎯</h3>
          <p>Your final carbon footprint: </p>
          <h2 style={{ color: getFootprintColor(footprint), fontSize: "2.5rem" }}>
            {footprint} pts
          </h2>
          <p>{rating}</p>
          <motion.button className="btn" onClick={resetGame} whileHover={{ scale: 1.05 }}>
            🔄 Play Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🏃 Carbon Runner</h2>
      
      {/* Carbon Footprint Meter */}
      <div style={{ marginBottom: "2rem" }}>
        <h4>🌍 Carbon Footprint</h4>
        <div style={{ 
          width: "100%", 
          maxWidth: "300px", 
          margin: "0 auto",
          background: "rgba(255,255,255,0.1)", 
          borderRadius: "15px",
          overflow: "hidden"
        }}>
          <motion.div 
            style={{ 
              width: `${footprint}%`, 
              height: "20px", 
              background: getFootprintColor(footprint),
              borderRadius: "15px",
            }}
            initial={{ width: "100%" }}
            animate={{ width: `${footprint}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p style={{ marginTop: "0.5rem" }}>{footprint} points</p>
      </div>

      {/* Scenario */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="card"
        style={{ marginBottom: "1.5rem" }}
      >
        <h3>{scenarios[step].q}</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {scenarios[step].options.map((opt, i) => (
            <motion.button 
              key={i} 
              className="btn" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => chooseOption(opt)}
              disabled={showResult !== ""}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Progress */}
      <div style={{ marginBottom: "1rem" }}>
        <p>Scenario {step + 1} of {scenarios.length}</p>
      </div>

      {/* Result Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              padding: "1rem",
              background: "rgba(33, 150, 243, 0.2)",
              borderRadius: "10px",
              border: "1px solid #2196F3"
            }}
          >
            {showResult}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= GAME 4: Enhanced AI Quiz Master =================
function AIQuizMaster() {
  const [question, setQuestion] = useState("Click the button to get an AI-generated eco-question! 🤖");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const getAIQuestion = async () => {
    setLoading(true);
    try {
      // Fallback questions if backend is not available
      const fallbackQuestions = [
        "What are three benefits of using renewable energy sources?",
        "How does planting trees help combat climate change?",
        "What is the impact of plastic pollution on marine life?",
        "Why is it important to conserve water and how can we do it?"
      ];
      
      const randomQuestion = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try actual API first, then fallback
      try {
        const res = await fetch("http://127.0.0.1:8000/ai-quiz");
        if (res.ok) {
          const data = await res.json();
          setQuestion(data.question || randomQuestion);
        } else {
          throw new Error("API not available");
        }
      } catch (err) {
        setQuestion(randomQuestion + " (Demo Mode)");
      }
      
      setResult("");
      setAnswer("");
    } catch (err) {
      setQuestion("⚠️ Using demo questions. Start backend for AI features.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = () => {
    if (!answer.trim()) return;
    
    // Simple validation for demo
    const isGoodAnswer = answer.length > 10; // Basic length check
    if (isGoodAnswer) {
      setResult("✅ Great answer! You're thinking eco-friendly!");
      setScore(score + 1);
    } else {
      setResult("🤔 Good start! Try to think more about environmental impact.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🤖 AI Quiz Master</h2>
      
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <motion.p
          key={question}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ fontSize: "1.1rem", minHeight: "60px" }}
        >
          {question}
        </motion.p>
      </div>

      <motion.button 
        className="btn" 
        onClick={getAIQuestion} 
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "⏳ Generating..." : "🔄 Get AI Question"}
      </motion.button>

      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
          style={{ 
            padding: "0.8rem", 
            borderRadius: "8px", 
            marginRight: "0.5rem",
            width: "300px",
            maxWidth: "100%",
            border: "2px solid var(--accent1)",
            background: "rgba(255,255,255,0.1)",
            color: "white"
          }}
        />
        <motion.button 
          className="btn" 
          onClick={submitAnswer}
          disabled={!answer.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✅ Submit
        </motion.button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              border: "1px solid var(--accent1)"
            }}
          >
            {result}
          </motion.div>
        )}
      </AnimatePresence>

      <h3 style={{ marginTop: "1rem" }}>⭐ Score: {score}</h3>
    </div>
  );
}

// ================= MAIN GAMES HUB =================
export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

  const gamesList = [
    { key: "recycle", title: "♻️ Recycle Sorter", desc: "Drag items into the right bin", comp: <RecycleSorter /> },
    { key: "quiz", title: "⚡ Energy Saver Quiz", desc: "Quick eco-quiz with explanations", comp: <EnergySaverQuiz /> },
    { key: "carbon", title: "🏃 Carbon Runner", desc: "Make eco-friendly choices", comp: <CarbonRunner /> },
    { key: "aiquiz", title: "🤖 AI Quiz Master", desc: "AI-generated questions", comp: <AIQuizMaster /> },
  ];

  return (
    <section className="container" style={{ paddingTop: "6rem", textAlign: "center", minHeight: "100vh" }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "700",
            background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "0.5rem"
          }}
        >
          🎮 Eco Games Hub
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          Play fun eco-games & learn with AI 🌍
        </p>
      </motion.div>

      {/* Game Selector */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {gamesList.map((g) => (
          <motion.div
            key={g.key}
            className="card"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              padding: "1.5rem", 
              cursor: "pointer",
              border: activeGame === g.key ? "2px solid var(--accent1)" : "2px solid transparent",
              transition: "all 0.3s ease"
            }}
            onClick={() => setActiveGame(g.key)}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{g.title}</h3>
            <p style={{ color: "var(--muted)", margin: 0 }}>{g.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Game Area */}
      <motion.div 
        style={{ marginTop: "3rem", minHeight: "400px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {activeGame ? (
            <motion.div
              key={activeGame}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {gamesList.find((g) => g.key === activeGame).comp}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
              style={{ padding: "3rem" }}
            >
              <h2 style={{ marginBottom: "1rem" }}>👆 Choose a Game to Start!</h2>
              <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
                Select any game from above to begin your eco-learning adventure!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}