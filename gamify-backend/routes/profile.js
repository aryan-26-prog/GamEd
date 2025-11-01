// routes/profile.js
import express from 'express';
import User from '../models/User.js';
import Mission from '../models/Mission.js';
import Achievement from '../models/Achievement.js';
import Question from '../models/Question.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('completedMissions')
      .populate('completedQuizzes.quiz');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      points: user.points,
      level: user.level,
      badges: user.badges,
      streak: user.streak,
      lastActive: user.lastActive,
      completedMissions: user.completedMissions,
      completedQuizzes: user.completedQuizzes,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user progress data
// @route   GET /api/profile/progress
// @access  Private
router.get('/progress', auth, async (req, res) => {
  try {
    // Last 5 weeks progress data calculate करें
    const progressData = await calculateProgressData(req.user.id);
    res.json(progressData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user missions
// @route   GET /api/profile/missions
// @access  Private
router.get('/missions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('completedMissions');
    
    // All missions (completed + upcoming)
    const allMissions = await Mission.find({
      $or: [
        { _id: { $in: user.completedMissions } },
        { isActive: true }
      ]
    });

    const missions = allMissions.map(mission => {
      const isCompleted = user.completedMissions.some(
        completed => completed._id.toString() === mission._id.toString()
      );
      
      return {
        id: mission._id,
        title: mission.title,
        description: mission.description,
        due: mission.dueDate,
        xp: mission.xpReward,
        status: isCompleted ? 'completed' : 'pending',
        type: mission.type || 'mission'
      };
    });

    res.json(missions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user achievements
// @route   GET /api/profile/achievements
// @access  Private
router.get('/achievements', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Convert badges to achievements format
    const achievements = user.badges.map(badge => ({
      title: badge.name,
      desc: `${badge.name} achievement earned`,
      icon: badge.icon,
      earnedAt: badge.earnedAt
    }));

    res.json(achievements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function for progress data
async function calculateProgressData(userId) {
  const user = await User.findById(userId);
  const fiveWeeksAgo = new Date();
  fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - 35);

  // यहां आप actual progress calculation logic implement करें
  // Temporary dummy data
  return [
    { week: "W1", xp: 200 },
    { week: "W2", xp: 450 },
    { week: "W3", xp: 850 },
    { week: "W4", xp: 1200 },
    { week: "W5", xp: user.points }
  ];
}