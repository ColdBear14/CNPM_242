const express = require('express');
const router = express.Router();
const SpaceManageController = require('../controllers/spaceManage');



router.get('/getHisory', SpaceManageController.getSpaceHistory);
router.get('/getHistoryDetail', SpaceManageController.getSpaceHistoryDetail);

router.get('/getAvailable', SpaceManageController.getSpaceAvailable);
router.get('/getDetail', SpaceManageController.getSpaceDetail);

router.put('/updateAvailable', SpaceManageController.updateAvailable); // Thêm route mới
router.put('/updateState', SpaceManageController.updateState); // Thêm route mới

module.exports = router;