const express = require('express');
const router = express.Router();
const { addSite, getSites } = require('../controllers/siteController');

router.post('/add', addSite); // POST /api/sites/add
router.get('/list', getSites); // GET /api/sites/list

module.exports = router;
