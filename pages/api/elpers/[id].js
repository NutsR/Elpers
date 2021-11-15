import Elpers from "../../../models/elpCamp";
import dbConnect from "../../../lib/connection.js";
import geocodeLocation from "../../../lib/mapbox";

export const getElperById = async (id) => {
	await dbConnect();
	const result = await Elpers.findById(id)
		.populate({ path: "review", populate: { path: "user" } })
		.populate("user");
	const elpCamp = JSON.parse(JSON.stringify(result));
	return elpCamp;
};

export default async function handler(req, res) {
	const { id } = req.query;
	switch (req.method) {
		case "GET":
			const elpCamp = await getElperById(id);
			return res.status(200).json(elpCamp);

		case "PUT":
			const data = JSON.parse(req.body);
			try {
				await dbConnect();
				const geoLocation = await geocodeLocation(data.location);
				data.geometry = geoLocation.body.features[0].geometry;
				await Elpers.findByIdAndUpdate(id, data);
				return res.status(201).json({ success: true });
			} catch (error) {
				return res.status(400).json(error);
			}

		case "DELETE":
			try {
				await dbConnect();
				const elpCamp = await Elpers.findByIdAndDelete(id);
				return res.status(202).json({ success: true });
			} catch (error) {
				return res.status(401).json({ success: false });
			}
	}
}
