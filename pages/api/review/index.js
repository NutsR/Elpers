import nextConnect from "next-connect";
import wrapAsync from "@/utils/wrapAsync";
import { createReview, deleteReview } from "@/controller/review";
import auth from "@/middleware/auth";

const handler = nextConnect();

handler.use(auth).post(wrapAsync(createReview)).delete(wrapAsync(deleteReview));

export default handler;
