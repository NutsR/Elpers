import { useReducer } from "react";
import FormInput from "../../../components/form";
import { initialState } from "../../../initialState/initialState";
import Router from "next/router";
import { getElperById } from "../../api/elpers/[id]";
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

function EditCamp({ elpCamp }) {
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
				Edit Camp
			</h2>
			<FormInput
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				value={elpCamp}
			/>
		</>
	);
}

export const getServerSideProps = async ({ params: { id } }) => {
	const elpCamp = await getElperById(id);
	return {
		props: {
			elpCamp,
		},
	};
};

export default EditCamp;
