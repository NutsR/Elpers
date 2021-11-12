import { useReducer } from "react";
import FormInput from "../../components/form";
import { initialState } from "../../initialState/initialState";
import Router from "next/router";
import Swal from "sweetalert2";
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
			return state[key];
		});

		// Check if values exist
		if (exist) {
			let formdata = new FormData();
			for (let i = 0; i < state.images.length; i++) {
				formdata.append(`photos`, state.images[i]);
			}
			formdata.append("elpcamp", JSON.stringify(state));
			// Try catch
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_DOMAIN}/api/elpers`,
					{
						method: "POST",
						body: formdata,
					}
				);
				const data = await res.json();
				if ((data.success = true)) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Your work has been saved",
						showConfirmButton: false,
						timer: 1500,
					});
					Router.push("/elpers");
				}
			} catch (err) {
				Swal.fire({
					icon: "error",
					title: "error",
					text: `${err.message}`,
				});
			}
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Some Fields are still empty",
			});
		}
	};
	// Render form
	return (
		<>
			<h2
				style={{
					textAlign: "center",
					fontWeight: "600",
					wordSpacing: "6px",
					marginTop: "0px",
				}}
			>
				Create New ElpCamp
			</h2>
			<FormInput handleChange={handleChange} handleSubmit={handleSubmit} />
		</>
	);
}

export default ElperForm;
