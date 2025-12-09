# ZKTeco Attendance System Setup Guide

This guide will help you set up the ZKTeco BioPro SA20 attendance system integration.

## 📋 Prerequisites

1. ZKTeco BioPro SA20 device connected to your network
2. Node.js installed (v14 or higher)
3. Device IP address configured (default: 192.168.1.201)

## 🚀 Quick Start

### Step 1: Configure ZKTeco Device

On your BioPro SA20 device:
1. Go to **Menu → Comm → Ethernet**
2. Set a static IP address (e.g., `192.168.1.201`)
3. Ensure Port is set to **4370**
4. Save settings

### Step 2: Test Device Connectivity

From any computer on the same network:

```bash
# Windows
ping 192.168.1.201

# Mac/Linux
ping 192.168.1.201
```

If you get replies, the device is reachable.

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 4: Configure Device IP

Edit `server/server.js` and update the `DEVICE_IP` constant:

```javascript
const DEVICE_IP = process.env.DEVICE_IP || "192.168.1.201"; // Change this to your device IP
```

Or set it as an environment variable:

```bash
# Windows PowerShell
$env:DEVICE_IP="192.168.1.201"

# Linux/Mac
export DEVICE_IP="192.168.1.201"
```

### Step 5: Start Backend Server

```bash
cd server
npm start
```

The server will run on port 5000. You should see:
```
ZKTeco Attendance Server running on port 5000
Device IP: 192.168.1.201
Device Port: 4370
```

### Step 6: Configure Frontend (Optional)

If your backend is running on a different URL, create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

### Step 7: Start Frontend

In a new terminal:

```bash
npm run dev
```

## 📍 Accessing Attendance Page

1. Open your browser and go to your React app (usually `http://localhost:4000`)
2. Click on **"Attendance"** in the menu
3. Or navigate directly to: `http://localhost:4000/attendance`

## 🔍 Features

The Attendance page provides:

- **Connection Status**: Test connection to the ZKTeco device
- **Daily Summary**: View check-in/check-out times grouped by employee and date
- **Working Hours**: Automatically calculated from IN/OUT times
- **Raw Logs**: View all attendance entries in detail
- **Auto-refresh**: Data refreshes every 30 seconds automatically
- **Manual Refresh**: Click "Refresh Data" button to update immediately

## 🛠️ Troubleshooting

### Backend Issues

**Problem**: Connection Failed
- **Solution**: 
  - Verify device IP address is correct
  - Ensure device is on the same network
  - Check firewall settings (port 4370 should be open)
  - Try pinging the device IP

**Problem**: No attendance data
- **Solution**:
  - Make sure the device has recorded attendance logs
  - Check if users are registered on the device
  - Verify device time/date is correct

**Problem**: Server won't start
- **Solution**:
  - Check if port 5000 is already in use
  - Install dependencies: `cd server && npm install`
  - Check Node.js version: `node --version` (should be v14+)

### Frontend Issues

**Problem**: "Unable to connect to server"
- **Solution**:
  - Make sure backend server is running on port 5000
  - Check `.env` file has correct `VITE_API_URL`
  - Restart frontend after changing `.env` file

**Problem**: CORS errors
- **Solution**:
  - Backend already has CORS enabled
  - If issues persist, check browser console for specific errors

## 📊 API Endpoints

The backend provides these endpoints:

- `GET /health` - Health check
- `GET /connect` - Test device connection
- `GET /attendance` - Get all attendance logs
- `GET /users` - Get registered users

## 🔐 Security Notes

- The attendance page is protected by `ProtectedRoute` (currently allows all access)
- For production, ensure proper authentication is enabled
- Consider adding rate limiting to API endpoints
- Use HTTPS in production

## 📝 Next Steps

1. **Database Integration**: Store attendance logs in a database for historical records
2. **User Mapping**: Map device UIDs to employee names
3. **Reports**: Generate attendance reports (daily, weekly, monthly)
4. **Notifications**: Alert for late arrivals or missing check-ins
5. **Export**: Export attendance data to CSV/Excel

## 🆘 Support

If you encounter issues:
1. Check device connectivity: `ping [DEVICE_IP]`
2. Test backend API: `curl http://localhost:5000/health`
3. Check browser console for frontend errors
4. Review server logs for backend errors

