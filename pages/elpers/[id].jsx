import { getElperById } from "../api/elpers/[id]";
import { useEffect, useState } from "react";
import styles from "./id.module.css";
import Link from "next/link";
import DetailedMap from "../../components/mapbox/details.map";
function PostDetails({ elpCamp }) {
	const [size, setSize] = useState(true);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.innerWidth > 800 ? setSize(true) : setSize(false);
		}
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.imageCtrl}>
					<img
						style={{ width: "inherit", height: "inherit" }}
						src={elpCamp.images[0].url}
						alt="post describing"
					/>
					<div className={styles.content}>
						<h5 className={styles.title}>
							{elpCamp.title} By {elpCamp.user.username}{" "}
						</h5>
						<span className={styles.textContent}>{elpCamp.description}</span>
						<span className={styles.price}>{elpCamp.price}</span>
						<span className={styles.location}>{elpCamp.location}</span>
					</div>
				</div>
				<Link href="/elpers">
					<button className={styles.btn}>Go Back</button>
				</Link>
			</div>
			<div className={styles.map}>
				<DetailedMap
					elpers={elpCamp}
					width={size ? "36vw" : "65vw"}
					height={"40.6vh"}
				/>
				<h5 className={styles.title}>Reviews</h5>
				<div>
					Reviews :{" "}
					{elpCamp.review.map((el) => (
						<p key={el._id}>{el.review}</p>
					))}
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps({ params: { id } }) {
	const elpCamp = await getElperById(id);
	return {
		props: {
			elpCamp,
		},
	};
}

export default PostDetails;
/* */
