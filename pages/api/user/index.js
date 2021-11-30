import nextConnect from "next-connect";
import auth from "@/middleware/auth";

import wrapAsync from "@/utils/wrapAsync";
import { getUser, createUser } from "@/controller/user";
const handler = nextConnect();

handler.use(auth).get(wrapAsync(getUser)).post(wrapAsync(createUser));

export default handler;
