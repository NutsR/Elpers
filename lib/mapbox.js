import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const geocodingClient = mbxGeocoding({
	accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
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
