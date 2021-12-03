import nextConnect from "next-connect";
import wrapAsync from "@/utils/wrapAsync";
import { createReview } from "@/controller/review";
import auth from "@/middleware/auth";

const handler = nextConnect();

handler.use(auth).post(wrapAsync(createReview));

export default handler;
