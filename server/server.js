require('dotenv').config();
const express = require("express");
const cors = require("cors");
const ZKLib = require("node-zklib");
const nodemailer = require("nodemailer");
const connectDB = require('./config/database');
const Attendance = require('./models/Attendance');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Configuration - Replace with your device IP address
const DEVICE_IP = process.env.DEVICE_IP || "10.255.254.49";
const DEVICE_PORT = parseInt(process.env.DEVICE_PORT || "80");
const INOUT = parseInt(process.env.INOUT || "10000");
const PING = parseInt(process.env.PING || "5000");

// Email Configuration
const createTransporter = () => {
  // If SMTP credentials are provided, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  // Otherwise, return null (email sending will be disabled)
  return null;
};

const transporter = createTransporter();

const zk = new ZKLib(DEVICE_IP, DEVICE_PORT, INOUT, PING);

// Test connection endpoint
app.get("/connect", async (req, res) => {
  try {
    await zk.createSocket();
    await zk.disconnect();
    res.json({ 
      success: true, 
      message: "Connected to ZKTeco Machine Successfully!",
      deviceIP: DEVICE_IP
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Connection Failed: " + err.toString(),
      error: err.message
    });
  }
});

// Get attendance timings from MongoDB
app.get("/attendance", async (req, res) => {
  try {
    // Query parameters for filtering
    const { uid, date, limit, sort } = req.query;
    
    // Build query
    const query = {};
    if (uid) query.uid = parseInt(uid);
    if (date) query.date = date;
    
    // Build sort (default: newest first)
    const sortOption = sort === 'asc' ? { timestamp: 1 } : { timestamp: -1 };
    
    // Build limit (default: no limit, or set a reasonable max)
    const limitOption = limit ? parseInt(limit) : null;
    
    // Fetch from MongoDB
    let attendanceData;
    if (limitOption) {
      attendanceData = await Attendance.find(query)
        .sort(sortOption)
        .limit(limitOption)
        .lean();
    } else {
      attendanceData = await Attendance.find(query)
        .sort(sortOption)
        .lean();
    }
    
    // Format data for frontend (ensure timestamp is ISO string)
    const formattedData = attendanceData.map(log => ({
      uid: log.uid,
      timestamp: log.timestamp instanceof Date 
        ? log.timestamp.toISOString() 
        : new Date(log.timestamp).toISOString(),
      date: log.date,
      time: log.time,
      verifyType: log.verifyType
    }));
    
    res.json(formattedData);
  } catch (err) {
    console.error("Error fetching attendance from database:", err);
    res.status(500).json({ 
      error: err.message,
      message: "Failed to fetch attendance from database"
    });
  }
});

// Sync attendance from device or web to MongoDB
app.post("/attendance/sync", async (req, res) => {
  try {
    let attendanceData = [];
    
    // Check if request body has attendance records (web-based)
    // This takes priority - if body has data, use it (don't connect to device)
    if (req.body && Array.isArray(req.body) && req.body.length > 0) {
      attendanceData = req.body;
      console.log(`Received ${attendanceData.length} web-based attendance record(s)`);
    } else if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      // Handle single object (wrap in array)
      attendanceData = [req.body];
      console.log('Received single web-based attendance record');
    } else {
      // Only fetch from device if no web data provided
      console.log('No web data provided, attempting to fetch from device...');
      try {
        await zk.createSocket();
        const logs = await zk.getAttendances();
        await zk.disconnect();

        // Handle different response formats from device
        if (Array.isArray(logs)) {
          attendanceData = logs;
        } else if (logs && Array.isArray(logs.data)) {
          attendanceData = logs.data;
        } else if (logs && logs.attendance) {
          attendanceData = Array.isArray(logs.attendance) ? logs.attendance : [];
        } else if (logs && typeof logs === 'object') {
          attendanceData = Object.values(logs).find(val => Array.isArray(val)) || [];
        }
      } catch (deviceError) {
        // Device connection failed, but that's OK if we have web data
        console.log('Device connection failed (this is OK if using web records):', deviceError.message);
        // Return empty array - no device data available
        attendanceData = [];
      }
    }

    if (attendanceData.length === 0) {
      return res.json({ 
        success: true, 
        message: "No new data to sync",
        synced: 0
      });
    }

    // Save to MongoDB (avoid duplicates)
    let syncedCount = 0;
    for (const log of attendanceData) {
      const timestamp = log.timestamp || log.recordTime || log.time || log.date || log.datetime;
      const uid = log.uid || log.deviceUserId || log.userId;
      
      if (!timestamp || !uid) continue;
      
      const logDate = new Date(timestamp);
      
      // Check if record already exists (within 1 second tolerance for duplicates)
      const oneSecondBefore = new Date(logDate.getTime() - 1000);
      const oneSecondAfter = new Date(logDate.getTime() + 1000);
      
      const exists = await Attendance.findOne({
        uid: uid,
        timestamp: {
          $gte: oneSecondBefore,
          $lte: oneSecondAfter
        }
      });
      
      if (!exists) {
        await Attendance.create({
          uid: uid,
          timestamp: logDate,
          verifyType: log.verifyType || 0,
          deviceIP: log.deviceIP || DEVICE_IP || 'web'
        });
        syncedCount++;
      }
    }

    res.json({ 
      success: true, 
      message: `Synced ${syncedCount} new attendance records`,
      synced: syncedCount,
      total: attendanceData.length
    });
  } catch (err) {
    console.error("Sync error:", err);
    
    // Extract error message properly
    let errorMessage = "Unknown error";
    let errorString = "";
    
    if (err instanceof Error) {
      errorMessage = err.message;
      errorString = err.toString();
    } else if (typeof err === 'string') {
      errorMessage = err;
      errorString = err;
    } else if (err && typeof err === 'object') {
      errorMessage = JSON.stringify(err);
      errorString = JSON.stringify(err);
    }
    
    // Check if it's a connection error
    const isConnectionError = 
      errorString.includes('timeout') || 
      errorString.includes('ECONNREFUSED') || 
      errorString.includes('ENOTFOUND') ||
      errorString.includes('UDP CONNECT') ||
      errorString.includes('command') ||
      (err && err.command);
    
    if (isConnectionError) {
      return res.status(500).json({ 
        success: false,
        error: "Device connection failed",
        message: "Unable to connect to ZKTeco device. Please check device IP and network connection."
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: errorMessage,
      message: "Failed to sync attendance: " + errorMessage
    });
  }
});

// Get attendance statistics
app.get("/attendance/stats", async (req, res) => {
  try {
    const totalRecords = await Attendance.countDocuments();
    const uniqueUsers = await Attendance.distinct('uid');
    const latestRecord = await Attendance.findOne().sort({ timestamp: -1 });
    const oldestRecord = await Attendance.findOne().sort({ timestamp: 1 });
    
    res.json({
      totalRecords,
      uniqueUsers: uniqueUsers.length,
      userIds: uniqueUsers.sort((a, b) => a - b),
      latestRecord: latestRecord ? latestRecord.timestamp : null,
      oldestRecord: oldestRecord ? oldestRecord.timestamp : null
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ 
      error: err.message,
      message: "Failed to fetch statistics"
    });
  }
});

// Email inquiry endpoint (also handles newsletter subscriptions)
app.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: "Valid email address is required"
      });
    }

    // Check if email transporter is configured
    if (!transporter) {
      console.log("Email not configured. Email inquiry received:", email);
      // Still return success to user, but log the email
      return res.json({
        success: true,
        message: "Thank you for your inquiry! (Email service not configured - inquiry logged)"
      });
    }

    // Email configuration
    const emailTo = process.env.EMAIL_TO || "careers@wishgroup.ae";
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || "noreply@wishgroup.ae";

    // Send email
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: "New Email Inquiry from Website",
      text: `New email inquiry received from: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #126771;">New Email Inquiry</h2>
          <p>A new email inquiry has been received from the website.</p>
          <p style="margin-top: 15px;">
            <strong>Email Address:</strong> <a href="mailto:${email}">${email}</a>
          </p>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Inquiry Date: ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Thank you for your inquiry! We will get back to you soon."
    });
  } catch (err) {
    console.error("Error sending email inquiry:", err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to send inquiry. Please try again later."
    });
  }
});

// Chatbot inquiry endpoint
app.post("/chatbot/inquiry", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required"
      });
    }

    // Validate email
    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: "Valid email address is required"
      });
    }

    // Check if email transporter is configured
    if (!transporter) {
      console.log("Email not configured. Chatbot inquiry received:", { name, email, phone, message });
      // Still return success to user, but log the inquiry
      return res.json({
        success: true,
        message: "Thank you for your inquiry! (Email service not configured - inquiry logged)"
      });
    }

    // Email configuration
    const emailTo = process.env.EMAIL_TO || "info@wishgroup.ae";
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || "noreply@wishgroup.ae";

    // Send email
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: "New Customer Inquiry from Chatbot",
      text: `New customer inquiry received from chatbot:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #126771;">New Customer Inquiry from Chatbot</h2>
          <p>A new customer inquiry has been received through the website chatbot.</p>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 8px 0;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="margin: 8px 0;">
              <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
            </p>
            ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
            <p style="margin: 8px 0;">
              <strong>Message:</strong>
            </p>
            <div style="margin-top: 10px; padding: 12px; background: white; border-left: 3px solid #A6033F; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Inquiry Date: ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Thank you for your inquiry! We will get back to you soon."
    });
  } catch (err) {
    console.error("Error sending chatbot inquiry:", err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to send inquiry. Please try again later."
    });
  }
});

// Health check endpoint
app.get("/health", async (req, res) => {
  const dbStatus = require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({ 
    status: "ok", 
    database: dbStatus,
    deviceIP: DEVICE_IP,
    port: DEVICE_PORT,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Device IP: ${DEVICE_IP}`);
  console.log(`Device Port: ${DEVICE_PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /health - Health check`);
  console.log(`  GET /connect - Test device connection`);
  console.log(`  GET /attendance - Get attendance logs from database`);
  console.log(`  POST /attendance/sync - Sync attendance from device to database`);
  console.log(`  GET /attendance/stats - Get attendance statistics`);
  console.log(`  POST /newsletter/subscribe - Email inquiry / Newsletter subscription`);
  console.log(`  POST /chatbot/inquiry - Chatbot customer inquiry`);
});
