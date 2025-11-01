import Mission from '../models/Mission.js';
import User from '../models/User.js';

// @desc    Create new mission
// @route   POST /api/missions
// @access  Private (Teachers/Admin)
export const createMission = async (req, res) => {
  try {
    const { title, description, instructions, points, difficulty, category, isActive = true } = req.body;
    
    // Validation
    if (!title || !description || !instructions || !points || !difficulty || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create mission
    const mission = await Mission.create({
      title,
      description,
      instructions,
      points: parseInt(points),
      difficulty,
      category,
      isActive,
      createdBy: req.user.id
    });

    // Populate createdBy field
    await mission.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Mission created successfully',
      mission
    });
  } catch (error) {
    console.error('Create mission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating mission',
      error: error.message
    });
  }
};

// @desc    Get all missions
// @route   GET /api/missions
// @access  Private
export const getMissions = async (req, res) => {
  try {
    const { category, difficulty, page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const missions = await Mission.find(query)
      .populate('createdBy', 'name email')
      .populate('submissions.student', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Mission.countDocuments(query);

    res.json({
      success: true,
      count: missions.length,
      total,
      pages: Math.ceil(total / limit),
      missions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching missions',
      error: error.message
    });
  }
};

// @desc    Get single mission
// @route   GET /api/missions/:id
// @access  Private
export const getMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('submissions.student', 'name email');

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    res.json({
      success: true,
      mission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mission',
      error: error.message
    });
  }
};

// @desc    Submit mission (Student)
// @route   POST /api/missions/:id/submit
// @access  Private
export const submitMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    const user = await User.findById(req.user.id);
    
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    // Check if user is student
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can submit missions'
      });
    }

    // Check if already submitted
    const existingSubmission = mission.submissions.find(
      sub => sub.student.toString() === req.user.id
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted this mission'
      });
    }

    // Check if mission is active
    if (!mission.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This mission is not active'
      });
    }

    // Add submission
    mission.submissions.push({
      student: req.user.id,
      submission: req.body.submission,
      fileUrl: req.body.fileUrl,
      status: 'pending'
    });

    await mission.save();

    res.json({
      success: true,
      message: 'Mission submitted successfully! Waiting for teacher approval.',
      submission: mission.submissions[mission.submissions.length - 1]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting mission',
      error: error.message
    });
  }
};

// @desc    Approve mission submission
// @route   PUT /api/missions/:missionId/approve/:submissionId
// @access  Private (Teachers/Admin)
export const approveMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.missionId);
    
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    // Find submission
    const submission = mission.submissions.id(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Check if already processed
    if (submission.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Submission already processed'
      });
    }

    // Update submission status
    submission.status = 'approved';
    submission.pointsAwarded = mission.points;
    submission.feedback = req.body.feedback || 'Great job! Mission approved.';

    // Award points to student
    const student = await User.findById(submission.student);
    student.points += mission.points;
    
    // Add to completed missions
    if (!student.completedMissions.includes(mission._id)) {
      student.completedMissions.push(mission._id);
    }

    // Check level up (every 100 points = 1 level)
    const newLevel = Math.floor(student.points / 100) + 1;
    if (newLevel > student.level) {
      student.level = newLevel;
    }

    await student.save();
    await mission.save();

    res.json({
      success: true,
      message: 'Mission approved! Points awarded to student.',
      pointsAwarded: mission.points,
      student: {
        name: student.name,
        newPoints: student.points,
        newLevel: student.level
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving mission',
      error: error.message
    });
  }
};

// @desc    Reject mission submission
// @route   PUT /api/missions/:missionId/reject/:submissionId
// @access  Private (Teachers/Admin)
export const rejectMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.missionId);
    
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    const submission = mission.submissions.id(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Submission already processed'
      });
    }

    submission.status = 'rejected';
    submission.feedback = req.body.feedback || 'Please improve and resubmit.';

    await mission.save();

    res.json({
      success: true,
      message: 'Mission rejected.',
      feedback: submission.feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting mission',
      error: error.message
    });
  }
};

// @desc    Get my submissions
// @route   GET /api/missions/submissions/mine
// @access  Private (Students)
export const getMySubmissions = async (req, res) => {
  try {
    const missions = await Mission.find({
      'submissions.student': req.user.id
    }).populate('submissions.student', 'name email');

    const mySubmissions = missions.flatMap(mission => 
      mission.submissions
        .filter(sub => sub.student._id.toString() === req.user.id)
        .map(sub => ({
          missionId: mission._id,
          missionTitle: mission.title,
          missionPoints: mission.points,
          submission: sub.submission,
          fileUrl: sub.fileUrl,
          status: sub.status,
          feedback: sub.feedback,
          pointsAwarded: sub.pointsAwarded,
          submittedAt: sub.submittedAt
        }))
    );

    res.json({
      success: true,
      submissions: mySubmissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};