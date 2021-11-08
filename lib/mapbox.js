const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
	accessToken:
		"pk.eyJ1IjoiYmxha2VucjAxIiwiYSI6ImNrdDFyZ3ZrZTBkOHMydm56Yjk3MGkwbnMifQ.G5bp_EBof1-WDjZ-WtRFcQ",
});

export default async function geocodeLocation(location) {
	const geoLocation = await geocodingClient
		.forwardGeocode({
			query: location,
			limit: 1,
		})
		.send();
	return geoLocation;
}
