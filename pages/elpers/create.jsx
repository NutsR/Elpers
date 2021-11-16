import { useReducer } from "react";
import dynamic from "next/dynamic";
import { initialState } from "../../initialState/initialState";
import Router from "next/router";
import { swalError, swalSuccess } from "../../methods/Swal.fire";
const FormInput = dynamic(() => import("@/components/form"));

// Reducer
const reducer = (state, action) => {
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

function ElperForm() {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Handle Change
	const handleChange = (e) => {
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
	// Handle Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
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
	// Render form
	return (
		<>
			<FormInput
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				title="Create New ElpCamp"
				value={state}
			/>
		</>
	);
}

export default ElperForm;
