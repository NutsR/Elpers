import { useState } from "react";
import { swalConfirmation, swalError, swalSuccess } from "@/methods/Swal.fire";
import Image from "next/image";
import styles from "@/styles/id.module.scss";
import useUser from "@/lib/hooks/hooks";
function ReviewDetails({ data, mutate }) {
	const [user] = useUser();
	const [reviewOpts, showReviewOpts] = useState({ show: false, id: "" });
	const handleDelete = async (id) => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN || ""}/api/review`,
				{
					method: "delete",
					body: JSON.stringify({ id }),
				}
			);
			const data = await res.json();
			if (data) {
				swalSuccess();
				mutate();
			}
		} catch (err) {
			swalError(err);
		}
	};
	return (
		<>
			<div className="starability-result" data-rating={data.rating}></div>
			<div>{data.user.username}</div>
			<div style={{ maxWidth: "50ch" }}>{data.review}</div>
			{user
				? user.userObj?._id === data.user._id && (
						<div className={styles.title}>
							<Image
								src="/tdicon.png"
								layout="responsive"
								width={5}
								height={5}
								className={styles.icon}
								alt="icon"
								onClick={() =>
									showReviewOpts({ show: !reviewOpts.show, id: data._id })
								}
							/>
						</div>
				  )
				: null}
			{reviewOpts.show
				? reviewOpts.id === data._id && (
						<div className={styles.dropdown}>
							<div className={styles.dropDownItem}>Edit</div>

							<div
								onClick={() => swalConfirmation(handleDelete, data._id)}
								className={styles.dropDownItem}
							>
								Delete
							</div>
						</div>
				  )
				: null}
		</>
	);
}

export default ReviewDetails;
