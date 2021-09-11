const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage })

const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn } = require('../middleware/authLogin');
const Elper = require('../models/elper.js');
const { isAuthor }= require('../middleware/authOwner');
const elpCtrl = require('../controller/elper.js');
const {validateElpers} = require('../middleware/validate');

// Routes for /Elpers

router.route('/')
.get(wrapAsync(elpCtrl.elpHome))
.post( isLoggedIn, upload.array('images'),validateElpers, wrapAsync(elpCtrl.createElpCamp))

router.route('/search')
.get(wrapAsync( elpCtrl.searchCamp))
.post(wrapAsync(elpCtrl.postSearch))

router.get('/create', isLoggedIn, elpCtrl.renderCreate);

router.route('/:id')
.get(wrapAsync(elpCtrl.renderDetails))
.put(isLoggedIn, isAuthor, validateElpers,wrapAsync(elpCtrl.editElpCamp))
.delete(isLoggedIn, isAuthor, wrapAsync(elpCtrl.deleteElpCamp))

router.put('/:id/upload', isLoggedIn, isAuthor, upload.array('images'), wrapAsync(elpCtrl.editElpCamp))

router.get('/:id/modify',isLoggedIn,  isAuthor,wrapAsync(elpCtrl.renderEdit));

router.get('/:id/images', isLoggedIn, isAuthor, wrapAsync(elpCtrl.renderImageUpload))
module.exports = router;

