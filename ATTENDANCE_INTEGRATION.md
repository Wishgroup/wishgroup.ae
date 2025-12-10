# Attendance Integration with Terrain Plumbob

This document explains how the online/offline attendance system integrates with the terrain plumbob feature.

## 🎯 Overview

The attendance system now works both **online** (MongoDB) and **offline** (localStorage), and displays attendance status on the 3D terrain plumbobs above each employee's head.

## 🟢 Plumbob Color Meanings

The plumbob (diamond indicator) above each person shows their attendance status:

- **🟢 Green** - Checked in (present)
- **🟠 Orange/Yellow** - Checked out (left for the day)
- **🔴 Red** - Not checked in today

## 📋 Features

### 1. Online/Offline Support
- **Online**: Attendance is saved directly to MongoDB via API
- **Offline**: Attendance is saved to localStorage and synced when connection is restored
- **Auto-sync**: Automatically syncs pending records every 5 minutes when online

### 2. Real-time Status Updates
- Plumbobs update automatically when attendance is marked
- Status refreshes every minute
- Works across multiple browser tabs

### 3. Attendance Button Component
- Floating button in bottom-right corner
- Shows current attendance status
- Allows check-in/check-out
- Displays pending sync count

## 🚀 Usage

### For Employees

1. **Check In**: Click the attendance button and select "Check In"
2. **Check Out**: Click the attendance button and select "Check Out"
3. **View Status**: Your plumbob color shows your current status

### For Developers

#### Adding Attendance Button to a Page

```jsx
import AttendanceButton from '../components/AttendanceButton';

function MyPage() {
  return (
    <div>
      {/* Your page content */}
      <AttendanceButton 
        userId={1} 
        userName="John Doe"
        onStatusUpdate={(userId, status) => {
          console.log('Status updated:', userId, status);
        }}
      />
    </div>
  );
}
```

#### Using Attendance Service Directly

```jsx
import { 
  markAttendance, 
  getTodayAttendanceStatus,
  getAllUsersAttendanceStatus 
} from '../utils/attendanceService';

// Mark attendance
const result = await markAttendance(userId);
console.log(result); // { success: true, synced: true/false }

// Get today's status
const status = await getTodayAttendanceStatus(userId);
console.log(status); 
// { checkedIn: true, checkedOut: false, checkInTime: "..." }

// Get all users' status
const statusMap = await getAllUsersAttendanceStatus([1, 2, 3]);
```

## 🔧 Technical Details

### Data Flow

1. **Mark Attendance**:
   ```
   User clicks button → markAttendance() → 
   Save to localStorage → Try API sync → 
   Update plumbob status
   ```

2. **Status Display**:
   ```
   Component loads → getTodayAttendanceStatus() → 
   Check API (online) or cache (offline) → 
   Update plumbob color
   ```

3. **Auto-sync**:
   ```
   Connection restored → syncPendingAttendance() → 
   Send pending records to API → 
   Clear localStorage → Update status
   ```

### Storage Keys

- `attendance_pending` - Pending attendance records (offline)
- `attendance_cache` - Cached attendance data (5 min TTL)

### API Endpoints

- `GET /attendance?uid={userId}&date={date}` - Get attendance for user/date
- `POST /attendance/sync` - Sync attendance records (device or web)

## 🎨 Plumbob Integration

The plumbob component automatically receives attendance status:

```jsx
<Plumbob 
  position={[...]}
  isOnline={person.isOnline}
  isOccupied={person.isOccupied}
  attendanceStatus={person.attendanceStatus} // Added
/>
```

The `attendanceStatus` object contains:
```javascript
{
  checkedIn: true/false,
  checkedOut: true/false,
  checkInTime: "2025-12-10T09:00:00.000Z",
  checkOutTime: "2025-12-10T17:30:00.000Z",
  lastAction: "2025-12-10T09:00:00.000Z",
  entries: 2
}
```

## 🔄 Sync Behavior

### When Online
- Attendance is immediately saved to MongoDB
- Status updates in real-time
- No pending records

### When Offline
- Attendance is saved to localStorage
- Pending count is displayed
- Auto-syncs when connection is restored
- Manual sync button available

## 📱 Browser Support

- Works in all modern browsers
- Requires localStorage support
- Uses Fetch API for network requests
- Detects online/offline status automatically

## 🐛 Troubleshooting

### Plumbob not updating
- Check browser console for errors
- Verify API endpoint is accessible
- Check if attendance service is initialized

### Pending records not syncing
- Check network connection
- Verify API endpoint URL
- Check browser console for errors
- Try manual sync button

### Status showing incorrectly
- Clear browser cache
- Check localStorage for old data
- Verify user ID matches database records

## 🎉 Next Steps

1. Add the AttendanceButton to your terrain/team page
2. Test online and offline functionality
3. Customize plumbob colors if needed
4. Add notifications for attendance events

