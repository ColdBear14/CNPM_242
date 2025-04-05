const express = require('express')
const router = express.Router()


const {
    getSpace,
    updateSpace,
    getSpaceDetail
} = require('../controllers/space_detail')



router.route('/').get(getSpace)
router.route('/:id').get(getSpaceDetail).put(updateSpace)

module.exports = router