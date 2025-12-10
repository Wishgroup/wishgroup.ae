# Quick Start Guide - MongoDB Attendance System

## 🚀 Setup in 3 Steps

### Step 1: Install MongoDB

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will start automatically as a service

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Verify Installation:**
```bash
mongosh --version
# or
mongo --version
```

### Step 2: Seed Database with Dummy Data

```bash
cd server
npm run seed
```

This creates the database and adds ~100+ dummy attendance records.

### Step 3: Start the Server

```bash
npm start
```

The server will connect to MongoDB and start on port 5001.

## ✅ Verify It Works

1. **Check server health:**
   ```bash
   curl http://localhost:5001/health
   ```
   Should show: `{"status":"ok","database":"connected",...}`

2. **Get attendance data:**
   ```bash
   curl http://localhost:5001/attendance
   ```
   Should return an array of attendance records.

3. **View in browser:**
   - Open your React app
   - Go to the Attendance page
   - You should see the dummy data displayed!

## 📊 What You Get

- **Database:** `attendance_db`
- **Collection:** `attendances`
- **Records:** ~100+ dummy records
- **Users:** 5 users (UIDs 1-5)
- **Time Range:** Last 7 days
- **Data:** Check-in, break, return, check-out times

## 🔄 Re-seed Data

To clear and add new dummy data:
```bash
npm run seed
```

## 📝 Need Help?

See `MONGODB_SETUP.md` for detailed instructions and troubleshooting.

