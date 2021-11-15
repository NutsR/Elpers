const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
	withPWA({
		reactStrictMode: true,

		images: {
			domains: ["cloudinary.com", "res.cloudinary.com"],
		},
		pwa: {
			disable: process.env.NODE_ENV === "development",
			dest: "public",
		},
	})
);
