# MongoDB Setup Guide for Attendance System

This guide will help you set up MongoDB and populate it with dummy attendance data.

## 📋 Prerequisites

1. **Install MongoDB** on your system:
   - **macOS**: `brew install mongodb-community`
   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **Linux**: `sudo apt-get install mongodb` or follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**:
   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # MongoDB should start automatically as a service
   ```

3. **Verify MongoDB is running**:
   ```bash
   mongosh
   # or
   mongo
   ```
   If you see the MongoDB shell, you're good to go!

## 🚀 Quick Setup Steps

### Step 1: Install Dependencies

```bash
cd server
npm install
```

This will install:
- `mongoose` - MongoDB ODM (Object Document Mapper)
- `dotenv` - Environment variable management

### Step 2: Configure MongoDB Connection (Optional)

By default, the app connects to `mongodb://localhost:27017/attendance_db`.

To use a different MongoDB instance, create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/attendance_db
DEVICE_IP=10.255.254.49
DEVICE_PORT=80
PORT=5001
```

### Step 3: Seed Database with Dummy Data

Run the seed script to populate your database with sample attendance data:

```bash
cd server
npm run seed
```

This will:
- Create the `attendance_db` database
- Create an `attendances` collection
- Insert ~100+ dummy attendance records for 5 users over the last 7 days
- Show you a summary of the data

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Deleted 0 existing records
📊 Generating dummy attendance data...
   Generated 105 records
💾 Inserting data into database...
✅ Successfully inserted 105 attendance records

📈 Database Summary:
   Total records: 105
   Unique users: 5
   User IDs: 1, 2, 3, 4, 5

✅ Seeding completed successfully!
```

### Step 4: Start the Server

```bash
npm start
```

The server will:
- Connect to MongoDB automatically
- Start on port 5001
- Be ready to serve attendance data

## 📊 Database Structure

### Collection: `attendances`

Each document contains:
```javascript
{
  _id: ObjectId,
  uid: Number,              // User ID (1-5)
  timestamp: Date,           // Full date and time
  date: String,             // YYYY-MM-DD format
  time: String,             // HH:MM:SS format
  verifyType: Number,       // 0=fingerprint, 1=card, 2=PIN
  deviceIP: String,         // Device IP address
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

## 🔌 API Endpoints

### Get Attendance Data
```
GET http://localhost:5001/attendance
```

**Query Parameters:**
- `uid` - Filter by user ID (e.g., `?uid=1`)
- `date` - Filter by date (e.g., `?date=2025-12-09`)
- `limit` - Limit results (e.g., `?limit=10`)
- `sort` - Sort order: `asc` or `desc` (default: `desc`)

**Examples:**
```bash
# Get all attendance
curl http://localhost:5001/attendance

# Get attendance for user 1
curl http://localhost:5001/attendance?uid=1

# Get today's attendance
curl http://localhost:5001/attendance?date=2025-12-09

# Get latest 10 records
curl http://localhost:5001/attendance?limit=10
```

### Sync from Device
```
POST http://localhost:5001/attendance/sync
```

Syncs attendance data from the ZKTeco device to MongoDB (avoids duplicates).

### Get Statistics
```
GET http://localhost:5001/attendance/stats
```

Returns:
- Total records count
- Number of unique users
- List of user IDs
- Latest and oldest record timestamps

## 🗄️ MongoDB Commands (Optional)

You can also interact with MongoDB directly:

```bash
# Connect to MongoDB shell
mongosh

# Or use the old mongo command
mongo
```

**Useful Commands:**
```javascript
// Switch to attendance database
use attendance_db

// View all collections
show collections

// Count attendance records
db.attendances.countDocuments()

// Find all records
db.attendances.find().pretty()

// Find records for user 1
db.attendances.find({ uid: 1 }).pretty()

// Find today's records
db.attendances.find({ date: "2025-12-09" }).pretty()

// Delete all records (be careful!)
db.attendances.deleteMany({})
```

## 🔄 Resetting/Re-seeding Data

To clear and re-seed the database:

```bash
cd server
npm run seed
```

The seed script will automatically delete existing records before inserting new ones.

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running:
   ```bash
   # Check if MongoDB is running
   ps aux | grep mongod
   ```
2. Start MongoDB service (see Prerequisites above)

### Port Already in Use

**Error:** `Port 27017 already in use`

**Solution:**
- MongoDB is already running, which is good!
- Or change the port in your MongoDB configuration

### Database Not Found

**Solution:**
- MongoDB creates databases automatically when you first insert data
- Run the seed script: `npm run seed`

## 📝 Next Steps

1. **View Data in Browser**: Open your React app and go to the Attendance page
2. **Customize Data**: Edit `scripts/seed.js` to generate different dummy data
3. **Add Real Data**: Use the `/attendance/sync` endpoint to sync from your ZKTeco device
4. **Query Data**: Use the API endpoints to filter and query attendance data

## 🎉 You're All Set!

Your MongoDB database is now set up with dummy attendance data. The website will automatically fetch and display this data when you visit the Attendance page!

