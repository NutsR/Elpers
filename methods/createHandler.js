import Router from "next/router";
import { swalSuccess, swalError } from "./Swal.fire";

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

export const returnHandleSubmit = (dispatch, user, state) => {
	return async (e) => {
		e.preventDefault();
		if (!user)
			return swalError({
				message: "Not Logged in please login or register and try again",
			});
		dispatch({ type: "change", name: "user", payload: user.userObj?._id });
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
				Router.push("/elpers");
			}
		} catch (err) {
			swalError(err);
		}
	};
};
