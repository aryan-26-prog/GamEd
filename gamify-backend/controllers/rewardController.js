import Reward from '../models/Reward.js';

// @desc    Get all rewards
// @route   GET /api/rewards
// @access  Private
export const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ isActive: true }).sort({ pointsRequired: 1 });

    res.json({
      success: true,
      rewards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rewards',
      error: error.message
    });
  }
};