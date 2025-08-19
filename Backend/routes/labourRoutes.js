const express = require('express');
const router = express.Router();
const labourController = require('../controllers/labourController');

router.post('/', labourController.addLabour); // POST /api/labours
router.get('/site/:siteId', labourController.getLaboursBySite); // GET /api/labours/site/:siteId
router.get('/search', labourController.searchLabours); // GET /api/labours/search?siteId=...&query=...
router.delete('/:labourId', labourController.deleteLabour); // DELETE /api/labours/:labourId

module.exports = router;
