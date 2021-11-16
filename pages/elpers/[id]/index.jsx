import { getElperById } from "../../api/elpers/[id]";
import { useEffect, useState } from "react";
import styles from "@/styles/id.module.scss";
import { btn, btnInfo, btnDanger } from "@/styles/btn.module.scss";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import deleteMethod from "../../../methods/delete";
const DetailedMap = dynamic(() => import("@/components/mapbox/details.map"), {
	loading: () => <div className="loader"></div>,
	ssr: false,
});
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
					<Image
						className={styles.image}
						layout="fill"
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
				<Link href="/elpers" passHref>
					<button className={btn}>Go Back</button>
				</Link>
				<Link href={`/elpers/${elpCamp._id}/edit`} passHref>
					<button className={btnInfo}>Edit</button>
				</Link>
				<button
					className={btnDanger}
					onClick={() => {
						deleteMethod(elpCamp._id);
					}}
				>
					Delete
				</button>
			</div>
			<div className={styles.map}>
				<DetailedMap
					elpers={elpCamp}
					width={size ? "36vw" : "45vw"}
					height={size ? "40.6vh" : "23.2vh"}
					token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				/>
				<div className={styles.reviews}>
					<h5 className={styles.title}>Reviews</h5>
					{elpCamp.review.map((el) => (
						<span key={el._id}>{el.review}</span>
					))}
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps({ params: { id }, req, res }) {
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=10, stale-while-revalidate=59"
	);
	try {
		const elpCamp = await getElperById(id);
		return {
			props: {
				elpCamp,
			},
		};
	} catch (err) {
		return {
			props: {
				err,
			},
		};
	}
}

export default PostDetails;
