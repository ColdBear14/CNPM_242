const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginAdmin } = require('../controllers/authController')

router.post('/register' , registerUser);
router.post('/loginuser', loginUser);
router.post('/loginadmin', loginAdmin);

module.exports = router;