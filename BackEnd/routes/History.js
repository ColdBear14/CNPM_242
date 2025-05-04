const express = require('express');
const router = express.Router();
const SpaceHistoryController = require('../controllers/spaceHistory');



router.get('/getHisory', SpaceHistoryController.getSpaceHistory);
router.get('/getDetail', SpaceHistoryController.getSpaceDetail);
router.put('/updateState', SpaceHistoryController.updateState); // Thêm route mới

module.exports = router;