import React, { useEffect, useState } from "react";
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import Footer from '../components/Footer';

export default function Attendance() {
  useScrollAnimations();
  
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Backend server URL - Update this to match your server
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // Fetch attendance data
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/attendance`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      setLogs(Array.isArray(data) ? data : []);
      setLastRefresh(new Date());
    } catch (err) {
      setError("Unable to connect to server. Make sure the backend server is running on port 5001.");
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchAttendance();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Simple name map (IT / employees). Add more as needed.
  const USER_NAMES = {
    1: "Asan Egodagamage (IT)",
    2: "Employee 2",
    3: "Employee 3",
    4: "Employee 4",
    5: "Employee 5",
    6: "Employee 6",
    7: "Employee 7",
    8: "Asan Egodagamage (Head of IT)",
  };

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
          name: USER_NAMES[uid] || `Employee ${uid}`,
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
      
      // First timestamp of the day = Check-In
      // Last timestamp of the day = Check-Out
      if (grouped[key].entries.length > 0) {
        grouped[key].checkIn = grouped[key].entries[0].time;
        grouped[key].checkOut = grouped[key].entries.length > 1 
          ? grouped[key].entries[grouped[key].entries.length - 1].time 
          : null;
        
        // Calculate daily working hours
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
                  Attendance Logs
                </h1>

                {/* Refresh Button */}
                <div className="mil-up" style={{ marginBottom: '30px' }}>
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
                    {loading ? "Loading..." : "Refresh Data"}
                  </button>
                  
                  {lastRefresh && (
                    <span style={{ color: '#666', fontSize: '14px', marginLeft: '15px' }}>
                      Last updated: {lastRefresh.toLocaleTimeString()}
                    </span>
                  )}
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

                {/* Daily Attendance Summary with IN/OUT Detection */}
                {!loading && groupedAttendance.length > 0 && (
                  <div className="mil-up">
                    <h3 style={{ marginBottom: '20px', marginTop: '30px' }}>
                      Daily Attendance Summary
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
                            }}>Employee (IT)</th>
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
                              <td style={{ padding: '15px' }}>{record.name}</td>
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Raw Logs Table */}
                {!loading && logs.length > 0 && (
                  <div className="mil-up">
                    <h3 style={{ marginBottom: '20px' }}>
                      All Attendance Logs ({logs.length} entries)
                    </h3>
                    
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
                              Timestamp
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
                  </div>
                )}

                {/* No Data State */}
                {!loading && logs.length === 0 && !error && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666'
                  }}>
                    <h3 style={{ color: '#333', marginBottom: '10px' }}>No Attendance Data Found</h3>
                    <p style={{ color: '#666', marginBottom: '15px' }}>
                      Record attendance on the device first, then refresh.
                    </p>
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
