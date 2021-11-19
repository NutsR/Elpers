import nextConnect from "next-connect";
import auth from "@/middleware/auth";
import User from "../../../models/user";
import dbConnect from "../../../lib/connection";
const handler = nextConnect();

handler
	.use(auth)
	.get(async (req, res) => {
		await dbConnect();
		if (req.session.loggedIn) {
			return res.status(201).json({ user: req.session.loggedIn });
		}
		return res.json({ error: "no user found" });
	})
	.post(async (req, res) => {
		const { username, password, email } = req.body;
		if (!username || !password || !email) {
			return res.status(400).send("Missing fields");
		}
		await dbConnect();
		const user = new User({ email, username });
		const registered = await User.register(user, password);
		req.login(registered, (err) => {
			if (err) return err;

			req.session.loggedIn = req.user;
			res.status(201).json({ success: true });
		});
	});

export default handler;
