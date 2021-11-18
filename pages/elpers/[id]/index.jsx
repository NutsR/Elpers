import { getElperById } from "../../api/elpers/[id]";
import useSWR, { SWRConfig } from "swr";
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
const fetcher = (url) => fetch(url).then((r) => r.json());
function PostDetails({ fallback, id }) {
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
								<h5 className={styles.title}>
									{data.title} By {data.user.username}{" "}
								</h5>
								<span className={styles.textContent}>{data.description}</span>
								<span className={styles.price}>{data.price}</span>
								<span className={styles.location}>{data.location}</span>
							</div>
						</div>
						<Link href="/elpers" passHref>
							<button className={btn}>Go Back</button>
						</Link>
						<Link href={`/elpers/${data._id}/edit`} passHref>
							<button className={btnInfo}>Edit</button>
						</Link>
						<button
							className={btnDanger}
							onClick={() => {
								deleteMethod(data._id);
							}}
						>
							Delete
						</button>
					</div>
					<div className={styles.map}>
						<DetailedMap
							elpers={data}
							width={size ? "36vw" : "45vw"}
							height={size ? "40.6vh" : "23.2vh"}
							token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
						/>
						<div className={styles.reviews}>
							<h5 className={styles.title}>Reviews</h5>
							{data.review.map((el) => (
								<span key={el._id}>{el.review}</span>
							))}
						</div>
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
