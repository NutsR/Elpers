import nextConnect from "next-connect";
import wrapAsync from "@/utils/wrapAsync";
import {
	getElpCamp,
	updateElpCamp,
	deleteElpCamp,
	uploadImage,
} from "@/controller/details";

const handler = nextConnect();
export const config = {
	api: {
		bodyParser: false,
	},
};
handler
	.get(wrapAsync(getElpCamp))
	.post(wrapAsync(uploadImage))
	.put(wrapAsync(updateElpCamp))
	.delete(wrapAsync(deleteElpCamp));

export default handler;
