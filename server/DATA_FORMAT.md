# Attendance Database Data Format

This document explains the exact format for attendance records in the MongoDB database.

## 📋 Required Fields

Each attendance record must have these **required** fields:

```json
{
  "uid": 1,
  "timestamp": "2025-12-10T09:00:00.000Z"
}
```

### Field Details:

1. **`uid`** (Number, Required)
   - User ID / Employee ID
   - Example: `1`, `2`, `3`, etc.
   - Must be a number

2. **`timestamp`** (Date/ISO String, Required)
   - Full date and time of attendance
   - Format: ISO 8601 string or JavaScript Date
   - Examples:
     - `"2025-12-10T09:00:00.000Z"` (ISO string)
     - `"2025-12-10T14:30:00.000Z"` (ISO string)
     - `new Date("2025-12-10T09:00:00")` (Date object)

## 📋 Optional Fields

These fields are **optional** but can be included:

```json
{
  "uid": 1,
  "timestamp": "2025-12-10T09:00:00.000Z",
  "verifyType": 0,
  "deviceIP": "10.255.254.49"
}
```

### Optional Field Details:

3. **`verifyType`** (Number, Optional)
   - Verification method used
   - `0` = Fingerprint
   - `1` = RFID Card
   - `2` = PIN/Password
   - Default: `0`

4. **`deviceIP`** (String, Optional)
   - IP address of the device that recorded attendance
   - Example: `"10.255.254.49"`

## 🔄 Auto-Generated Fields

These fields are **automatically generated** when you save a record:

- **`date`** - Extracted from timestamp (format: `YYYY-MM-DD`)
- **`time`** - Extracted from timestamp (format: `HH:MM:SS`)
- **`createdAt`** - When the record was created in database
- **`updatedAt`** - When the record was last updated
- **`_id`** - MongoDB unique identifier

## 📝 Complete Example Records

### Example 1: Basic Record (Minimum Required)
```json
{
  "uid": 1,
  "timestamp": "2025-12-10T09:00:00.000Z"
}
```

### Example 2: Complete Record (With All Fields)
```json
{
  "uid": 2,
  "timestamp": "2025-12-10T08:30:00.000Z",
  "verifyType": 1,
  "deviceIP": "10.255.254.49"
}
```

### Example 3: Multiple Records (Array Format)
```json
[
  {
    "uid": 1,
    "timestamp": "2025-12-10T09:00:00.000Z"
  },
  {
    "uid": 1,
    "timestamp": "2025-12-10T17:30:00.000Z"
  },
  {
    "uid": 2,
    "timestamp": "2025-12-10T08:45:00.000Z"
  }
]
```

## 🕐 Timestamp Format Examples

The `timestamp` field accepts various date formats:

### ISO 8601 String (Recommended)
```json
"2025-12-10T09:00:00.000Z"
"2025-12-10T14:30:00.000Z"
"2025-12-10T17:45:30.000Z"
```

### Date String (Also Accepted)
```json
"2025-12-10T09:00:00"
"2025-12-10 09:00:00"
"December 10, 2025 09:00:00"
```

### Unix Timestamp (Milliseconds)
```json
1733817600000
```

## 📤 How to Insert Data

### Method 1: Using MongoDB Compass / MongoDB Atlas UI

1. Connect to your MongoDB Atlas cluster
2. Navigate to `attendance_db` → `attendances` collection
3. Click "Insert Document"
4. Paste this format:
```json
{
  "uid": 1,
  "timestamp": "2025-12-10T09:00:00.000Z"
}
```

### Method 2: Using API Endpoint (POST)

Create a new endpoint or use MongoDB directly. The current API only reads data.

### Method 3: Using MongoDB Shell

```javascript
use attendance_db

db.attendances.insertOne({
  uid: 1,
  timestamp: new Date("2025-12-10T09:00:00.000Z")
})

// Or insert multiple
db.attendances.insertMany([
  { uid: 1, timestamp: new Date("2025-12-10T09:00:00.000Z") },
  { uid: 1, timestamp: new Date("2025-12-10T17:30:00.000Z") },
  { uid: 2, timestamp: new Date("2025-12-10T08:45:00.000Z") }
])
```

### Method 4: Using Node.js Script

```javascript
const Attendance = require('./models/Attendance');

// Single record
await Attendance.create({
  uid: 1,
  timestamp: new Date("2025-12-10T09:00:00.000Z")
});

// Multiple records
await Attendance.insertMany([
  { uid: 1, timestamp: new Date("2025-12-10T09:00:00.000Z") },
  { uid: 1, timestamp: new Date("2025-12-10T17:30:00.000Z") }
]);
```

## ✅ Validation Rules

- **`uid`** must be a number (not a string)
- **`timestamp`** must be a valid date
- Both fields are required
- Duplicate records (same uid + timestamp) are allowed (no unique constraint)

## 📊 Sample Data for Testing

Here's a complete sample you can copy and paste:

```json
[
  {
    "uid": 1,
    "timestamp": "2025-12-10T08:30:00.000Z",
    "verifyType": 0
  },
  {
    "uid": 1,
    "timestamp": "2025-12-10T17:30:00.000Z",
    "verifyType": 0
  },
  {
    "uid": 2,
    "timestamp": "2025-12-10T09:00:00.000Z",
    "verifyType": 1
  },
  {
    "uid": 2,
    "timestamp": "2025-12-10T18:00:00.000Z",
    "verifyType": 1
  },
  {
    "uid": 3,
    "timestamp": "2025-12-10T08:45:00.000Z",
    "verifyType": 2
  },
  {
    "uid": 3,
    "timestamp": "2025-12-10T17:45:00.000Z",
    "verifyType": 2
  }
]
```

## 🔍 What Gets Displayed

When you fetch data via API (`GET /attendance`), you'll receive:

```json
[
  {
    "uid": 1,
    "timestamp": "2025-12-10T08:30:00.000Z",
    "date": "2025-12-10",
    "time": "08:30:00",
    "verifyType": 0
  }
]
```

Note: `date` and `time` are automatically extracted from `timestamp` when saved.

