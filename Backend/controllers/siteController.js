const asyncHandler = require('express-async-handler');
const siteService = require('../services/siteService');

const addSite = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Site name is required' });
  }
  const site = await siteService.addSite({ name });
  res
    .status(201)
    .json({ success: true, message: 'Site added successfully', data: site });
});

const getSites = asyncHandler(async (req, res) => {
  const sites = await siteService.getSites();
  res.json({
    success: true,
    message: 'Sites retrieved successfully',
    data: sites,
  });
});

module.exports = { addSite, getSites };
