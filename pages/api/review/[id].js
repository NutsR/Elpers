import wrapAsync from "@/utils/wrapAsync";
import nextConnect from "next-connect";
import { deleteReview } from "@/controller/review";
import auth from "@/middleware/auth";
const handler = nextConnect();

handler.use(auth).delete(wrapAsync(deleteReview));

export default handler;
