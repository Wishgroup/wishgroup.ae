// STEP 1 — Test Attendance Log Reading
// Run this with: node test-attendance.js

const ZKLib = require("node-zklib");

// Configuration - Update with your device IP
const DEVICE_IP = process.env.DEVICE_IP || "10.255.254.48";
const DEVICE_PORT = parseInt(process.env.DEVICE_PORT || "4370");
const INOUT = parseInt(process.env.INOUT || "10000");
const PING = parseInt(process.env.PING || "5000");

const zk = new ZKLib(DEVICE_IP, DEVICE_PORT, INOUT, PING);

async function testAttendance() {
  try {
    console.log(`Connecting to device at ${DEVICE_IP}:${DEVICE_PORT}...`);
    await zk.createSocket();
    
    console.log("Fetching attendance logs...");
    const logs = await zk.getAttendances();
    
    console.log("\n=== Attendance Logs ===");
    console.log(JSON.stringify(logs.data || logs, null, 2));
    
    await zk.disconnect();
    console.log("\n✅ Successfully read attendance logs!");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

testAttendance();

