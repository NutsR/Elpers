const withPWA = require("next-pwa");
module.exports = withPWA({
	reactStrictMode: true,

	images: {
		domains: ["cloudinary.com", "res.cloudinary.com"],
	},
	pwa: {
		disable: process.env.NODE_ENV === "development",
		dest: "public",
	},
});
