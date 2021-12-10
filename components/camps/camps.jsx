import Link from "next/link";
import { btnPrimary } from "@/styles/btn.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

function Camps({ styles, post }) {
	const [reviews, setReviews] = useState(0);
	useEffect(() => {
		if (post && post.review.length) {
			let total = 0;
			let length = post.review.length;
			post.review.forEach((review) => {
				total += review.rating;
			});
			setReviews(Math.round(total / length));
		}
	});
	return (
		<div className={styles.item}>
			<div className={styles.imageCtrl}>
				<Image
					layout="fill"
					className={styles.image}
					src={post.images[0].url}
					alt="post describing"
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.innerContent}>
					<h2 className={styles.title}>{post.title}</h2>

					<span className={styles.muted}>
						Location: {post.location}
						<div
							className="starability-result"
							data-rating={reviews}
						></div>{" "}
					</span>
					<span className={styles.description}>
						<span>
							<span className={styles.smText}>
								{post.description.substr(0, 150)}...{" "}
							</span>
							<span className={styles.mdText}>
								{post.description.substr(0, 170)}...{" "}
							</span>
							<Link href={`/elpers/${post._id}`} passHref>
								<a className={styles.decroLink}>Continue Reading...</a>
							</Link>
						</span>
					</span>
					<div className={styles.btnCtrl}>
						<Link href={`/elpers/${post._id}`} passHref>
							<button className={btnPrimary}>View More</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Camps;
