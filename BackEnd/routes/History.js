const express = require('express');
const router = express.Router();
const SpaceHistoryController = require('../controllers/spaceHistory');


router.get('/getHisory', SpaceHistoryController.getSpaceHistory);


module.exports = router;