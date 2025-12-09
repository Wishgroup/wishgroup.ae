import React, { useEffect, useState } from "react";
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import Footer from '../components/Footer';

export default function Attendance() {
  useScrollAnimations();
  
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [attendanceInfo, setAttendanceInfo] = useState(null);

  // Backend server URL - Update this to match your server
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Test connection
  const testConnection = async () => {
    try {
      setConnectionStatus("testing");
      const response = await fetch(`${API_BASE_URL}/connect`);
      const data = await response.json();
      setConnectionStatus(data.success ? "connected" : "failed");
      return data.success;
    } catch (err) {
      setConnectionStatus("failed");
      return false;
    }
  };

  // Fetch attendance data
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/attendance`);
      const data = await response.json();
      
      if (data.success) {
        setLogs(data.data || []);
        setAttendanceInfo({
          message: data.message,
          attendanceSize: data.attendanceSize,
          connected: data.connected
        });
        setLastRefresh(new Date());
      } else {
        setError(data.message || "Failed to fetch attendance data");
      }
    } catch (err) {
      setError("Unable to connect to server. Make sure the backend server is running on port 5000.");
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
    fetchAttendance();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchAttendance();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Group logs by user and date to show IN/OUT pairs
  const groupAttendanceByUser = () => {
    const grouped = {};
    
    logs.forEach(log => {
      const date = new Date(log.timestamp).toDateString();
      const uid = log.uid;
      const key = `${uid}_${date}`;
      
      if (!grouped[key]) {
        grouped[key] = {
          uid,
          date,
          entries: []
        };
      }
      
      grouped[key].entries.push({
        timestamp: log.timestamp,
        time: new Date(log.timestamp).toLocaleTimeString(),
        datetime: new Date(log.timestamp).toLocaleString()
      });
    });

    // Sort entries by time and determine IN/OUT
    Object.keys(grouped).forEach(key => {
      grouped[key].entries.sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );
      
      // Mark first entry as IN, last as OUT
      if (grouped[key].entries.length > 0) {
        grouped[key].checkIn = grouped[key].entries[0].time;
        grouped[key].checkOut = grouped[key].entries[grouped[key].entries.length - 1].time;
        
        // Calculate working hours if both IN and OUT exist
        if (grouped[key].entries.length >= 2) {
          const checkInTime = new Date(grouped[key].entries[0].timestamp);
          const checkOutTime = new Date(grouped[key].entries[grouped[key].entries.length - 1].timestamp);
          const diffMs = checkOutTime - checkInTime;
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          grouped[key].workingHours = `${diffHours}h ${diffMinutes}m`;
        }
      }
    });

    return Object.values(grouped).sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  };

  const groupedAttendance = groupAttendanceByUser();

  return (
    <div className="mil-wrapper">
      <div className="mil-content" style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div style={{ marginBottom: '40px' }}>
                <h1 className="mil-up" style={{ marginBottom: '20px' }}>
                  Staff Attendance Timings
                </h1>
                <p className="mil-up" style={{ marginBottom: '30px', color: '#666' }}>
                  View real-time attendance logs from ZKTeco BioPro SA20 device
                </p>

                {/* Connection Status */}
                <div className="mil-up" style={{ marginBottom: '30px' }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={testConnection}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: connectionStatus === "connected" ? '#4CAF50' : '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      {connectionStatus === "testing" ? "Testing..." : 
                       connectionStatus === "connected" ? "✓ Connected" : 
                       "Test Connection"}
                    </button>
                    
                    <button
                      onClick={fetchAttendance}
                      disabled={loading}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        opacity: loading ? 0.6 : 1
                      }}
                    >
                      {loading ? "Refreshing..." : "Refresh Data"}
                    </button>

                    {lastRefresh && (
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        Last updated: {lastRefresh.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mil-up" style={{
                    padding: '15px',
                    backgroundColor: '#ffebee',
                    border: '1px solid #f44336',
                    borderRadius: '5px',
                    color: '#c62828',
                    marginBottom: '20px'
                  }}>
                    <strong>Error:</strong> {error}
                    <div style={{ marginTop: '10px', fontSize: '14px' }}>
                      <p>Make sure:</p>
                      <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
                        <li>Backend server is running on port 5000</li>
                        <li>ZKTeco device IP is correctly configured</li>
                        <li>Device is reachable on the network</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {loading && logs.length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666'
                  }}>
                    Loading attendance data...
                  </div>
                )}

                {/* Attendance Table */}
                {!loading && logs.length > 0 && (
                  <div className="mil-up">
                    <h3 style={{ marginBottom: '20px', marginTop: '30px' }}>
                      Daily Attendance Summary ({logs.length} total entries)
                    </h3>
                    
                    <div style={{ 
                      overflowX: 'auto',
                      marginBottom: '40px'
                    }}>
                      <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <thead>
                          <tr style={{ 
                            backgroundColor: '#f5f5f5',
                            borderBottom: '2px solid #ddd'
                          }}>
                            <th style={{ 
                              padding: '15px', 
                              textAlign: 'left',
                              borderBottom: '2px solid #ddd'
                            }}>Employee ID</th>
                            <th style={{ 
                              padding: '15px', 
                              textAlign: 'left',
                              borderBottom: '2px solid #ddd'
                            }}>Date</th>
                            <th style={{ 
                              padding: '15px', 
                              textAlign: 'left',
                              borderBottom: '2px solid #ddd'
                            }}>Check In</th>
                            <th style={{ 
                              padding: '15px', 
                              textAlign: 'left',
                              borderBottom: '2px solid #ddd'
                            }}>Check Out</th>
                            <th style={{ 
                              padding: '15px', 
                              textAlign: 'left',
                              borderBottom: '2px solid #ddd'
                            }}>Working Hours</th>
                            <th style={{ 
                              padding: '15px', 
                              textAlign: 'left',
                              borderBottom: '2px solid #ddd'
                            }}>All Entries</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedAttendance.map((record, index) => (
                            <tr 
                              key={index}
                              style={{
                                borderBottom: '1px solid #eee',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              <td style={{ padding: '15px' }}>{record.uid}</td>
                              <td style={{ padding: '15px' }}>{record.date}</td>
                              <td style={{ padding: '15px', color: '#4CAF50', fontWeight: 'bold' }}>
                                {record.checkIn}
                              </td>
                              <td style={{ padding: '15px', color: '#f44336', fontWeight: 'bold' }}>
                                {record.checkOut || '-'}
                              </td>
                              <td style={{ padding: '15px' }}>
                                {record.workingHours || '-'}
                              </td>
                              <td style={{ padding: '15px', fontSize: '12px', color: '#666' }}>
                                {record.entries.length} {record.entries.length === 1 ? 'entry' : 'entries'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Raw Logs Table */}
                    <details style={{ marginTop: '40px' }}>
                      <summary style={{ 
                        cursor: 'pointer', 
                        padding: '15px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        marginBottom: '15px'
                      }}>
                        View All Raw Logs ({logs.length} entries)
                      </summary>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          backgroundColor: 'white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                          <thead>
                            <tr style={{ backgroundColor: '#f5f5f5' }}>
                              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                                User ID
                              </th>
                              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                                Date & Time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {logs.map((log, i) => (
                              <tr 
                                key={i}
                                style={{ borderBottom: '1px solid #eee' }}
                              >
                                <td style={{ padding: '12px' }}>{log.uid}</td>
                                <td style={{ padding: '12px' }}>
                                  {new Date(log.timestamp).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                )}

                {/* No Data State */}
                {!loading && logs.length === 0 && !error && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666'
                  }}>
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ color: '#333', marginBottom: '10px' }}>No Attendance Data Found</h3>
                      {attendanceInfo?.message && (
                        <p style={{ color: '#666', marginBottom: '15px' }}>{attendanceInfo.message}</p>
                      )}
                      {attendanceInfo?.attendanceSize !== undefined && (
                        <p style={{ color: '#888', fontSize: '14px', marginBottom: '10px' }}>
                          Device reports: <strong>{attendanceInfo.attendanceSize}</strong> attendance record(s)
                        </p>
                      )}
                    </div>
                    <div style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '20px', 
                      borderRadius: '5px',
                      textAlign: 'left',
                      maxWidth: '600px',
                      margin: '0 auto'
                    }}>
                      <h4 style={{ marginBottom: '10px', color: '#333' }}>To get attendance data:</h4>
                      <ol style={{ marginLeft: '20px', color: '#666' }}>
                        <li>Make sure the ZKTeco device is powered on and connected to the network</li>
                        <li>Record attendance on the device by:
                          <ul style={{ marginTop: '5px', marginLeft: '20px' }}>
                            <li>Scanning a fingerprint</li>
                            <li>Using an RFID card (if configured)</li>
                            <li>Entering a PIN (if configured)</li>
                          </ul>
                        </li>
                        <li>Click "Refresh Data" button after recording attendance</li>
                        <li>Verify the device IP address is correct: <strong>{attendanceInfo?.connected !== false ? 'Connected' : 'Not Connected'}</strong></li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

