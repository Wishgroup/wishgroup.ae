import express from "express";
import cors from "cors";
import ZKTeco from "zkteco";

const app = express();
app.use(cors());
app.use(express.json());

// Configuration - Replace with your device IP address
const DEVICE_IP = process.env.DEVICE_IP || "192.168.1.201";
const DEVICE_PORT = process.env.DEVICE_PORT || "4370";

// Create devices array for ZKTeco library
const devices = [{ deviceIp: DEVICE_IP, devicePort: DEVICE_PORT }];

// Helper function to create and connect ZKTeco instance
const createZKInstance = async () => {
  const zkInstance = new ZKTeco(devices);
  await zkInstance.connectAll();
  return zkInstance;
};

// Test connection endpoint
app.get("/connect", async (req, res) => {
  let zkInstance = null;
  try {
    zkInstance = await createZKInstance();
    // Test by getting time from device
    await zkInstance.getTime(DEVICE_IP);
    res.json({ 
      success: true, 
      message: "Connected to ZKTeco Machine Successfully!",
      deviceIP: DEVICE_IP
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Connection Failed: " + err.toString(),
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Get attendance timings
app.get("/attendance", async (req, res) => {
  let zkInstance = null;
  try {
    zkInstance = await createZKInstance();
    
    // Check if device is connected
    const connectedIps = await zkInstance.getAllConnectedIps();
    console.log("Connected devices:", connectedIps);
    
    if (!connectedIps || !connectedIps.includes(DEVICE_IP)) {
      return res.status(500).json({
        success: false,
        message: `Device ${DEVICE_IP} is not connected. Connected devices: ${connectedIps ? connectedIps.join(', ') : 'none'}`,
        error: "Device not connected"
      });
    }
    
    // Get attendance size first to check if there are any records
    const attendanceSize = await zkInstance.getAttendanceSize(DEVICE_IP);
    console.log("Attendance size on device:", attendanceSize);
    
    // Get attendance logs - the method requires device IP as parameter
    const logs = await zkInstance.getAttendances(DEVICE_IP);
    
    // Log raw response for debugging
    console.log("Raw logs response type:", typeof logs);
    console.log("Raw logs is array:", Array.isArray(logs));
    if (logs) {
      console.log("Raw logs count:", Array.isArray(logs) ? logs.length : 'not an array');
      if (Array.isArray(logs) && logs.length > 0) {
        console.log("Sample log entry:", JSON.stringify(logs[0], null, 2));
      }
    } else {
      console.log("Logs is null/undefined");
    }
    
    // Handle different response formats
    let attendanceData = [];
    if (Array.isArray(logs)) {
      attendanceData = logs;
      console.log("Using logs as array, count:", logs.length);
    } else if (logs && Array.isArray(logs.data)) {
      attendanceData = logs.data;
      console.log("Using logs.data array, count:", logs.data.length);
    } else if (logs && logs.attendance) {
      attendanceData = Array.isArray(logs.attendance) ? logs.attendance : [];
      console.log("Using logs.attendance, count:", attendanceData.length);
    } else if (logs && typeof logs === 'object') {
      // If logs is an object, try to extract array from it
      attendanceData = Object.values(logs).find(val => Array.isArray(val)) || [];
      console.log("Extracted array from logs object, count:", attendanceData.length);
    } else if (logs === null || logs === undefined) {
      console.log("Logs is null/undefined - device may have no attendance records or connection issue");
    } else {
      console.log("Unexpected logs format:", typeof logs);
    }
    
    // Format the data for better readability
    // The zkteco library returns: { userSn, verifyType, verify_state, deviceUserId, recordTime, deviceIp }
    const formattedLogs = attendanceData.map(log => {
      // The library returns recordTime as a string, and deviceUserId as the user ID
      const timestamp = log.recordTime || log.timestamp || log.time || log.date || log.datetime;
      const uid = log.deviceUserId || log.uid || log.userId || log.id || log.user_id || log.userID || log.userSn || 'Unknown';
      
      if (!timestamp) {
        console.warn('Log entry missing timestamp:', log);
        return null;
      }
      
      try {
        // Handle timestamp - might be a Date object, string, or number
        const dateObj = timestamp instanceof Date ? timestamp : new Date(timestamp);
        
        // Validate the date
        if (isNaN(dateObj.getTime())) {
          console.warn('Invalid date for log entry:', log, 'timestamp:', timestamp);
          return null;
        }
        
        return {
          uid: uid,
          userSn: log.userSn,
          verifyType: log.verifyType,
          verify_state: log.verify_state,
          timestamp: dateObj.toISOString(),
          date: dateObj.toLocaleDateString(),
          time: dateObj.toLocaleTimeString(),
          datetime: dateObj.toLocaleString()
        };
      } catch (e) {
        console.warn('Error formatting log entry:', log, e);
        return null;
      }
    }).filter(log => log !== null);
    
    // Return response with helpful message if no data
    if (formattedLogs.length === 0) {
      return res.json({
        success: true,
        count: 0,
        data: [],
        message: attendanceSize === 0 
          ? "Device has no attendance records. Please record attendance on the device first."
          : `Device reports ${attendanceSize} records but none were retrieved. This may indicate a data format issue.`,
        attendanceSize: attendanceSize,
        connected: connectedIps && connectedIps.includes(DEVICE_IP)
      });
    }
    
    res.json({
      success: true,
      count: formattedLogs.length,
      data: formattedLogs
    });
  } catch (err) {
    console.error("Attendance fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch attendance: " + err.toString(),
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Get users from device
app.get("/users", async (req, res) => {
  let zkInstance = null;
  try {
    zkInstance = await createZKInstance();
    
    // Get users - the method requires device IP as parameter
    const users = await zkInstance.getUsers(DEVICE_IP);
    
    let userData = [];
    if (Array.isArray(users)) {
      userData = users;
    } else if (users && Array.isArray(users.data)) {
      userData = users.data;
    }
    
    res.json({
      success: true,
      count: userData.length,
      data: userData
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch users: " + err.toString(),
      error: err.message
    });
  }
});

// Debug endpoint to check raw attendance data
app.get("/debug-attendance", async (req, res) => {
  let zkInstance = null;
  try {
    zkInstance = await createZKInstance();
    
    // Check connection
    const connectedIps = await zkInstance.getAllConnectedIps();
    const attendanceSize = await zkInstance.getAttendanceSize(DEVICE_IP);
    const logs = await zkInstance.getAttendances(DEVICE_IP);
    
    res.json({
      success: true,
      connectedDevices: connectedIps,
      attendanceSize: attendanceSize,
      rawLogs: logs,
      logsType: typeof logs,
      isArray: Array.isArray(logs),
      logsLength: Array.isArray(logs) ? logs.length : 'N/A',
      logsKeys: logs && typeof logs === 'object' && !Array.isArray(logs) ? Object.keys(logs) : 'N/A',
      firstLogEntry: Array.isArray(logs) && logs.length > 0 ? logs[0] : (logs && typeof logs === 'object' ? logs : null),
      deviceIP: DEVICE_IP
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
});

// Debug endpoint to check library methods
app.get("/debug", async (req, res) => {
  try {
    const zkInstance = new ZKTeco(devices);
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(zkInstance)).filter(
      name => typeof zkInstance[name] === 'function' && name !== 'constructor'
    );
    res.json({
      success: true,
      methods: methods,
      deviceIP: DEVICE_IP,
      port: DEVICE_PORT
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
      methods: []
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    deviceIP: DEVICE_IP,
    port: DEVICE_PORT,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ZKTeco Attendance Server running on port ${PORT}`);
  console.log(`Device IP: ${DEVICE_IP}`);
  console.log(`Device Port: ${DEVICE_PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /health - Health check`);
  console.log(`  GET /connect - Test device connection`);
  console.log(`  GET /attendance - Get attendance logs`);
  console.log(`  GET /users - Get registered users`);
});

