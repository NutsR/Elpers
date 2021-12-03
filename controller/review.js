import Review from "../models/review";
import dbConnect from "@/lib/connection";
import Elper from "../models/elpCamp";

export const createReview = async (req, res) => {
	await dbConnect();
	const { id, ...body } = req.body;
	const elper = await Elper.findById(id);
	const review = new Review(body);
	review.user = req.user._id;
	elper.review.push(review);
	await elper.save();
	await review.save();
	res.status(200).json({ success: true });
};
