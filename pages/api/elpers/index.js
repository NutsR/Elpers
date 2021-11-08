import dbConnect from "../../../lib/connection";
import Elper from "../../../models/elpCamp";
import multiparty from "multiparty";
import fs from "fs";
import cloudinary from "../../../lib/cloudinary";
import streamifier from "streamifier";
import geocodeLocation from "../../../lib/mapbox";
export const config = {
	api: {
		bodyParser: false,
	},
};

export const getElpers = async () => {
	await dbConnect();
	/* find all the data in our database */
	const result = await Elper.find({});
	const elpCamps = JSON.parse(JSON.stringify(result));
	return elpCamps;
};

export default async function handler(req, res) {
	switch (req.method) {
		case "GET":
			const elpers = await getElpers();
			return res.status(200).json(elpers);
		case "POST":
			try {
				const data = await new Promise((resolve, reject) => {
					const form = new multiparty.Form();
					form.parse(req, (err, fields, files) => {
						if (err) return reject(err);

						const rawdata = files.photos.map((photo) =>
							fs.readFileSync(photo.path)
						);
						resolve({ fields, rawdata });
					});
				});

				let result = JSON.parse(data.fields.elpcamp);
				try {
					const geolocation = await geocodeLocation(result.location);
					result.geometry = geolocation.body.features[0].geometry;
				} catch (error) {
					res.status(400).json({ error });
				}
				const elpCamp = new Elper(result);
				elpCamp.images = [];
				data.rawdata.forEach((buffer) => {
					let upload = cloudinary.uploader.upload_stream(
						{ folder: "ElpCamp" },
						async function (error, result) {
							elpCamp.images.push({
								url: result.url,
								filename: result.original_filename,
							});
							await elpCamp.save();
						}
					);
					streamifier.createReadStream(buffer).pipe(upload);
				});
				res.status(201).json({ success: true });
			} catch (err) {
				res.status(400).json(err);
			}

		// try {
		// 	await elpCamp.save();
		// 	return res.status(201).json({ success: true });
		// } catch (error) {
		// 	return res.status(400).json(error);
		// }
	}
}
