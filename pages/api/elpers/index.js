import multiparty from "multiparty";
import fs from "fs";
import streamifier from "streamifier";

import cloudinary from "../../../lib/cloudinary";
import dbConnect from "../../../lib/connection";
import geocodeLocation from "../../../lib/mapbox";
import Elper from "../../../models/elpCamp";

export const config = {
	api: {
		bodyParser: false,
	},
};

export const getElpers = async () => {
	// find all the data in our database
	await dbConnect();
	const result = await Elper.find({});
	const elpCamps = JSON.parse(JSON.stringify(result));
	return elpCamps;
};

export default async function handler(req, res) {
	switch (req.method) {
		case "GET":
			// Get Request for Testing and postman maybe?
			const elpers = await getElpers();
			return res.status(200).json(elpers);

		case "POST":
			try {
				// check for db connection
				await dbConnect();

				// Form data parsing (parses data according data.files is for file uploads and data.fields is json Data)
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

				// parse
				let result = JSON.parse(data.fields.elpcamp);

				// Geocoding the Location
				try {
					const geolocation = await geocodeLocation(result.location);
					result.geometry = geolocation.body.features[0].geometry;
				} catch (error) {
					res.status(400).json({ error });
				}
				const elpCamp = new Elper(result);
				elpCamp.images = [];

				// Upload rawData to cloudinary and save Document
				data.rawdata.forEach((buffer) => {
					let upload = cloudinary.uploader.upload_stream(
						{ folder: "ElpCamp" },
						async function (error, result) {
							elpCamp.images.push({
								url: result.url,
								filename: result.original_filename,
								publicId: result.public_id,
							});
							try {
								await elpCamp.save();
							} catch (error) {
								res.status(500).json({ error: error });
							}
						}
					);
					streamifier.createReadStream(buffer).pipe(upload);
				});

				res.status(201).json({ success: true });
			} catch (err) {
				res.status(400).json(err);
			}
	}
}
