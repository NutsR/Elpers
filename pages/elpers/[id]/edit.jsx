import { useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import { findByIdForEdit } from "../../api/elpers/[id]";
import useUser from "@/lib/auth/hooks";
import {
	reducer,
	returnHandleChange,
	returnHandleSubmit,
} from "@/methods/editHandler";
import Router from "next/router";
import { swalError } from "@/methods/Swal.fire";

const FormInput = dynamic(() => import("@/components/form"));

function EditCamp({ elpCamp }) {
	const [user] = useUser();
	const [state, dispatch] = useReducer(reducer, elpCamp);
	const handleChange = returnHandleChange(dispatch);
	const handleSubmit = returnHandleSubmit(state, elpCamp._id);
	useEffect(() => {
		if (user) {
			if (user.userObj?._id !== state.user) {
				swalError({ message: "Not Authorised" });
				Router.push(`/elpers/${elpCamp._id}`);
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
