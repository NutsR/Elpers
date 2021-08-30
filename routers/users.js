const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const OnError = require('../utils/OnError');
const passport = require('passport');
const { isLoggedIn } = require('../middleware/authLogin');
const userCtrl = require('../controller/user');

router.route('/register')
.get( userCtrl.renderRegister))
.post(wrapAsync(userCtrl.registerUser));

router.post('/login', passport.authenticate('local', {failureFlash: true}),wrapAsync(userCtrl.loginUser));

router.post('/logout', userCtrl.logoutUser);

module.exports = router;
