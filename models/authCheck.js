const isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.redirectTo = req.originalUrl;
		return res.redirect("/elpers");
	}
	next();
};
export default isLoggedIn;
