import { useReducer } from "react";
import FormInput from "../../components/form";
import { initialState } from "../../initialState/initialState";
import Router from "next/router";
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
		const exist = Object.keys(state).every((key) => state[key]);

		// Check if values exist
		if (exist) {
			let formdata = new FormData();
			for (let i = 0; i < state.images.length; i++) {
				formdata.append(`photos`, state.images[i]);
			}
			formdata.append("elpcamp", JSON.stringify(state));
			// Try catch
			try {
				const res = await fetch("http://localhost:3000/api/elpers", {
					method: "POST",
					body: formdata,
				});
				const data = await res.json();
				if ((data.success = true)) {
					Router.push("/elpers");
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log("nope");
		}
	};
	// Render form
	return <FormInput handleChange={handleChange} handleSubmit={handleSubmit} />;
}

export default ElperForm;
