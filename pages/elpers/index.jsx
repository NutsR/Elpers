import Link from "next/link";
import { getElpers } from "../api/elpers";
import styles from "@/styles/elper.module.scss";
import { btnPrimary, btn } from "@/styles/btn.module.scss";
import dynamic from "next/dynamic";
import Image from "next/image";
import useSWR, { SWRConfig } from "swr";
import { useEffect, useState } from "react";
const Map = dynamic(() => import("@/components/mapbox/mapbox"), {
	loading: () => <div className="loader middle-load"></div>,
	ssr: false,
});
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Post({ fallback, error }) {
	const [hide, setHidden] = useState(true);
	const [mount, setMount] = useState(false);
	useEffect(() => {
		setMount(true);
		const timer = setInterval(() => {
			setHidden(false);
		}, 10000);
		return () => clearInterval(timer);
	}, []);
	const { data, mutate } = useSWR(mount ? "/api/elpers" : null, fetcher);
	const refreshData = (e) => {
		e.preventDefault();
		mutate();
	};
	if (error) {
		return <div>{error.message}</div>;
	}
	return (
		<SWRConfig value={fallback}>
			<Map elpers={data} token={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
			<div className={styles.main}>
				<button
					style={{ width: "10%", alignSelf: "end" }}
					className={btn}
					onClick={refreshData}
				>
					Refresh Data
				</button>
				{data && data.length > 0 ? (
					data.map((post) => (
						<div className={styles.item} key={post._id}>
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
									<h5 className={styles.title}>{post.title}</h5>

									<p className={styles.description}>{post.description}</p>
									<div className={styles.btnCtrl}>
										<Link href={`/elpers/${post._id}`} passHref>
											<button className={btnPrimary}>View More</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<>
						{!hide ? (
							<div>Not Found</div>
						) : (
							<div className="overlay">
								<div className="loader middle-load" />
							</div>
						)}
					</>
				)}
			</div>
		</SWRConfig>
	);
}

export async function getServerSideProps({ req, res }) {
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=10, stale-while-revalidate=59"
	);
	try {
		const data = await getElpers();
		return {
			props: {
				fallback: {
					"/api/elpers": data,
				},
			},
		};
	} catch (err) {
		return { props: { error: err } };
	}
}
export default Post;
