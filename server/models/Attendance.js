const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    required: true,
    index: true
  },
  // Additional fields for better data organization
  date: {
    type: String
  },
  time: {
    type: String
  },
  // Optional: Store device info
  deviceIP: {
    type: String
  },
  // Optional: Store verification type (fingerprint, card, etc.)
  verifyType: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for faster queries
attendanceSchema.index({ uid: 1, timestamp: -1 });
attendanceSchema.index({ date: 1 });

// Pre-save hook to automatically set date and time fields
attendanceSchema.pre('save', function(next) {
  if (this.timestamp) {
    const date = new Date(this.timestamp);
    this.date = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    this.time = date.toTimeString().split(' ')[0]; // HH:MM:SS format
  }
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;

