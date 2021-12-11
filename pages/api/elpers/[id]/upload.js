import nextConnect from "next-connect";
import wrapAsync from "@/utils/wrapAsync";
import { deleteImg } from "@/controller/details";

export const config = {
	api: {
		bodyParser: true,
	},
};
const handler = nextConnect();

handler.delete(wrapAsync(deleteImg));

export default handler;
