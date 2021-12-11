import nextConnect from "next-connect";
import wrapAsync from "@/utils/wrapAsync";
import { createReview, deleteReview } from "@/controller/review";
import auth from "@/middleware/auth";
import isLoggedIn from "@/models/authCheck";
const handler = nextConnect();

handler
	.use(auth)
	.post(isLoggedIn, wrapAsync(createReview))
	.delete(wrapAsync(deleteReview));

export default handler;
