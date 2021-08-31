const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review')
const elperSchema = new Schema({
    title: String, 
    price: Number,
    images:[{
    	url: String,
    	filename: String			
    },
  ],
    description: String,
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
