import { swalConfirmation, swalError, swalSuccess } from "./Swal.fire";
import Router from "next/router";

const handleDelete = async (id) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/elpers/${id}`,
			{
				method: "DELETE",
			}
		);
		const data = await res.json();
		if (data.success) {
			Router.push(`/elpers`);
			swalSuccess();
		}
	} catch (error) {
		swalError(error);
	}
};
const deleteMethod = (id) => {
	swalConfirmation(handleDelete, id);
};
export default deleteMethod;
