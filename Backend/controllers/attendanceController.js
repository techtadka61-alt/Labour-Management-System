const asyncHandler = require('express-async-handler');
const attendanceService = require('../services/attendanceService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const saveAttendance = asyncHandler(async (req, res) => {
  const { siteId, date, attendance } = req.body;
  if (!siteId || !date || !Array.isArray(attendance)) {
    return sendError(res, 400, 'Invalid attendance data');
  }
  const result = await attendanceService.saveAttendance({
    siteId,
    date,
    attendance,
  });
  sendSuccess(res, 201, 'Attendance saved successfully', result);
});

const getAttendanceList = asyncHandler(async (req, res) => {
  const { siteId, period, date } = req.query;
  if (!siteId) {
    return sendError(res, 400, 'Site ID is required');
  }
  const attendance = await attendanceService.getAttendanceList(
    siteId,
    period,
    date
  );
  sendSuccess(res, 200, 'Attendance retrieved successfully', attendance);
});

module.exports = { saveAttendance, getAttendanceList };
