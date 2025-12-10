import React, { useState, useEffect } from 'react';
import { markAttendance, getTodayAttendanceStatus, syncPendingAttendance } from '../utils/attendanceService';

export default function AttendanceButton({ userId, userName, onStatusUpdate }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    loadStatus();
    
    // Refresh status every 30 seconds
    const interval = setInterval(loadStatus, 30000);
    
    // Check for pending syncs
    checkPendingSyncs();
    const syncInterval = setInterval(checkPendingSyncs, 10000);
    
    return () => {
      clearInterval(interval);
      clearInterval(syncInterval);
    };
  }, [userId]);

  const loadStatus = async () => {
    try {
      const attendanceStatus = await getTodayAttendanceStatus(userId);
      setStatus(attendanceStatus);
      if (onStatusUpdate) {
        onStatusUpdate(userId, attendanceStatus);
      }
    } catch (error) {
      console.error('Error loading attendance status:', error);
    }
  };

  const checkPendingSyncs = () => {
    try {
      const pending = JSON.parse(localStorage.getItem('attendance_pending') || '[]');
      setPendingCount(pending.length);
    } catch (error) {
      setPendingCount(0);
    }
  };

  const handleMarkAttendance = async () => {
    setLoading(true);
    try {
      console.log('Marking attendance for user:', userId);
      const result = await markAttendance(userId);
      console.log('Mark attendance result:', result);
      
      if (result.success) {
        // Reload status immediately
        await loadStatus();
        checkPendingSyncs();
        
        // Try to sync if online
        if (navigator.onLine && !result.synced) {
          setSyncing(true);
          const syncResult = await syncPendingAttendance();
          console.log('Sync result:', syncResult);
          setSyncing(false);
          await loadStatus();
          checkPendingSyncs();
        }
        
        // Show success message
        if (result.synced) {
          console.log('Attendance marked and synced successfully!');
        } else {
          console.log('Attendance saved offline, will sync when online');
        }
      } else {
        alert('Failed to mark attendance. Please try again.');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncPendingAttendance();
      await loadStatus();
      checkPendingSyncs();
    } catch (error) {
      console.error('Error syncing:', error);
      alert('Failed to sync. Please check your connection.');
    } finally {
      setSyncing(false);
    }
  };

  const getButtonText = () => {
    if (!status) return 'Loading...';
    if (status.checkedIn && !status.checkedOut) return 'Check Out';
    if (status.checkedIn && status.checkedOut) return 'Already Checked Out';
    return 'Check In';
  };

  const getStatusText = () => {
    if (!status) return '';
    if (status.checkedIn && !status.checkedOut) {
      return `Checked in at ${new Date(status.checkInTime).toLocaleTimeString()}`;
    }
    if (status.checkedIn && status.checkedOut) {
      return `Checked out at ${new Date(status.checkOutTime).toLocaleTimeString()}`;
    }
    return 'Not checked in today';
  };

  const isDisabled = () => {
    return loading || syncing || (status && status.checkedIn && status.checkedOut);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'flex-end'
    }}>
      {/* Pending sync indicator */}
      {pendingCount > 0 && (
        <div style={{
          padding: '8px 12px',
          backgroundColor: '#ff9800',
          color: 'white',
          borderRadius: '5px',
          fontSize: '12px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onClick={handleSync}
        title="Click to sync pending attendance">
          {pendingCount} pending {pendingCount === 1 ? 'record' : 'records'}
          {!navigator.onLine && ' (Offline)'}
        </div>
      )}

      {/* Attendance button */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '15px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        minWidth: '200px'
      }}>
        <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
          {userName || `User ${userId}`}
        </div>
        <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
          {getStatusText()}
        </div>
        <button
          onClick={handleMarkAttendance}
          disabled={isDisabled()}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: status?.checkedIn && !status?.checkedOut 
              ? '#f44336' 
              : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isDisabled() ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            opacity: isDisabled() ? 0.6 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          {loading ? 'Processing...' : getButtonText()}
        </button>
        
        {syncing && (
          <div style={{ 
            marginTop: '8px', 
            fontSize: '11px', 
            color: '#666',
            textAlign: 'center'
          }}>
            Syncing...
          </div>
        )}
        
        {!navigator.onLine && (
          <div style={{ 
            marginTop: '8px', 
            fontSize: '11px', 
            color: '#ff9800',
            textAlign: 'center'
          }}>
            ⚠️ Offline mode
          </div>
        )}
      </div>
    </div>
  );
}

