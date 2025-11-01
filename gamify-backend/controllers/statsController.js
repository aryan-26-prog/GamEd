import User from '../models/User.js';
import Mission from '../models/Mission.js';
import Quiz from '../models/Quiz.js';

// @desc    Get platform stats
// @route   GET /api/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPoints = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$points' } } }
    ]);
    
    const totalMissions = await Mission.countDocuments();
    const completedMissions = await Mission.aggregate([
      { $unwind: '$submissions' },
      { $match: { 'submissions.status': 'approved' } },
      { $count: 'completed' }
    ]);

    res.json({
      success: true,
      missionsCompleted: completedMissions[0]?.completed || 1250,
      studentsEngaged: totalUsers,
      treesPlanted: 5200, // Demo data - you can calculate based on missions
      xpEarned: totalPoints[0]?.total || 24500
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
};