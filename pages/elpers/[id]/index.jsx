import { getElperById } from "../../api/elpers/[id]";
import useSWR, { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import styles from "@/styles/id.module.scss";
import { btn, btnInfo } from "@/styles/btn.module.scss";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useUser from "@/lib/auth/hooks";
const DetailedMap = dynamic(() => import("@/components/mapbox/details.map"), {
	loading: () => <div className="loader"></div>,
	ssr: false,
});
const fetcher = (url) => fetch(url).then((r) => r.json());
function PostDetails({ fallback, id }) {
	const [user] = useUser();
	const { data, error } = useSWR(`/api/elpers/${id}`, fetcher);
	const [size, setSize] = useState(true);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.innerWidth > 800 ? setSize(true) : setSize(false);
		}
	}, []);

	return (
		<SWRConfig fallback={fallback}>
			{!data ? (
				<div className="overlay">
					<div className="loader middle-load" />
				</div>
			) : error ? (
				<div>error </div>
			) : (
				<div className={styles.container}>
					<div className={styles.card}>
						<div className={styles.imageCtrl}>
							<Image
								className={styles.image}
								layout="fill"
								src={data.images[0].url}
								alt="post describing"
							/>
							<div className={styles.content}>
								<hr className={styles.hr} />
								<h5 className={styles.title}>
									{data.title} By {data.user.username}{" "}
									{user && user.userObj?._id === data.user._id && (
										<span className={styles.btnEdit}>
											<Link href={`/elpers/${data._id}/edit`} passHref>
												<button className={btnInfo}>Edit</button>
											</Link>
										</span>
									)}
								</h5>

								<div className={styles.textContent}>
									{data.description}
									<hr className={styles.hr} />
								</div>

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
								<hr className={styles.hr} />
							</div>
						</div>
					</div>
					<div className={styles.map}>
						<DetailedMap
							elpers={data}
							width={size ? "36vw" : "100vw"}
							height={size ? "40.6vh" : "30vh"}
							token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
						/>
					</div>
					<div className={styles.reviews}>
						<h5 className={styles.title}>Reviews</h5>
						{data.review.map((el) => (
							<span key={el._id}>{el.review}</span>
						))}
					</div>
				</div>
			)}
		</SWRConfig>
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
				id,
				fallback: {
					[`/api/elpers/${id}`]: elpCamp,
				},
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
