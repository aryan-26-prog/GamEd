import User from '../models/User.js';

// @desc    Get leaderboard
// @route   GET /api/users/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
  try {
    const leaders = await User.find({})
      .select('name points level avatar')
      .sort({ points: -1 })
      .limit(10);

    res.json({
      success: true,
      leaders: leaders.map(user => ({
        name: user.name,
        points: user.points,
        level: user.level,
        avatar: user.avatar
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('completedMissions')
      .populate('completedQuizzes.quiz');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};