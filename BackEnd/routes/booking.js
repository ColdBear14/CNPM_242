const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book', bookingController.bookSpace);
router.get('/bookings', bookingController.getBookings);
router.get('/spaces', bookingController.getSpaces); 
router.post('/cancel', bookingController.cancelBooking);

module.exports = router;