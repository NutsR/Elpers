const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const Review = require('./review')
const imageSchema = new Schema({
			url: String,
    	filename: String
});
imageSchema.virtual('thumbnail').get(function(){
				return this.url.replace('/upload', '/upload/w_200')
})

const opts =  { toJSON : {virtuals: true} }

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
}, opts);

elperSchema.virtual('properties.popupText').get(function(){
return `<h5>${this.title}</h5><p>${this.location} <a style="color: black;"  href="/elpers/${this._id}">View more...</a></p>`
})


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

elperSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Elper', elperSchema);
