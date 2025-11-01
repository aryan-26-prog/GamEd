const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// @desc    Get leaderboard
// @route   GET /api/users/leaderboard
// @access  Private
router.get('/leaderboard', protect, async (req, res) => {
  try {
    const leaders = await User.find({})
      .select('name points level')
      .sort({ points: -1 })
      .limit(10);

    res.json({
      success: true,
      leaders: leaders.map(user => ({
        name: user.name,
        points: user.points,
        level: user.level
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
});

module.exports = router;