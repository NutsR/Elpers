const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review')
const imageSchema = new Schema({
			url: String,
    	filename: String
});
imageSchema.virtual('thumbnail').get(function(){
				return this.url.replace('/upload', '/upload/w_200')
})

const elperSchema = new Schema({
    title: String,
    price: Number,
    images:[imageSchema],
    description: String,
    geometry: {
       	type: {
         type: String,
         enum:['Point'],
         required: true
     },
       coordinates: {
	  type: [Number],
	   required: true
	}
	   },

    location: String,
    user:{
	type: Schema.Types.ObjectId,
	ref: 'User'
         },
    review:[{
        type: Schema.Types.ObjectId, 
        ref: 'Review'
    }]
});

elperSchema.post('findOneAndDelete', async function(elpCamp) {
    if(elpCamp.review.length) {
         await Review.deleteMany({
            _id: 
            { 
                $in: elpCamp.review
            } 
        });
    }
});

module.exports = mongoose.model('Elper', elperSchema);
