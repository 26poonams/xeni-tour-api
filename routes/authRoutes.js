const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();
const isLoggedIn = require('../middleware/authmiddleware');

router.post('/signUp',authController.signup);
router.post('/login',authController.login);
router.post('/forgetPassword',authController.forgetPassword);
router.post('/resetPassword/:token',authController.resetPassword);
router.patch('/:id',isLoggedIn,authController.update);


module.exports = router;