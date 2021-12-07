import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import useUser from "@/lib/hooks/hooks";
import ReviewForm from "../forms/review";
import { swalConfirmation, swalError, swalSuccess } from "@/methods/Swal.fire";
function CampDetails({ styles, data, mutate, children }) {
	const [user] = useUser();
	const [menu, showMenu] = useState(false);
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
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.imageCtrl}>
					<Image
						className={styles.image}
						layout="fill"
						src={data.images[0].url}
						alt="post describing"
					/>
				</div>
				<div className={styles.content}>
					<div className={styles.title}>
						{user && user.userObj?._id === data.user._id && (
							<Image
								src="/tdicon.png"
								layout="responsive"
								width={10}
								height={10}
								className={styles.icon}
								alt="icon"
								onClick={() => showMenu(!menu)}
							/>
						)}
						{menu && (
							<div className={styles.dropdown}>
								<Link
									href={{
										pathname: `/elpers/${data._id}/edit`,
										query: data._id,
									}}
								>
									<div className={styles.dropDownItem}>Edit</div>
								</Link>
								<Link href={`/elpers/${data._id}/upload`}>
									<div className={styles.dropDownItem}>Upload Images</div>
								</Link>
							</div>
						)}

						<h5>
							{data.title} By {data.user.username}{" "}
						</h5>
					</div>

					<div className={styles.textContent}>{data.description}</div>
					<div className={styles.bottom}>
						<div className={styles.price}>
							AVG Price:{" "}
							<span className={styles.muted}>
								{data.price}
								<strong>₹</strong>
							</span>
						</div>
						<div className={styles.location}>
							ElpCamp Location:{" "}
							<span className={styles.muted}>{data.location}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.map}>{children}</div>
			<div className={styles.reviews}>
				<h5 className={styles.title}>Reviews</h5>
				{user && <ReviewForm id={data._id} />}
				{data.review.map((el) => (
					<div key={el._id}>
						<div className="starability-result" data-rating={el.rating}></div>
						<div>{el.user.username}</div>
						<div style={{ maxWidth: "50ch" }}>{el.review}</div>
						{user
							? user.userObj?._id === el.user._id && (
									<div className={styles.title}>
										<Image
											src="/tdicon.png"
											layout="responsive"
											width={5}
											height={5}
											className={styles.icon}
											alt="icon"
											onClick={() =>
												showReviewOpts({ show: !reviewOpts.show, id: el._id })
											}
										/>
									</div>
							  )
							: null}
						{reviewOpts.show
							? reviewOpts.id === el._id && (
									<div className={styles.dropdown}>
										<div className={styles.dropDownItem}>Edit</div>

										<div
											onClick={() => swalConfirmation(handleDelete, el._id)}
											className={styles.dropDownItem}
										>
											Delete
										</div>
									</div>
							  )
							: null}
					</div>
				))}
			</div>
		</div>
	);
}
export default CampDetails;
