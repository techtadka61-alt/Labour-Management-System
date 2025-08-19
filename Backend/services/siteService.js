const Site = require('../models/Site');

const addSite = async ({ name }) => {
  // Check for existing site (case-insensitive)
  const existingSite = await Site.findOne({
    name: new RegExp(`^${name}$`, 'i'),
  });
  if (existingSite) {
    const error = new Error('A site with this name already exists');
    error.status = 400;
    throw error;
  }
  const site = new Site({ name });
  return await site.save();
};

const getSites = async () => {
  return await Site.find(); // Returns all sites, no date filter
};

module.exports = { addSite, getSites };
