import { swalSuccess, swalError } from "./Swal.fire";
import Router from "next/router";

export const reducer = (state, action) => {
	switch (action.type) {
		case "change":
			return { ...state, [action.name]: (state[action.name] = action.payload) };
		default:
			return { state };
	}
};
export const returnHandleChange = (dispatch) => {
	return (e) =>
		dispatch({
			type: "change",
			name: e.target.name,
			payload: e.target.value,
		});
};
// Handle Submit
export const returnHandleSubmit = (state, id) => {
	return async (e) => {
		e.preventDefault();
		const exist = Object.keys(state).every((key) => {
			if (
				(key === "price" && state[key] > 20) ||
				state[key] instanceof Array ||
				state[key] instanceof Object ||
				key === "__v" ||
				state[key].length > 3
			) {
				return true;
			}
			return false;
		});
		console.log(exist);
		if (!exist) {
			return swalError({ message: "Empty fields please check and try again" });
		}
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/elpers/${id}`,
				{
					method: "PUT",
					body: JSON.stringify(state),
				}
			);
			const data = await res.json();
			if (data.success) {
				swalSuccess();
				Router.push(`/elpers/${id}`);
			}
		} catch (error) {
			swalError(error);
		}
	};
};
