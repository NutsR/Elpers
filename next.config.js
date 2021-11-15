const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

if (process.env.NODE_ENV === "development") {
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
} else {
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
}
