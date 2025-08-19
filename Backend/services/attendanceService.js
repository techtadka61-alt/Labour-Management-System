const Attendance = require('../models/Attendance');
const Labour = require('../models/Labour');
const Site = require('../models/Site');
const mongoose = require('mongoose');
const moment = require('moment');

const saveAttendance = async ({ siteId, date, attendance }) => {
  // Validate siteId
  if (!mongoose.isValidObjectId(siteId)) {
    const error = new Error('Invalid site ID');
    error.status = 400;
    throw error;
  }
  const site = await Site.findById(siteId);
  if (!site) {
    const error = new Error('Site not found');
    error.status = 404;
    throw error;
  }

  // Validate labourIds
  const labourIds = attendance.map((a) => a.labourId);
  // Log labourIds for debugging
  console.log('Labour IDs provided:', labourIds);

  // Check if all labourIds are valid ObjectIds
  const invalidIds = labourIds.filter((id) => !mongoose.isValidObjectId(id));
  if (invalidIds.length > 0) {
    const error = new Error(
      `Invalid labour ID format: ${invalidIds.join(', ')}`
    );
    error.status = 400;
    throw error;
  }

  // Find valid labourers associated with the site
  const validLabours = await Labour.find({ _id: { $in: labourIds }, siteId });
  const validLabourIds = new Set(validLabours.map((l) => l._id.toString()));
  const invalidLabourIds = labourIds.filter(
    (id) => !validLabourIds.has(id.toString())
  );

  if (invalidLabourIds.length > 0) {
    // Log invalid labour IDs for debugging
    console.log('Invalid or non-associated labour IDs:', invalidLabourIds);
    const error = new Error(
      `Labour IDs not found or not associated with the site: ${invalidLabourIds.join(
        ', '
      )}`
    );
    error.status = 400;
    throw error;
  }

  // Normalize date to start of day
  const normalizedDate = moment(date).startOf('day').toDate();

  // Check for existing attendance for the same site and date
  const existingAttendance = await Attendance.findOne({
    siteId,
    date: normalizedDate,
  });
  if (existingAttendance) {
    const error = new Error('Attendance for this site and date already exists');
    error.status = 400;
    throw error;
  }

  // Prepare attendance records
  const attendanceRecords = attendance.map(({ labourId, present }) => ({
    siteId,
    labourId,
    date: normalizedDate,
    present,
  }));

  // Insert attendance records
  return await Attendance.insertMany(attendanceRecords);
};

const getAttendanceList = async (siteId, period = 'daily', date) => {
  if (!mongoose.isValidObjectId(siteId)) {
    const error = new Error('Invalid site ID');
    error.status = 400;
    throw error;
  }
  const site = await Site.findById(siteId);
  if (!site) {
    const error = new Error('Site not found');
    error.status = 404;
    throw error;
  }

  let query = { siteId };

  if (date) {
    // Fetch attendance for a specific date
    const normalizedDate = moment(date).startOf('day').toDate();
    query.date = normalizedDate;
  } else {
    // Fetch attendance for a period (daily, weekly, monthly)
    const startDate = moment()
      .startOf(
        period === 'monthly' ? 'month' : period === 'weekly' ? 'week' : 'day'
      )
      .toDate();
    const endDate = moment()
      .endOf(
        period === 'monthly' ? 'month' : period === 'weekly' ? 'week' : 'day'
      )
      .toDate();
    query.date = { $gte: startDate, $lte: endDate };
  }

  return await Attendance.find(query)
    .populate('labourId', 'name fatherName')
    .populate('siteId', 'name');
};

module.exports = { saveAttendance, getAttendanceList };
