const express = require('express');
const reviewController = require('../controller/reviewController');
const router = express.Router();
const isLoggedIn = require('../middleware/authmiddleware');


router.post('/',isLoggedIn,reviewController.create);
router.patch('/:id',isLoggedIn,reviewController.update);
router.delete('/:id',isLoggedIn,reviewController.destroy);

module.exports = router