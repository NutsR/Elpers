import nextConnect from "next-connect";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user";
import session from "@/lib/auth/session";

const auth = nextConnect()
	.use(
		session({
			name: "sess",
			secret:
				process.env.TOKEN_SECRET ||
				"Error: Password string too short (min 32 characters required)",
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

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
export default auth;
