import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const handleError = (error, endpoint) => {
  console.error(`Error (${endpoint}):`, error.message, error.response?.data);
  throw error;
};

const validateResponse = (data, endpoint) => {
  if (!data || typeof data !== 'object') {
    console.error(`Invalid data from ${endpoint}:`, data);
    return [];
  }
  return Array.isArray(data) ? data : [];
};

export const addSite = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/sites/add`, data);
    return response.data;
  } catch (error) {
    handleError(error, 'addSite');
  }
};

export const getSites = async () => {
  try {
    const response = await axios.get(`${API_URL}/sites/list`);
    console.log('Raw getSites Response:', response.data);
    const sites = validateResponse(response.data?.data, 'getSites');
    return { ...response, data: sites };
  } catch (error) {
    handleError(error, 'getSites');
    return { data: [] };
  }
};

export const addLabour = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/labours`, data);
    return response.data;
  } catch (error) {
    handleError(error, 'addLabour');
  }
};

export const getLaboursBySite = async (siteId) => {
  try {
    const response = await axios.get(`${API_URL}/labours/site/${siteId}`);
    const labours = validateResponse(response.data?.data, 'getLaboursBySite');
    return { ...response, data: labours };
  } catch (error) {
    handleError(error, 'getLaboursBySite');
    return { data: [] };
  }
};

export const searchLabours = async (siteId, query) => {
  try {
    const response = await axios.get(`${API_URL}/labours/search`, {
      params: { siteId, query },
    });
    const labours = validateResponse(response.data?.data, 'searchLabours');
    return { ...response, data: labours };
  } catch (error) {
    handleError(error, 'searchLabours');
    return { data: [] };
  }
};

export const saveAttendance = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/attendance/attendance`, data);
    return response.data;
  } catch (error) {
    handleError(error, 'saveAttendance');
  }
};

export const getAttendanceList = async (siteId, date) => {
  try {
    const response = await axios.get(`${API_URL}/attendance/attendanceList`, {
      params: { siteId, date },
    });
    const attendance = validateResponse(
      response.data?.data,
      'getAttendanceList'
    );
    return { ...response, data: attendance };
  } catch (error) {
    handleError(error, 'getAttendanceList');
    return { data: [] };
  }
};

export const getAttendanceBySite = async (siteId, period) => {
  try {
    const params = { siteId };
    if (period === 'daily') {
      params.date = new Date().toISOString().split('T')[0]; // "2025-05-26"
    } else if (period === 'weekly') {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      params.startDate = startDate.toISOString().split('T')[0];
      params.endDate = new Date().toISOString().split('T')[0];
    } else if (period === 'monthly') {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      params.startDate = startDate.toISOString().split('T')[0];
      params.endDate = new Date().toISOString().split('T')[0];
    }
    const response = await axios.get(`${API_URL}/attendance/attendanceList`, {
      params,
    });
    console.log('Raw getAttendanceBySite Response:', response.data);
    const attendance = validateResponse(
      response.data?.data,
      'getAttendanceBySite'
    );
    return { ...response, data: attendance };
  } catch (error) {
    handleError(error, 'getAttendanceBySite');
    return { data: [] };
  }
};

export const checkAttendanceExists = async (siteId, date) => {
  try {
    const response = await axios.get(`${API_URL}/attendance/attendanceList`, {
      params: { siteId, date },
    });
    return response.data?.data?.length > 0;
  } catch (error) {
    handleError(error, 'checkAttendanceExists');
    return false;
  }
};
