// Seed script to populate MongoDB with dummy attendance data
// Run with: node scripts/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Attendance = require('../models/Attendance');

// MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance_db';

// Generate dummy attendance data
function generateDummyData() {
  const data = [];
  const today = new Date();
  
  // Generate data for the last 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);
    
    // Generate data for 5 different users (UIDs 1-5)
    for (let uid = 1; uid <= 5; uid++) {
      // Each user has 2-4 entries per day (check-in, lunch break, return, check-out)
      const numEntries = Math.floor(Math.random() * 3) + 2; // 2-4 entries
      
      for (let entry = 0; entry < numEntries; entry++) {
        const entryDate = new Date(date);
        
        // First entry (check-in) between 7:00 AM and 9:00 AM
        if (entry === 0) {
          entryDate.setHours(7 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0);
        }
        // Second entry (lunch/break) between 12:00 PM and 2:00 PM
        else if (entry === 1) {
          entryDate.setHours(12 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0);
        }
        // Third entry (return from lunch) between 1:00 PM and 3:00 PM
        else if (entry === 2) {
          entryDate.setHours(13 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0);
        }
        // Last entry (check-out) between 5:00 PM and 7:00 PM
        else {
          entryDate.setHours(17 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0);
        }
        
        data.push({
          uid: uid,
          timestamp: entryDate,
          verifyType: Math.floor(Math.random() * 3), // 0=fingerprint, 1=card, 2=PIN
          deviceIP: '10.255.254.49'
        });
      }
    }
  }
  
  return data;
}

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    const deleted = await Attendance.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing records`);
    
    // Generate dummy data
    console.log('📊 Generating dummy attendance data...');
    const dummyData = generateDummyData();
    console.log(`   Generated ${dummyData.length} records`);
    
    // Insert data into database
    console.log('💾 Inserting data into database...');
    const result = await Attendance.insertMany(dummyData);
    console.log(`✅ Successfully inserted ${result.length} attendance records`);
    
    // Show summary
    const totalRecords = await Attendance.countDocuments();
    const uniqueUsers = await Attendance.distinct('uid');
    console.log('\n📈 Database Summary:');
    console.log(`   Total records: ${totalRecords}`);
    console.log(`   Unique users: ${uniqueUsers.length}`);
    console.log(`   User IDs: ${uniqueUsers.sort((a, b) => a - b).join(', ')}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();

