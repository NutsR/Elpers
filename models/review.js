import mongoose from 'mongoose'
const { Schema } = mongoose;
const reviewSchema = new Schema({
    rating: Number,
    review: String,
    user:{
	type: Schema.Types.ObjectId,
	ref : 'User'
	}
})
export default mongoose.models.Review || mongoose.model('Review', reviewSchema);