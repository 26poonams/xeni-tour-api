const express = require('express');
const bookingController = require('../controller/bookingController');
const router = express.Router();
const isLoggedIn = require('../middleware/authmiddleware');

router.post('/payment',isLoggedIn,bookingController.create)

module.exports = router;
