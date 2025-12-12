/**
 * Attendance Service - Online/Offline Support
 * Handles attendance marking with automatic sync when online
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const STORAGE_KEY = 'attendance_pending';
const ATTENDANCE_CACHE_KEY = 'attendance_cache';

/**
 * Check if user is currently checked in today
 */
export const getTodayAttendanceStatus = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    // Try to fetch from API (online)
    if (navigator.onLine) {
      const response = await fetch(`${API_BASE_URL}/attendance?uid=${userId}&date=${today}`);
      if (response.ok) {
        const data = await response.json();
        
        // Cache the result
        const cache = JSON.parse(localStorage.getItem(ATTENDANCE_CACHE_KEY) || '{}');
        cache[`${userId}_${today}`] = {
          data,
          timestamp: Date.now()
        };
        localStorage.setItem(ATTENDANCE_CACHE_KEY, JSON.stringify(cache));
        
        return getAttendanceStatusFromData(data, today);
      }
    }
  } catch (error) {
    console.log('Online fetch failed, using cache:', error);
  }
  
  // Fallback to cache/offline data
  const cache = JSON.parse(localStorage.getItem(ATTENDANCE_CACHE_KEY) || '{}');
  const cached = cache[`${userId}_${today}`];
  
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 min cache
    return getAttendanceStatusFromData(cached.data, today);
  }
  
  // Check pending attendance (offline records)
  const pending = getPendingAttendance();
  const todayPending = pending.filter(p => 
    p.uid === userId && 
    new Date(p.timestamp).toISOString().split('T')[0] === today
  );
  
  if (todayPending.length > 0) {
    return getAttendanceStatusFromData(todayPending, today);
  }
  
  return { checkedIn: false, checkedOut: false, lastAction: null };
};

/**
 * Extract attendance status from data array
 */
const getAttendanceStatusFromData = (data, date) => {
  if (!Array.isArray(data) || data.length === 0) {
    return { checkedIn: false, checkedOut: false, lastAction: null };
  }
  
  // Sort by timestamp
  const sorted = [...data].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  );
  
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  
  return {
    checkedIn: true,
    checkedOut: sorted.length > 1,
    checkInTime: first.timestamp,
    checkOutTime: last.timestamp,
    lastAction: last.timestamp,
    entries: sorted.length
  };
};

/**
 * Mark attendance (check in or check out)
 */
export const markAttendance = async (userId, type = 'auto') => {
  const timestamp = new Date().toISOString();
  const attendanceRecord = {
    uid: userId,
    timestamp: timestamp,
    verifyType: 0, // 0 = manual/web
    deviceIP: 'web'
  };
  
  // Always save to localStorage first (offline support)
  savePendingAttendance(attendanceRecord);
  
  // Try to sync online
  if (navigator.onLine) {
    try {
      const synced = await syncPendingAttendance();
      if (synced) {
        return { success: true, synced: true, record: attendanceRecord };
      }
    } catch (error) {
      console.log('Sync failed, saved offline:', error);
    }
  }
  
  return { success: true, synced: false, record: attendanceRecord };
};

/**
 * Save attendance to pending queue (offline)
 */
const savePendingAttendance = (record) => {
  const pending = getPendingAttendance();
  pending.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
  
  // Trigger storage event for other tabs
  window.dispatchEvent(new Event('storage'));
};

/**
 * Get pending attendance records
 */
export const getPendingAttendance = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

/**
 * Sync pending attendance to server
 */
export const syncPendingAttendance = async () => {
  if (!navigator.onLine) {
    return false;
  }
  
  const pending = getPendingAttendance();
  if (pending.length === 0) {
    return true;
  }
  
  try {
    // Send all pending records at once
    const response = await fetch(`${API_BASE_URL}/attendance/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pending)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Sync result:', result);
      
      // Clear all pending records if sync was successful
      if (result.success) {
        if (result.synced > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
          console.log(`Successfully synced ${result.synced} record(s)`);
        }
        return true;
      }
      
      return false;
    } else {
      const errorText = await response.text();
      console.error('Sync failed:', response.status, response.statusText, errorText);
      return false;
    }
  } catch (error) {
    console.error('Sync error:', error);
    return false;
  }
};

/**
 * Get attendance status for all users
 */
export const getAllUsersAttendanceStatus = async (userIds) => {
  const today = new Date().toISOString().split('T')[0];
  const statusMap = {};
  
  // Fetch all in parallel
  const promises = userIds.map(async (userId) => {
    const status = await getTodayAttendanceStatus(userId);
    statusMap[userId] = status;
  });
  
  await Promise.all(promises);
  
  return statusMap;
};

/**
 * Clear old cache (older than 1 day)
 */
export const clearOldCache = () => {
  try {
    const cache = JSON.parse(localStorage.getItem(ATTENDANCE_CACHE_KEY) || '{}');
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    Object.keys(cache).forEach(key => {
      if (cache[key].timestamp < oneDayAgo) {
        delete cache[key];
      }
    });
    
    localStorage.setItem(ATTENDANCE_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Initialize attendance service
 */
export const initAttendanceService = () => {
  // Clear old cache on init
  clearOldCache();
  
  // Sync when coming online
  window.addEventListener('online', () => {
    console.log('Connection restored, syncing attendance...');
    syncPendingAttendance();
  });
  
  // Periodic sync (every 5 minutes if online)
  setInterval(() => {
    if (navigator.onLine) {
      syncPendingAttendance();
    }
  }, 5 * 60 * 1000);
  
  // Initial sync
  if (navigator.onLine) {
    syncPendingAttendance();
  }
};

