import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import useUser from "@/lib/hooks/hooks";
import ReviewForm from "../forms/review";
function CampDetails({ styles, data, children }) {
	const [user] = useUser();
	const [menu, showMenu] = useState(false);
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
								<b>₹</b>
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
					<span key={el._id}>{el.review}</span>
				))}
			</div>
		</div>
	);
}
export default CampDetails;
