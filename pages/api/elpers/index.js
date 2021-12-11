import nextConnect from "next-connect";
import wrapAsync from "@/utils/wrapAsync";
import { getElpCamps, createElpCamp } from "@/controller/elpers";
const handler = nextConnect();

export const config = {
	api: {
		bodyParser: false,
	},
};
handler.get(wrapAsync(getElpCamps)).post(wrapAsync(createElpCamp));

export default handler;
