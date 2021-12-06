import { useEffect, useReducer, useState } from "react";
import dynamic from "next/dynamic";
import { swalError } from "@/methods/Swal.fire";
import useUser from "@/lib/hooks/hooks";
import { useGetElpers } from "@/lib/hooks/elpers";
import {
	reducer,
	initialState,
	returnHandleChange,
	returnBlueHandler,
	returnHandleSubmit,
} from "@/methods/createHandler";
const FormInput = dynamic(() => import("@/components/forms/form"));

function ElperForm() {
	const [user] = useUser();
	const [geolocation, setGeolocation] = useState();
	const [data, { mutate }] = useGetElpers();
	const [state, dispatch] = useReducer(reducer, initialState);
	const handleChange = returnHandleChange(dispatch);
	const handleSubmit = returnHandleSubmit(state, mutate);
	const handleBlur = returnBlueHandler(state, setGeolocation);

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
				handleBlur={handleBlur}
				value={state}
				geolocation={geolocation}
			/>
		</>
	);
}

export default ElperForm;
