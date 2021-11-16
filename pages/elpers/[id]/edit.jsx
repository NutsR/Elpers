import { useReducer } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import { findByIdForEdit } from "../../api/elpers/[id]";
import Swal from "sweetalert2";
const FormInput = dynamic(() => import("@/components/form"));
// Reducer
const reducer = (state, action) => {
	switch (action.type) {
		case "change":
			return { ...state, [action.name]: (state[action.name] = action.payload) };
		default:
			return { state };
	}
};
function EditCamp({ elpCamp }) {
	const [state, dispatch] = useReducer(reducer, elpCamp);

	// Handle Change
	const handleChange = (e) => {
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
			return true;
		});
		console.log(exist);
		if (!exist) {
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Some Fields are still empty",
			});
		}
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/elpers/${elpCamp._id}`,
				{
					method: "PUT",
					body: JSON.stringify(state),
				}
			);
			const data = await res.json();
			if (data.success) {
				Swal.fire({
					icon: "success",
					title: "Success",
					showConfirmButton: false,
					timer: 1500,
				});
				Router.push(`/elpers/${elpCamp._id}`);
			}
		} catch (error) {
			Swal.fire({ icon: "error", title: "error occured", text: error.message });
		}
	};
	// Render form
	return (
		<>
			<FormInput
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				value={state}
				title={`Editing ${elpCamp.title}`}
			/>
		</>
	);
}

export const getServerSideProps = async ({ params: { id }, req, res }) => {
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=10, stale-while-revalidate=59"
	);
	const elpCamp = await findByIdForEdit(id);
	return {
		props: {
			elpCamp,
		},
	};
};

export default EditCamp;
