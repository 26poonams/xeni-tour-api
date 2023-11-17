const express = require('express');
const tourController = require('../controller/tourController');
const router = express.Router();
const isLoggedIn = require('../middleware/authmiddleware');


router.post('/',isLoggedIn,tourController.create);
router.get('/',isLoggedIn,tourController.findAll);
router.get('/:slug',isLoggedIn,tourController.findOne);
router.patch('/:slug',isLoggedIn,tourController.update);
router.delete('/:slug',isLoggedIn,tourController.destroy);

module.exports = router