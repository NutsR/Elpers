import Elpers from "../../../models/elpCamp";

export const getElperById = async (id) => {
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
			res.status(200).json(elpCamp);
	}
}
