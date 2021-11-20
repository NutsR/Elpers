import { useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import { swalError } from "../../methods/Swal.fire";
import useUser from "@/lib/auth/hooks";
import {
	reducer,
	initialState,
	returnHandleChange,
	returnHandleSubmit,
} from "@/methods/createHandler";
const FormInput = dynamic(() => import("@/components/form"));

function ElperForm() {
	const [user] = useUser();
	const [state, dispatch] = useReducer(reducer, initialState);
	const handleChange = returnHandleChange(dispatch);
	const handleSubmit = returnHandleSubmit(dispatch, user, state);

	useEffect(() => {
		if (!user)
			swalError({
				message: "Creating ElpCamp disabled reason: NOT LOGGED IN",
			});
	}, []);
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
