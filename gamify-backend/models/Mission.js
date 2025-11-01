import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a mission title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  instructions: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 10
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  category: {
    type: String,
    required: true,
    enum: ['environment', 'coding', 'math', 'science', 'language', 'creative', 'recycling', 'energy']
  },
  deadline: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  submissions: [{
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    submission: {
      type: String,
      required: true
    },
    fileUrl: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    feedback: String,
    pointsAwarded: Number,
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  maxAttempts: {
    type: Number,
    default: 3
  }
}, {
  timestamps: true
});

export default mongoose.model('Mission', missionSchema);