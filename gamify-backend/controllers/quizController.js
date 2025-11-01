import Quiz from '../models/Quiz.js';
import User from '../models/User.js';

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
export const getQuizzes = async (req, res) => {
  try {
    const { category, difficulty, page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const quizzes = await Quiz.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-questions.correctAnswer');

    const total = await Quiz.countDocuments(query);

    res.json({
      success: true,
      count: quizzes.length,
      total,
      pages: Math.ceil(total / limit),
      quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quizzes',
      error: error.message
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Private
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name email')
      .select('-questions.correctAnswer');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz',
      error: error.message
    });
  }
};

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private
export const submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const { answers } = req.body; // Array of { questionIndex, selectedOption }
    let score = 0;
    let correctAnswers = 0;

    // Calculate score
    answers.forEach((answer, index) => {
      if (quiz.questions[answer.questionIndex].correctAnswer === answer.selectedOption) {
        score += quiz.questions[answer.questionIndex].points;
        correctAnswers++;
      }
    });

    // Add to user's completed quizzes
    user.completedQuizzes.push({
      quiz: quiz._id,
      score,
      completedAt: new Date()
    });

    // Award points
    user.points += score;
    
    // Check level up (every 100 points = 1 level)
    const newLevel = Math.floor(user.points / 100) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      result: {
        score,
        totalPoints: quiz.totalPoints,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        pointsEarned: score,
        level: user.level
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting quiz',
      error: error.message
    });
  }
};