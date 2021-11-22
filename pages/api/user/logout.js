import nextConnect from "next-connect";
import auth from "@/middleware/auth";

const handler = nextConnect();

handler.use(auth).post((req, res) => {
	if (!req.user) return res.status(400).end();
	req.logout();
	req.session.loggedIn = null;
	res.status(204).end();
});

export default handler;
