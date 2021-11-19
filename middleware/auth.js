import nextConnect from "next-connect";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user";
import session from "@/lib/auth/session";

const auth = nextConnect()
	.use(
		session({
			name: "sess",
			secret: process.env.TOKEN_SECRET,
			cookie: {
				maxAge: 60 * 60 * 8, // 8 hours,
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				path: "/",
				sameSite: "lax",
			},
		})
	)
	.use(passport.initialize())
	.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
export default auth;
