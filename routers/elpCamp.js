const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn } = require('../middleware/authLogin');
const Elper = require('../models/elper.js');
const { isAuthor }= require('../middleware/authOwner');
const elpCtrl = require('../controller/elper.js');
const {validateElpers} = require('../middleware/validate');

// Routes for /Elpers

router.route('/')
.get(wrapAsync(elpCtrl.elpHome))
.post( isLoggedIn, validateElpers ,wrapAsync(elpCtrl.createElpCamp))

router.get('/create', isLoggedIn, elpCtrl.renderCreate);

router.route('/:id')
.get(wrapAsync(elpCtrl.renderDetails))
.put(isLoggedIn, isAuthor, validateElpers ,wrapAsync(elpCtrl.editElpCamp))
.delete(isLoggedIn, isAuthor, wrapAsync(elpCtrl.deleteElpCamp))

router.get('/:id/modify', isAuthor,wrapAsync(elpCtrl.renderEdit));
module.exports = router;

