import { useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import { swalError } from "../../methods/Swal.fire";
import useUser from "@/lib/hooks/hooks";
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
	const handleSubmit = returnHandleSubmit(state);

	useEffect(() => {
		if (!user) {
			state.user = null;
			swalError({
				message: "Creating ElpCamp disabled reason: NOT LOGGED IN",
			});
		} else state.user = user.userObj?._id;
	}, [user]);
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
