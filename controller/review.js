const Elper = require('../models/elper');
const Review = require('../models/review');
const createReview = async(req, res) => {
    const { Id } = req.params;
    const elper = await Elper.findById(Id)
    const review = new Review(req.body);
    review.user = req.user._id;
    elper.review.push(review)
    await elper.save()
    await review.save()
    req.flash('success', 'Added Review')
    res.redirect(`/elpers/${elper._id}`)
}

const deleteReview = async(req, res) => {
    const {elperId, reviewId} = req.params;
    const elper = await Elper.findById(elperId)
    await Elper.findByIdAndUpdate(elperId, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'deleted review')
    res.redirect(`/elpers/${elper._id}`);
}

module.exports = { createReview, deleteReview }