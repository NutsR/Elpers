import Elpers from "../models/elpCamp";
import dbConnect from "@/lib/connection.js";
import geocodeLocation from "@/lib/mapbox";
import multiparty from "multiparty";
import fs from "fs";
import streamifier from "streamifier";
import cloudinary from "@/lib/cloudinary";

export const getElpCamp = async (req, res) => {
	const { id } = req.query;
	await dbConnect();
	const result = await Elpers.findById(id)
		.populate({ path: "review", populate: { path: "user" } })
		.populate("user");
	const elpCamp = JSON.parse(JSON.stringify(result));
	return res.status(200).json(elpCamp);
};

export const uploadImage = async (req, res) => {
	const { id } = req.query;
	await dbConnect();
	const elpCamp = await Elpers.findById(id);
	const data = await new Promise((resolve, reject) => {
		const form = new multiparty.Form();
		form.parse(req, (err, fields, files) => {
			console.log(fields, files);
			if (err) return reject(err);

			const rawdata = files.photos.map((photo) => fs.readFileSync(photo.path));
			resolve({ fields, rawdata });
		});
	});
	data.rawdata.forEach((buffer) => {
		let upload = cloudinary.uploader.upload_stream(
			{ folder: "ElpCamp" },
			async function (error, result) {
				if (error) return res.status(500);
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
	res.status(200).json({ success: true });
};
export const updateElpCamp = async (req, res) => {
	const { id } = req.query;
	const data = JSON.parse(req.body);
	await dbConnect();
	const geoLocation = await geocodeLocation(data.location);
	data.geometry = geoLocation.body.features[0].geometry;
	await Elpers.findByIdAndUpdate(id, data);
	return res.status(201).json({ success: true });
};

export const deleteElpCamp = async (req, res) => {
	const { id } = req.query;
	console.log("hit");
	await dbConnect();
	const elper = await Elpers.findByIdAndDelete(id);

	return res.status(202).json({ success: true });
};

export const deleteImg = async (req, res) => {
	const { id } = req.query;
	const { image } = JSON.parse(req.body);
	const elper = await Elpers.findById(id);
	for (let item of image) {
		await cloudinary.uploader.destroy(item.publicId);
		await elper.updateOne({ $pull: { images: { publicId: item.publicId } } });
	}
	res.status(200).json({ success: true });
};
