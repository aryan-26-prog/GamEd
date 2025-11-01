import express from 'express';
import { 
  getMissions, 
  getMission, 
  createMission, 
  submitMission,
  approveMission,
  rejectMission,
  getMySubmissions
} from '../controllers/missionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import Mission from '../models/Mission.js';

const router = express.Router();

// Public routes (with authentication)
router.get('/', protect, getMissions);
router.get('/:id', protect, getMission);
router.get('/submissions/mine', protect, getMySubmissions);
router.post('/:id/submit', protect, submitMission);

// Teacher/Admin only routes
router.post('/', protect, authorize('teacher', 'admin'), createMission);
router.put('/:missionId/approve/:submissionId', protect, authorize('teacher', 'admin'), approveMission);
router.put('/:missionId/reject/:submissionId', protect, authorize('teacher', 'admin'), rejectMission);

// Delete mission route
router.delete('/:id', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    // Check if user owns the mission or is admin
    if (mission.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this mission'
      });
    }

    await Mission.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Mission deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting mission',
      error: error.message
    });
  }
});

export default router; // ✅ IMPORTANT: Ye line use karo