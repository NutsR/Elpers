import Elpers from "../models/elpCamp";
import dbConnect from "@/lib/connection.js";
import geocodeLocation from "@/lib/mapbox";

export const getElpCamp = async (req, res) => {
	const { id } = req.query;
	await dbConnect();
	const result = await Elpers.findById(id)
		.populate({ path: "review", populate: { path: "user" } })
		.populate("user");
	const elpCamp = JSON.parse(JSON.stringify(result));
	return res.status(200).json(elpCamp);
};

export const updateElpCamp = async () => {
	const { id } = req.query;
	const data = JSON.parse(req.body);

	await dbConnect();
	const geoLocation = await geocodeLocation(data.location);
	data.geometry = geoLocation.body.features[0].geometry;
	await Elpers.findByIdAndUpdate(id, data);
	return res.status(201).json({ success: true });
};

export const deleteElpCamp = async () => {
	const { id } = req.query;
	await dbConnect();
	await Elpers.findByIdAndDelete(id);
	return res.status(202).json({ success: true });
};
