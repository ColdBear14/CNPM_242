const express = require('express')
const router = express.Router()


const {
    getSpace,
    updateSpace,
    getSpaceDetail,
    returnRoom
} = require('../controllers/space_detail')



router.route('/').get(getSpace)
router.route('/:id').get(getSpaceDetail).put(updateSpace)
router.route('/type/:type').get(returnRoom)

module.exports = router