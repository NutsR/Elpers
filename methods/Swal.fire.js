import Swal from "sweetalert2";

export const swalConfirmation = (fn, args) => {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			fn(args);
		}
	});
};
export const swalError = (err) => {
	Swal.fire({
		icon: "error",
		title: "error",
		text: `${err.message}`,
	});
};

export const swalSuccess = () => {
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "Your work has been saved",
		showConfirmButton: false,
		timer: 1500,
	});
};
