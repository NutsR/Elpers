const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { reviewSchema } = require('../views/errors/validateSchema');
const Elper = require('../models/elper.js');
const Review = require('../models/review.js');
const {isLoggedIn} = require('../middleware/authLogin');
const { isReviewAuthor } = require('../middleware/authOwner');

const validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new OnError(`${msg}`, 404)
    } else {
        next();
    }
 }

// Review Routes

router.post('/:Id/reviews', isLoggedIn, validateReviews ,wrapAsync(async(req, res) => {
    const { Id } = req.params;
    const elper = await Elper.findById(Id)
    const review = new Review(req.body);
    review.user = req.user._id;
    elper.review.push(review)
    await elper.save()
    await review.save()
    req.flash('success', 'Added Review')
    res.redirect(`/elpers/${elper._id}`)
}));

router.put('/:elperId/reviews/:reviewId', isLoggedIn, isReviewAuthor, validateReviews, wrapAsync(async(req, res) => {
    const {elperId, reviewId} = req.params;
    const elper = await Elper.findById(elperId)
    const review = await Elper.findByIdAndUpdate(reviewId, req.body)
    res.redirect(`/elpers/${elper._id}`);
}));

router.delete('/:elperId/reviews/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(async(req, res) => {
    const {elperId, reviewId} = req.params;
    const elper = await Elper.findById(elperId)
    await Elper.findByIdAndUpdate(elperId, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'deleted review')
    res.redirect(`/elpers/${elper._id}`);
}));

module.exports = router;
