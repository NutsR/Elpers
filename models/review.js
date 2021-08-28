const mongoose = require('mongoose')
const { Schema } = mongoose;
const reviewSchema = new Schema({
    rating: Number,
    review: String,
    user:{
	type: Schema.Types.ObjectId,
	ref : 'User'
	}
})
module.exports = mongoose.model('Review', reviewSchema);
