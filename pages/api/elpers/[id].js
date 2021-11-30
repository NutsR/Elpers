import nextConnect from "next-connect";
import wrapAsync from "@/utils/wrapAsync";
import { getElpCamp, updateElpCamp, deleteElpCamp } from "@/controller/details";

const handler = nextConnect();

handler
	.get(wrapAsync(getElpCamp))
	.put(wrapAsync(updateElpCamp))
	.delete(wrapAsync(deleteElpCamp));

export default handler;
