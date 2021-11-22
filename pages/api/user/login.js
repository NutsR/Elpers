import nextConnect from "next-connect";
import auth from "@/middleware/auth";
import passport from "passport";

const handler = nextConnect();

handler
	.use(auth)
	.post(passport.authenticate("local", { failureFlash: true }), (req, res) => {
		req.session.loggedIn = req.user;
		const { hash, salt, ...user } = req.session.loggedIn;
		res.status(200).json({ user });
	});

export default handler;
