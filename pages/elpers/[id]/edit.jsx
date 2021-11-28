import { useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import useUser from "@/lib/hooks/hooks";
import {
	reducer,
	returnHandleChange,
	returnHandleSubmit,
} from "@/methods/editHandler";
import { getElpersById } from "@/lib/hooks/elpers";
import Router, { useRouter } from "next/router";
import { swalError } from "@/methods/Swal.fire";

const FormInput = dynamic(() => import("@/components/form"));

function EditCamp() {
	const [user] = useUser();
	const { id } = useRouter().query;
	const [data, { mutate, loading }] = getElpersById(id);
	console.log(Router);
	const [state, dispatch] = useReducer(reducer, data);
	const handleChange = returnHandleChange(dispatch);
	const handleSubmit = returnHandleSubmit(state, data._id);

	useEffect(() => {
		if (user) {
			if (user.userObj?._id !== data.user._id) {
				swalError({ message: "Not Authorised" });
				Router.push(`/elpers/${data._id}`);
			}
		} else {
			swalError({ message: "Not Authorised" });
		}
	}, [user]);
	return (
		<>
			<FormInput
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				value={state}
				id={data._id}
				title={`Editing ${data.title}`}
			/>
		</>
	);
}

export default EditCamp;
