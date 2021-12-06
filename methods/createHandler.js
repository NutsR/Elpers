import Router from "next/router";
import { swalSuccess, swalError } from "./Swal.fire";
import geocodeLocation, { reverseGeoCode } from "@/lib/mapbox";
export const initialState = {
	title: "",
	location: "",
	description: "",
	price: "",
	user: "",
	images: "",
	review: [],
	geometry: { type: "Point" },
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "change":
			return { ...state, [action.name]: (state[action.name] = action.payload) };
		case "image_change":
			return {
				...state,
				images: [...state.images, action.payload[0]],
			};
		default:
			return { state };
	}
};
export const returnBlueHandler = (state, setGeolocation) => {
	return async () => {
		if (state.location.length > 1) {
			const geoLocation = await geocodeLocation(state.location);
			if (geoLocation.body.features.length) {
				const place = await reverseGeoCode(
					geoLocation.body.features[0].geometry.coordinates
				);
				setGeolocation(
					place.body.features.length ? place.body.features[0] : "Not Found"
				);
			} else {
				swalError({ message: "Location is invalid" });
			}
		}
	};
};

export const returnHandleChange = (dispatch) => {
	return (e) => {
		if (e.target.name === "images") {
			return dispatch({
				type: "image_change",
				name: e.target.name,
				payload: e.target.files,
			});
		}
		dispatch({
			type: "change",
			name: e.target.name,
			payload: e.target.value,
		});
	};
};

export const returnHandleSubmit = (state, mutate) => {
	return async (e) => {
		e.preventDefault();
		if (!state.user)
			return swalError({
				message: "Not Logged in please login or register and try again",
			});
		const exist = Object.keys(state).every((key) => {
			if (
				(key === "price" && state[key] > 20) ||
				state[key] instanceof Array ||
				state[key] instanceof Object ||
				state[key].length > 3
			) {
				return true;
			}
			console.log(state[key], key);
			return false;
		});

		// Check if values exist
		if (!exist) {
			return swalError({ message: "empty fields please check and try again" });
		}
		let formdata = new FormData();
		for (let i = 0; i < state.images.length; i++) {
			formdata.append(`photos`, state.images[i]);
		}
		formdata.append("elpcamp", JSON.stringify(state));
		// Try catch
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/elpers`,
				{
					method: "POST",
					body: formdata,
				}
			);
			const data = await res.json();
			if ((data.success = true)) {
				swalSuccess();
				mutate("/api/elpers");
				Router.push("/elpers");
			}
		} catch (err) {
			swalError(err);
		}
	};
};
