import nextConnect from "next-connect";
import auth from "@/middleware/auth";
import User from "../../../models/user";
import dbConnect from "@/lib/connection";
const handler = nextConnect();

handler
	.use(auth)
	.get(async (req, res) => {
		await dbConnect();
		if (req.session.loggedIn) {
			const userObj = await User.findById(req.session.loggedIn);
			return res.status(201).json({ user: { userObj } });
		}
		return res.json({ error: "no user found" });
	})
	.post(async (req, res) => {
		await dbConnect();
		const { username, password, email } = req.body;
		if (!username || !password || !email) {
			return res.status(400).send("Missing fields");
		}
		await dbConnect();
		const existingUsername = await User.find({ username });
		const existingEmail = await User.find({ email });
		if (existingUsername.username || existingEmail.email)
			return res.status(409).send("this username is already in use");

		const user = new User({ email, username });
		const registered = await User.register(user, password);
		req.login(registered, (err) => {
			if (err) return err;
			console.log(req.user._id);
			req.session.loggedIn = req.user._id;
			res.status(201).json({ success: true });
		});
	});

export default handler;
