const Labour = require('../models/Labour');
const Site = require('../models/Site');
const mongoose = require('mongoose');

const addLabour = async ({ siteId, name, fatherName }) => {
  if (!mongoose.isValidObjectId(siteId)) {
    const error = new Error('Invalid site ID');
    error.status = 400;
    throw error;
  }
  // Check if site exists
  const site = await Site.findById(siteId);
  if (!site) {
    const error = new Error('Site not found');
    error.status = 404;
    throw error;
  }
  const labour = new Labour({ siteId, name, fatherName });
  return await labour.save();
};

const getLaboursBySite = async (siteId) => {
  if (!mongoose.isValidObjectId(siteId)) {
    const error = new Error('Invalid site ID');
    error.status = 400;
    throw error;
  }
  // Check if site exists
  const site = await Site.findById(siteId);
  if (!site) {
    const error = new Error('Site not found');
    error.status = 404;
    throw error;
  }
  return await Labour.find({ siteId }).populate('siteId', 'name');
};

const searchLabours = async (siteId, query) => {
  if (!mongoose.isValidObjectId(siteId)) {
    const error = new Error('Invalid site ID');
    error.status = 400;
    throw error;
  }
  // Check if site exists
  const site = await Site.findById(siteId);
  if (!site) {
    const error = new Error('Site not found');
    error.status = 404;
    throw error;
  }
  return await Labour.find({
    siteId,
    $or: [
      { name: new RegExp(query, 'i') },
      { fatherName: new RegExp(query, 'i') },
    ],
  }).populate('siteId', 'name');
};

const deleteLabour = async (labourId) => {
  if (!mongoose.isValidObjectId(labourId)) {
    const error = new Error('Invalid labour ID');
    error.status = 400;
    throw error;
  }
  const labour = await Labour.findByIdAndDelete(labourId);
  if (!labour) {
    const error = new Error('Labour not found');
    error.status = 404;
    throw error;
  }
  return labour;
};

module.exports = { addLabour, getLaboursBySite, searchLabours, deleteLabour };
