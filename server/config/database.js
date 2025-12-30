const mongoose = require('mongoose');

// MongoDB connection string
// Default to local MongoDB, can be overridden with environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance_db';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      // MongoDB Atlas connection options
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log('✅ MongoDB Connected Successfully');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('⚠️  MongoDB Connection Error:', error.message);
    console.log('⚠️  Server will continue without MongoDB (email functionality will still work)');
    // Don't exit - allow server to run for email functionality
    // process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Error:', err);
});

module.exports = connectDB;

