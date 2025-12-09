# ZKTeco Attendance Server

Backend server for connecting to ZKTeco BioPro SA20 attendance device and fetching attendance logs.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Device IP

Edit `server.js` and update the `DEVICE_IP` constant, or set it as an environment variable:

```bash
# Windows PowerShell
$env:DEVICE_IP="192.168.1.201"
npm start

# Linux/Mac
export DEVICE_IP="192.168.1.201"
npm start
```

### 3. Start the Server

```bash
npm start
```

The server will run on port 5000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /connect` - Test connection to ZKTeco device
- `GET /attendance` - Get all attendance logs from the device
- `GET /users` - Get registered users from the device

## Device Configuration

Make sure your ZKTeco BioPro SA20 device is configured with:
- IP Address: Set to a static IP (e.g., 192.168.1.201)
- Port: 4370 (default ZKTeco communication port)
- Network: Device must be on the same network as the server

## Testing Connection

1. First, test if the device is reachable:
   ```bash
   ping 192.168.1.201
   ```

2. Then test the API connection:
   ```bash
   curl http://localhost:5000/connect
   ```

3. Fetch attendance data:
   ```bash
   curl http://localhost:5000/attendance
   ```

## Troubleshooting

- **Connection Failed**: Check if device IP is correct and device is on the same network
- **Port 4370 blocked**: Check firewall settings
- **No data returned**: Make sure the device has recorded attendance logs

