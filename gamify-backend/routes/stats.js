const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const Mission = require('../models/Mission');
const router = express.Router();

// @desc    Get platform stats
// @route   GET /api/stats
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPoints = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$points' } } }
    ]);
    
    // You can add more stats logic here
    res.json({
      success: true,
      missionsCompleted: Math.floor(Math.random() * 1000) + 500, // Demo data
      studentsEngaged: totalUsers,
      treesPlanted: Math.floor(Math.random() * 5000) + 1000, // Demo data
      xpEarned: totalPoints[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
});

module.exports = router;