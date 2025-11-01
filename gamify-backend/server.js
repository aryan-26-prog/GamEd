import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Import routes - USE DEFAULT IMPORTS
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import missionRoutes from "./routes/missionRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.json({ 
    message: "🎮 Gamify Education Backend API", 
    version: "1.0.0",
    status: "Running 🚀",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users", 
      missions: "/api/missions",
      quizzes: "/api/quizzes",
      rewards: "/api/rewards",
      stats: "/api/stats"
    }
  });
});

// API Routes - USE DEFAULT IMPORTS
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/stats", statsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 API URL: http://localhost:${PORT}`);
});