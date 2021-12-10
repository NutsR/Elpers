import { useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import useUser from "@/lib/hooks/hooks";
import {
	reducer,
	returnHandleChange,
	returnHandleSubmit,
} from "@/methods/editHandler";
import { useElpersById } from "@/lib/hooks/elpers";
import Router, { useRouter } from "next/router";
import { swalError } from "@/methods/Swal.fire";

const FormInput = dynamic(() => import("@/components/forms/form"));

function EditCamp() {
	const { id } = useRouter().query;
	const [data, { mutate, loading }] = useElpersById(id);
	const [user] = useUser();

	const [state, dispatch] = useReducer(reducer, data);
	const handleChange = returnHandleChange(dispatch);
	const handleSubmit = returnHandleSubmit(state, data && data._id);

	useEffect(() => {
		if (user) {
			if (data && user.userObj?._id !== data.user._id) {
				swalError({ message: "Not Authorised" });
				Router.push(`/elpers/${data._id}`);
			}
		} else {
			swalError({ message: "Not Authorised" });
		}
	}, [user, data]);
	return (
		<>
			<FormInput
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				value={state}
				id={data && data._id}
				title={`Editing ${data && data.title}`}
			/>
		</>
	);
}

export default EditCamp;
