import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary";
const { Schema } = mongoose;
const imageSchema = new Schema({
	url: String,
	filename: String,
	publicId: String,
});
imageSchema.virtual("thumbnail").get(function () {
	return this.url.replace(
		"/upload",
		"/upload/ar_4:3,c_fill/c_scale,w_auto/dpr_auto/q_70"
	);
});
const opts = { toJSON: { virtuals: true } };
const elperSchema = new Schema(
	{
		title: String,
		price: Number,
		images: [imageSchema],
		description: String,
		geometry: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},

		location: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		review: [
			{
				type: Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	opts
);

elperSchema.virtual("properties.popupText").get(function () {
	return `<h5>${this.title}</h5><p>${this.location} <a style="color: black;"  href="/elpers/${this._id}">View more...</a></p>`;
});

elperSchema.post("findOneAndDelete", async function (elpCamp) {
	if (elpCamp.images.length) {
		for (let image of elpCamp.images) {
			await cloudinary.uploader.destroy(image.publicId);
		}
	}
	if (elpCamp.review.length) {
		await Review.deleteMany({
			_id: {
				$in: elpCamp.review,
			},
		});
	}
});

export default mongoose.models.Elper || mongoose.model("Elper", elperSchema);
