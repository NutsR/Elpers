const Review = require('../models/review');
const Elper = require('../models/elper');
const isAuthor = async (req, res, next) => {
	const {id} = req.params;
	const elper = await Elper.findById(id);
	if(!elper.user.equals(req.user._id)){
	  req.flash('error', 'No permission to edit/Modify ElpCamp')
	 return res.redirect(`/elpers/${id}`);
	}
	next();
}

const isReviewAuthor = async (req, res, next) => {
	const {reviewId} = req.params;
	const review = await Review.findById(reviewId)
	if(!review.user.equals(req.user._id)){
        req.flash('error', 'Error No Permission')
	return res.redirect('/elpers')
	}
	next();
}


module.exports ={ isAuthor, isReviewAuthor };
