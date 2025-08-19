const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/attendance', attendanceController.saveAttendance); // POST /api/attendance/attendance
router.get('/attendanceList', attendanceController.getAttendanceList); // GET /api/attendance/attendanceList?siteId=...&period=...&date=...

module.exports = router;
