const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {validateReviews} = require('../middleware/validate');
const Elper = require('../models/elper.js');
const Review = require('../models/review.js');
const {isLoggedIn} = require('../middleware/authLogin');
const { isReviewAuthor } = require('../middleware/authOwner');
const reviewCtrl = require('../controller/review');

// Review Routes

router.post('/:Id/reviews', isLoggedIn, validateReviews ,wrapAsync(reviewCtrl.createReview));

router.delete('/:elperId/reviews/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewCtrl.deleteReview));

module.exports = router;
