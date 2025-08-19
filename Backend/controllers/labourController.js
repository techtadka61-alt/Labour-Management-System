const asyncHandler = require('express-async-handler');
const labourService = require('../services/labourService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const addLabour = asyncHandler(async (req, res) => {
  const { siteId, name, fatherName } = req.body;
  if (!siteId || !name || !fatherName) {
    return sendError(res, 400, 'All fields are required');
  }
  const labour = await labourService.addLabour({ siteId, name, fatherName });
  sendSuccess(res, 201, 'Labour added successfully', labour);
});

const getLaboursBySite = asyncHandler(async (req, res) => {
  const { siteId } = req.params;
  const labours = await labourService.getLaboursBySite(siteId);
  sendSuccess(res, 200, 'Labours retrieved successfully', labours);
});

const searchLabours = asyncHandler(async (req, res) => {
  const { siteId, query } = req.query;
  if (!siteId || !query) {
    return sendError(res, 400, 'Site ID and search query are required');
  }
  const labours = await labourService.searchLabours(siteId, query);
  sendSuccess(res, 200, 'Labours retrieved successfully', labours);
});

const deleteLabour = asyncHandler(async (req, res) => {
  const { labourId } = req.params;
  const labour = await labourService.deleteLabour(labourId);
  sendSuccess(res, 200, 'Labour deleted successfully', labour);
});

module.exports = { addLabour, getLaboursBySite, searchLabours, deleteLabour };
